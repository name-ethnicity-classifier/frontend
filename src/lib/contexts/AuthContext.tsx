import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

type LayoutProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: LayoutProps) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {    
    const token = Cookies.get("token");
    const email = Cookies.get("email");

    if (token && email) {
        const decodedToken: { exp: number } = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          logOut();
          toast({
            title: "Your session expired. Please log in again.",
            status: "warning",
            duration: 5000,
            isClosable: false,
            position: "top",
          });
          navigate("/");
        } else {
          logIn();
        }
      
    }
  }, [navigate]);

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
