# Module boundaries

## Shell app
- Compose remote modules into route tree.
- Hold session bootstrap and auth guards.
- Apply workspace-aware top-level UX (navigation, theme, workspace switch).

## Remote MFEs
- Own feature rendering and local interaction logic.
- Export a single module entry (`./Module`) for shell consumption.
- Depend on shared contracts only, never on each other.

## Shared packages
- `@pulseboard/shared-core`: auth contracts, RBAC permissions, tenant-aware client helpers.
- `@pulseboard/shared-ui`: reusable UI primitives.

## Runtime flow
1. User signs in through shell.
2. Shell resolves role + active tenant and enables allowed navigation.
3. Route navigation lazy-loads remote module entry.
4. Module renders using shared contracts and tenant context from shell state.
