import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from '~/lib/contexts/AuthContext';
import Layout from "~/lib/layout";
import Routings from "~/lib/router/Routings";
import { theme } from "~/theme";

const App = () => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </ChakraProvider>
  </AuthProvider>
);

export default App;
