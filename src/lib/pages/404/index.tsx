import { Flex, Text, Button } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");

  return (
    <Flex
      textAlign="center"
      flexDirection="column"
      gap="4"
      align="center"
      justifyContent="center"
      marginX="auto"
      height="calc(100vh - 60px)"
    >
      <Text
        fontSize={{base: "75px", md: "128px" }}
        fontWeight="bold"
        color="textLight"
      >
        404 :&#40;
      </Text>

      <Button
        leftIcon={<LuArrowLeft color="white" />}
        onClick={() => handleBackToHome() }
      >
        Take me home!
      </Button>
    </Flex>
  );
};

export default Page404;
