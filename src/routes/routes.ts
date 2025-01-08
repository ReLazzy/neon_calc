import Main from "../pages/Main";
import AuthPage from "../pages/authpage/AuthPage";

export enum RouteNames {
  MAIN_ROUTE = "/main",
  AUTH_ROUTE = "/auth",
  START_ROUTE = "/",
}

export const publicRoutes = [
  {
    path: RouteNames.MAIN_ROUTE,
    element: Main,
  },
  {
    path: RouteNames.AUTH_ROUTE,
    element: AuthPage,
  },
  {
    path: RouteNames.START_ROUTE,
    element: AuthPage,
  },
];
