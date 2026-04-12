import type { Role } from "../types/auth";

export type Permission =
  | "overview.view"
  | "users.view"
  | "users.manage"
  | "reports.view"
  | "reports.create"
  | "settings.view"
  | "settings.manageBilling"
  | "notifications.view";

const permissionMap: Record<Role, Set<Permission>> = {
  Owner: new Set<Permission>([
    "overview.view",
    "users.view",
    "users.manage",
    "reports.view",
    "reports.create",
    "settings.view",
    "settings.manageBilling",
    "notifications.view",
  ]),
  Admin: new Set<Permission>([
    "overview.view",
    "users.view",
    "users.manage",
    "reports.view",
    "reports.create",
    "settings.view",
    "notifications.view",
  ]),
  Analyst: new Set<Permission>([
    "overview.view",
    "users.view",
    "reports.view",
    "reports.create",
    "notifications.view",
  ]),
  Viewer: new Set<Permission>([
    "overview.view",
    "reports.view",
    "notifications.view",
  ]),
};

export const hasPermission = (role: Role, permission: Permission): boolean =>
  permissionMap[role].has(permission);
