import React from "react";
import type { PathRouteProps } from "react-router-dom";

import Home from "../pages/home/index";
import Login from "../pages/login/index";
import ModelHub from "../pages/model-hub/index";
import TermsOfService from "../pages/terms-of-service";
import PrivacyPolicy from "../pages/privacy-policy";


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
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  }
];

export const privateRoutes: Array<PathRouteProps> = [];
