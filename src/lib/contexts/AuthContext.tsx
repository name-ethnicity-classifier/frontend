import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { authAndAccessCheck } from "../utils/serverRequests";
import { AccessLevel } from "~/types";
import { acessAlertToast } from "../utils/toasts";


export const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => { },
  logOut: () => { },
});

type LayoutProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: LayoutProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logOutUser = () => {
    logOut();
    navigate("/");
    toast({
      title: "Your session expired. Please log in again.",
      status: "warning",
      duration: 5000,
      isClosable: false,
      position: "top",
    });
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("email");

    if (token && email) {
      const decodedToken: { exp: number } = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        logOutUser();
      }

      authAndAccessCheck((accessLevel: string, accessLevelReason: string) => {
        if (accessLevel == AccessLevel.PENDING.toString() || accessLevel == AccessLevel.RESTRICTED.toString()) {
          Cookies.set("access", AccessLevel.RESTRICTED);
          Cookies.set("access_level_reason", accessLevelReason);
          if (window.location.pathname === "/") {
            acessAlertToast(toast);
          }
        }
        else {
          Cookies.set("access", AccessLevel.FULL);
        }
      },
      () => {
        logOutUser();
      });

      logIn();
    }
  }, [navigate]);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const cleanCookies = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("access");
    Cookies.remove("access_level_reason");
    Cookies.remove("cc_cookie");
  }

  const logOut = () => {
    cleanCookies();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
