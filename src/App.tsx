import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from '~/lib/contexts/AuthContext';
import Layout from "~/lib/layout";
import Routings from "~/lib/router/Routings";
import { theme } from "~/theme";

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Layout>
          <Routings />
        </Layout>
      </AuthProvider>
    </Router>
  </ChakraProvider>
);

export default App;
