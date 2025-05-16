import { Flex, Box, Text, VStack, Spacer, Image, Button, useBreakpointValue, HStack } from "@chakra-ui/react";
import { BiSolidMegaphone } from "react-icons/bi";
import { LuArrowRight, LuMegaphone } from "react-icons/lu";
import Pill from "~/lib/components/Pill";


const CallToAction = () => {

  const changeLayout = useBreakpointValue({ base: true, lg: false });

  return (
    <Box
      bg="surfaceBlue.100"
      paddingY={{ base: "50px", md: "75px"}}
      width="full"
    >
      <Flex
        maxWidth={1750}
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
          <Pill
            colorPalette="turquoise"
            keepCasing={true}
            icon={<BiSolidMegaphone color="var(--chakra-colors-primaryTurquoise-100)"/>}
            text={"name-to-ethnicity v1.0"}
          />

          <Text
            fontSize={{ base: "22px", sm: "27px", md: "35px", xl: "45px" }}
            fontWeight="bold"
            color="textDark"
            whiteSpace="pre-wrap"
            lineHeight={1.2}
          >
            {"Classify names into their most likely ethnic origins"}
          </Text>
          
          <Text
            fontSize={{ base: "xs", md: "sm" }}
          >
            This non-profit onomastics tool helps you uncover ethnic disparities and better understand the diversity within your research data.
          </Text>

          <Flex
            gap="5"
            flexDirection={{ base: "row", md: "row" }}
            align="center"
          >

            {
              !changeLayout ?
                <Text
                  variant="bold"
                  color="primaryBlue.100"
                >
                  to get started, check out ...
                </Text>
              :
                null
            }

            <Button
              rightIcon={<LuArrowRight color="white" />}
              onClick={() => {
                setTimeout(() => {
                  const element = document.getElementById("how-it-works-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 0);
              }}
            >
              how it works!
            </Button>
          </Flex>
          
        </VStack>

        <Spacer flex={{ base: "0.0", sm: "0.5", md: "0.5", "2xl": "2" }} />
        
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
