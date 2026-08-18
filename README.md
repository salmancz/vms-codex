# Gate Operations Platform — Phase 1 VMS Foundation

A multi-tenant Gate Operations Platform with Visitor Management as the first module. The architecture uses Next.js, NestJS-style TypeScript modules, PostgreSQL via Prisma, Redis/BullMQ-ready notification jobs, tenant-scoped data, RBAC permissions, audit logs, reporting/export foundations, and a tablet-first security interface.

## Phase 1 scope
- Organizations, locations, gates, departments, employees, users, visitors, visitor types, visits, audit logs, files, notification usage.
- Pre-registration, walk-in, QR token validation, approval, check-in/check-out, digital pass metadata and reporting foundations.
- No contractor, vehicle, material gate pass, biometric, SSO, AI, ERP/HRMS, Kubernetes or microservice implementation in Phase 1.

## Development
```bash
npm test
npm run lint
npm run prisma:validate
```

Set `DATABASE_URL`, JWT secrets, Redis and S3-compatible storage variables through environment configuration; never commit real secrets.
