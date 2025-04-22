import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { authAndAccessCheck } from "../utils/serverRequests";
import { AccessLevel } from "~/types";

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
      console.log("TRIGGERED")
      const decodedToken: { exp: number } = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        logOutUser();
      }

      authAndAccessCheck((accessLevel: string, accessLevelReason: string) => {
        const accountPendingTitle = "Account under review.";
        const accountPendingDescription = "We are currently reviewing your account and the usage description you have provided. Currently you don't have access to use our models. Please check in later!";
        const accountRestrictedTitle = "Account access restricted.";
        const accountRestrictedDescription = (
          <>
            <p>After reviewing the usage description you provided, we have decided to withhold you access to our models. Please update your usage description in the user settings or contact us per email.</p>
            <br />
            <p><b>Reason:</b> {accessLevelReason}</p>
          </>
        ); 

        if (accessLevel == AccessLevel.PEDNING.toString() || accessLevel == AccessLevel.RESTRICTED.toString()) {
          toast({
            title: accessLevel == AccessLevel.PEDNING.toString() ? accountPendingTitle : accountRestrictedTitle,
            description: accessLevel == AccessLevel.PEDNING.toString() ? accountPendingDescription : accountRestrictedDescription,
            status: "warning",
            duration: 120000,
            isClosable: true,
            position: "top",
          });

          Cookies.set("access", "restricted");
        }
        else {
          Cookies.set("access", "full");
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

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("cc_cookie");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
