import { Flex } from "@chakra-ui/react";

import SomeText from "./components/SomeText";

const Home = () => {
  return (
    <Flex gap={4}>
      <SomeText />
    </Flex>
  );
};

export default Home;
