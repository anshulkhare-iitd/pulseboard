# RBAC and product UX

This document captures the product-facing access model for PulseBoard.

## Roles

- **Owner** — Full access including billing and org-level settings.
- **Admin** — User management and operational settings; no billing changes unless granted.
- **Analyst** — Create and manage reports; read-only on user administration where applicable.
- **Viewer** — Read-only dashboards and reports.

## UI patterns

- **Hide** navigation entries the role cannot use.
- **Disable** destructive or privileged actions with a short explanation where helpful.
- **Route guards** complement UI hiding; never rely on UI alone for security (backend must enforce).

## Tenant context

Switching workspace updates `activeOrgId` and derived plan tier so queries and actions stay scoped to the selected organization.
