import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from '~/lib/contexts/AuthContext';
import Layout from "~/lib/layout";
import Routings from "~/lib/router/Routings";
import { theme } from "~/theme";
import { useEffect } from "react";
import openCookieManager from "./cookie-manager";

const App = () => {
  
  useEffect(() => {
    openCookieManager();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Layout>
            <Routings />
          </Layout>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  )
};

export default App;
