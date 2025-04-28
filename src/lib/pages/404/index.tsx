import { Flex, Text, Button, Image, VStack, Heading } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");

  return (
    <Flex
      textAlign="center"
      flexDirection="column"
      align="center"
      justifyContent="center"
      marginX="auto"
      height="calc(100vh - 60px)"
    >
        <Image
          src="/assets/page-not-found-illustration.svg"
          height={{ base: "40%", md: "45%"}}
        />

        <VStack marginTop="-50px">
          <Heading
            variant="h3"
            color="secondaryBlue.200"
            maxWidth="275px"
          >
            This page has been abducted by Aliens!
          </Heading>

          <Button
            marginTop="4"
            leftIcon={<LuArrowLeft color="white" />}
            onClick={() => handleBackToHome() }
          >
            Take me home!
          </Button>
        </VStack>
    </Flex>
  );
};

export default Page404;
