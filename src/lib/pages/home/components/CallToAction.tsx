import { Flex, Box, Text, VStack, Spacer, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import PrimaryButton from "~/lib/components/PrimaryButton";


const CallToAction = () => {

  const changeLayout = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      bg="surfaceBlue"
      paddingY={{ base: "50px", md: "75px"}}
      width="full"
    >
      <Flex
        maxWidth={1500}
        paddingX={{ base: "5", md: "10", lg: "50", xl: "100" }}
        marginX="auto"
        flexDirection="row"
      >
        <VStack
          align="left"
          flex="4"
          gap="6"
          justifyContent="center"
          paddingY="auto"
        >
          <Text
            fontSize={{ base: "22px", sm: "27px", md: "35px", xl: "45px" }}
            fontWeight="bold"
            color="textDark"
            whiteSpace="pre-wrap"
          >
            {"Classify Names into\ntheir Ethnicities"}
          </Text>
          
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="textLight"
          >
            The non-profit N2E helps you uncover ethnic imbalances among your research, patients, clients, customers, and whatever other people you care for!
          </Text>

          <Flex
            gap="5"
            flexDirection={{ base: "row", md: "row" }}
            align="center"
          >

            {
              !changeLayout ?
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="primaryBlue"
                >
                  to get started, check out ...
                </Text>
              :
                null
            }

            <PrimaryButton
              size="xs"
              text="how it works!"
              rightIcon={<LuArrowRight color="white" />}
            />
          </Flex>
          
        </VStack>

        <Spacer flex={{ base: "0.0", sm: "0.5", md: "1", "2xl": "2" }} />
        
        { 
          !changeLayout ?
            <Image
              flex="2"
              marginY="auto"
              height="300px"
              marginRight="5"
              src="/assets/world-illustration.svg"
            />
          :
            <Image
              flex="2"
              marginY="auto"
              height="250px"
              marginRight="-200px"
              src="/assets/world-illustration-mobile.svg"
            />
        }
      </Flex>
    </Box>
  );
};

export default CallToAction;
