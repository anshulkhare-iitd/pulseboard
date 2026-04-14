import * as React from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { hasPermission } from "@pulseboard/shared-core";
import { LoginPage } from "../features/auth/LoginPage";
import { AppShellLayout } from "../components/AppShellLayout";
import { useSessionStore } from "../store/sessionStore";

const OverviewPage = React.lazy(() =>
  import("mfeOverview/Module").then((mod) => ({ default: mod.OverviewModule })),
);
const UsersPage = React.lazy(() =>
  import("mfeUsers/Module").then((mod) => ({ default: mod.UsersModule })),
);
const ReportsPage = React.lazy(() =>
  import("mfeReports/Module").then((mod) => ({ default: mod.ReportsModule })),
);
const SettingsPage = React.lazy(() =>
  import("mfeSettings/Module").then((mod) => ({ default: mod.SettingsModule })),
);

const rootRoute = createRootRoute({
  component: () => (
    <React.Suspense fallback={<div className="p-4">Loading…</div>}>
      <Outlet />
    </React.Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  path: "/",
  beforeLoad: () => {
    if (!useSessionStore.getState().session) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppShellLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: () => <Navigate to="/overview" />,
});

const overviewRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "overview",
  component: OverviewPage,
});

const usersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "users",
  beforeLoad: () => {
    const session = useSessionStore.getState().session;
    if (!session || !hasPermission(session.role, "users.view")) {
      throw redirect({ to: "/overview" });
    }
  },
  component: UsersPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "reports",
  component: ReportsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "settings",
  beforeLoad: () => {
    const session = useSessionStore.getState().session;
    if (!session || !hasPermission(session.role, "settings.view")) {
      throw redirect({ to: "/overview" });
    }
  },
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  appRoute.addChildren([indexRoute, overviewRoute, usersRoute, reportsRoute, settingsRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
