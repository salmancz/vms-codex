export const permissions = [
  'organization.read','organization.update','location.create','location.read','location.update',
  'gate.create','gate.read','department.create','department.read','employee.create','employee.read','employee.update',
  'visitor.create','visitor.read','visitor.update','visitor.delete','visit.create','visit.read','visit.approve',
  'visit.reject','visit.checkin','visit.checkout','reports.read','reports.export','settings.read','settings.update',
  'audit.read','security.operate'
] as const;
export type Permission = typeof permissions[number];

export const rolePermissionMap: Record<string, Permission[]> = {
  PLATFORM_ADMIN: [...permissions],
  ORGANIZATION_OWNER: permissions.filter((p) => p !== 'organization.update' || true),
  ORGANIZATION_ADMIN: permissions.filter((p) => !p.startsWith('audit.') || p === 'audit.read'),
  SECURITY_MANAGER: ['gate.read','visitor.create','visitor.read','visitor.update','visit.create','visit.read','visit.approve','visit.reject','visit.checkin','visit.checkout','reports.read','security.operate'],
  SECURITY_GUARD: ['gate.read','visitor.create','visitor.read','visit.read','visit.checkin','visit.checkout','security.operate'],
  RECEPTIONIST: ['visitor.create','visitor.read','visitor.update','visit.create','visit.read','visit.checkin','visit.checkout','security.operate'],
  EMPLOYEE: ['visitor.create','visitor.read','visit.create','visit.read','visit.approve','visit.reject'],
  REPORT_VIEWER: ['reports.read','reports.export'],
};

export function hasPermission(roleCode: string, permission: Permission): boolean {
  return rolePermissionMap[roleCode]?.includes(permission) ?? false;
}
