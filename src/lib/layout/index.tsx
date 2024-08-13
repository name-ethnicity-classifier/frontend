import { Box, Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box
        marginX="auto"
        maxWidth={1500}
        paddingX={{ base: "5", md: "10", lg: "50", xl: "100" }}
        transition="0.5s ease-out"
      >
        <Meta />
        <Flex wrap="wrap" minHeight="100vh">
          <Box width="full" as="main" marginY={22} bg="surfaceBlue">
            {children}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
