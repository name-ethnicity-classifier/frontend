import { Flex, Box, Text, VStack, Spacer, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import CountUp from "react-countup";



interface NumberCardProps {
  number: number,
  text: string,
  onClick?: () => void
}


const NumberCard = (props: NumberCardProps) => {

  return (
    <Flex
      backgroundColor="white"
      borderColor="secondaryBlue"
      borderWidth="1px"
      paddingX={{ base: "2", xl: "12" }}
      paddingY="5"
      borderRadius="7"
      align="center"
      gap={{ base: "0", xl: "10" }}
      maxWidth={{ base: "full", md: "350px" }}
      flexDirection={{ base: "column", xl: "row" }}
      flex="1"
      _hover={{
        bg: "surfaceBlue",
        borderColor: "surfaceBlue",
        cursor: "pointer"
      }}
    >
      <Text
        fontWeight="bold"
        fontSize={{ base: "3xl", md: "4xl" }}
        color="textDark"
      >
        <CountUp
          start={0}
          end={props.number}
          duration={2.0}
        />
      </Text>
      <Text
        fontSize={{ base: "sm", md: "sm" }}
        color="textLight"
        textAlign={{ base: "center", xl: "left" }}
      >
        {props.text}
      </Text>
    </Flex>
  );
};

export default NumberCard;
