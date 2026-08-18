import test from 'node:test';
import assert from 'node:assert/strict';
import { canTransitionVisit, assertVisitTransition } from '../packages/core/src/visit-state.ts';
import { hasPermission } from '../packages/core/src/permissions.ts';
import { createOpaqueQrToken, hashQrToken, validateQrToken } from '../packages/core/src/qr-token.ts';
import { assertTenantScope } from '../packages/core/src/tenant.ts';
import { buildVisitNotificationJobs } from '../packages/core/src/notifications.ts';

test('visit state transitions enforce the approval/check-in lifecycle', () => {
  assert.equal(canTransitionVisit('PENDING_APPROVAL', 'APPROVED'), true);
  assert.equal(canTransitionVisit('CHECKED_IN', 'APPROVED'), false);
  assert.throws(() => assertVisitTransition('CHECKED_OUT', 'CHECKED_IN'), /Invalid visit transition/);
});

test('permissions are role mapped without hard-coding one-off checks', () => {
  assert.equal(hasPermission('SECURITY_GUARD', 'visit.checkin'), true);
  assert.equal(hasPermission('SECURITY_GUARD', 'reports.export'), false);
});

test('qr tokens are opaque, tenant-scoped and reject expired records', () => {
  const token = createOpaqueQrToken();
  assert.equal(token.includes('Raj'), false);
  const record = { organizationId: 'org_1', tokenHash: hashQrToken(token), expiresAt: new Date(Date.now() + 60_000) };
  assert.equal(validateQrToken(record, token, 'org_1'), 'VALID');
  assert.equal(validateQrToken(record, token, 'org_2'), 'WRONG_ORGANIZATION');
  assert.equal(validateQrToken({ ...record, expiresAt: new Date(Date.now() - 1) }, token, 'org_1'), 'EXPIRED');
});

test('tenant isolation rejects cross-organization records', () => {
  assert.deepEqual(assertTenantScope({ organizationId: 'org_a', id: 'visit_1' }, 'org_a'), { organizationId: 'org_a', id: 'visit_1' });
  assert.throws(() => assertTenantScope({ organizationId: 'org_b' }, 'org_a'), /Tenant resource not found/);
});

test('notification event generation creates async jobs instead of provider calls', () => {
  const jobs = buildVisitNotificationJobs({ organizationId: 'org_1', event: 'VISITOR_CHECKED_IN', hostEmail: 'host@example.com', visitorPhone: '+919999999999', payload: { passNumber: 'V-2026-000182' } });
  assert.deepEqual(jobs.map((job) => job.channel), ['EMAIL', 'WHATSAPP']);
});
