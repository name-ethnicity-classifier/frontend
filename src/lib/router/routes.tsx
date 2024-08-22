import React from "react";
import type { PathRouteProps } from "react-router-dom";

const Home = React.lazy(() => import("~/lib/pages/home"));
const Login = React.lazy(() => import("~/lib/pages/login"));
const ModelHub  = React.lazy(() => import("~/lib/pages/model-hub"));

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/model-hub",
    element: <ModelHub />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
