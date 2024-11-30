import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";
import CallToAction from "../pages/home/components/CallToAction";


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const headerHeight = "60px";

  return (
    <Flex overflowX="hidden" flexDirection="column">
      <Header height={headerHeight}/>
      <Spacer marginTop={headerHeight}/>

      {
        // Render call-to-action section in here because it
        // shouldnt be affected by the layouts hori. padding
        location.pathname === "/" && (
          <CallToAction />
        )
      }
      
      <Flex
        width="full"
        maxWidth={1750}
        paddingX={{ base: "5", md: "10", lg: "50", xl: "100" }}
        marginX="auto"
        flexDirection="row"
      >
        <Meta />
        {children}
      </Flex>
      
      <Footer />
    </Flex>
  );
};

export default Layout;
