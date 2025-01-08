import Main from "../pages/Main";
import AuthPage from "../pages/authpage/AuthPage";

export enum RouteNames {
  MAIN_ROUTE = "/main",
  AUTH_ROUTE = "/auth",
  START_ROUTE = "/",
}

export const authRoutes = [
  {
    path: RouteNames.MAIN_ROUTE,
    element: Main,
  }
];

export const publicRoutes = [
  {
    path: RouteNames.AUTH_ROUTE,
    element: AuthPage,
  },
  {
    path: RouteNames.START_ROUTE,
    element: AuthPage,
  },
];
