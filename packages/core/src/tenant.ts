export interface TenantScoped { organizationId: string; locationId?: string | null; gateId?: string | null; }
export function assertTenantScope<T extends TenantScoped>(record: T | null, organizationId: string): T {
  if (!record || record.organizationId !== organizationId) throw new Error('Tenant resource not found');
  return record;
}
export function tenantWhere(organizationId: string, extra: Record<string, unknown> = {}) { return { organizationId, ...extra }; }
