import { randomBytes, createHash } from 'node:crypto';

export interface QrTokenRecord { organizationId: string; tokenHash: string; expiresAt: Date; revokedAt?: Date | null; usedAt?: Date | null; }
export function createOpaqueQrToken(): string { return randomBytes(32).toString('base64url'); }
export function hashQrToken(token: string): string { return createHash('sha256').update(token).digest('hex'); }
export function validateQrToken(record: QrTokenRecord, token: string, organizationId: string, now = new Date()): 'VALID'|'WRONG_ORGANIZATION'|'EXPIRED'|'REVOKED'|'USED'|'INVALID' {
  if (record.organizationId !== organizationId) return 'WRONG_ORGANIZATION';
  if (record.tokenHash !== hashQrToken(token)) return 'INVALID';
  if (record.revokedAt) return 'REVOKED';
  if (record.usedAt) return 'USED';
  if (record.expiresAt.getTime() <= now.getTime()) return 'EXPIRED';
  return 'VALID';
}
