import { Flex, Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "~/lib/components/PrimaryButton";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => navigate("/");

  return (
    <Flex
      textAlign="center"
      flexDirection="column"
      gap={2}
      align="center"
      justifyContent="center"
      marginTop="20vh"
    >
      <Text
        fontSize={{base: "75px", md: "128px" }}
        fontWeight="bold"
        color="textDark"
      >
        404 :&#40;
      </Text>

      <PrimaryButton
        text="Take me home!"
        size="xs"
        onClick={handleBackToHome}
        leftIcon={<LuArrowLeft color="white" />}
      />
    </Flex>
  );
};

export default Page404;
