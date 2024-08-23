import React from "react";
import type { PathRouteProps } from "react-router-dom";

import Home from "../pages/home/index";
import Login from "../pages/login/index";
import ModelHub from "../pages/model-hub/index";


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
