import LoginPage from "./pages/LoginPage";
import type { LoggedInUser, router } from "./type";

export function filterMenuRoutes(
  routes: router[],
  loggedInUser: LoggedInUser | null
): router[] {
  if (!loggedInUser)
    return [
      {
        path: "/",
        element: <LoginPage />,
        name: "Login",
        roles: [],
      },
    ];

  const userRoles = loggedInUser.roles.map((role) => role.name.toLowerCase());

  return routes.filter((route) => {
    if (!route.showOnMenu) return false;

    if (!route.roles || route.roles.length === 0) {
      return true;
    }

    return (route.roles ?? []).some((roleName) => {
      const isIncluded = userRoles.includes(roleName.toLowerCase());
      return isIncluded;
    });
  });
}

export function filterRouteAccessible(
  routes: router[],
  loggedInUser: LoggedInUser | null
): router[] {
  if (!loggedInUser)
    return [
      {
        path: "/",
        element: <LoginPage />,
        name: "Login",
        roles: [],
      },
    ];

  const userRoles = loggedInUser.roles.map((role) => role.name.toLowerCase());

  return routes.filter((route) => {
    if (!route.roles || route.roles.length === 0) {
      return true;
    }
    return (route.roles ?? []).some((roleName) => {
      if (!roleName) return true; // If no specific role is required, allow access
      const isIncluded = userRoles.includes(roleName.toLowerCase());
      return isIncluded;
    });
  });
}
