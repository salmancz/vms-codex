# API v1

REST endpoints are versioned under `/api/v1` for auth, organizations, locations, gates, departments, employees, visitors, visits, dashboard, reports and audit logs. Protected endpoints must validate DTOs, check permissions and include tenant-scoped `organizationId` filters.
