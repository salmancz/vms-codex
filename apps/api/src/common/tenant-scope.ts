export function scopedOrganizationWhere(organizationId: string, filters: Record<string, unknown> = {}) { return { organizationId, ...filters }; }
