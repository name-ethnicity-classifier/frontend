import { Flex, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ArrowForwardIcon, InfoOutlineIcon } from "@chakra-ui/icons";



interface LinkCardProps {
  subTitle: string,
  title: string,
  link: string,
  linkText: string
}


const LinkCard = (props: LinkCardProps) => {
  return (
    <Flex
      backgroundColor="surfaceBlue"
      padding="3"
      borderRadius="7"
      align="left"
      gap="2"
      flexDirection="column"
      maxWidth={{ base: "full", md: "500px" }}
      flex="1"
      height="100%"
    >
      <HStack>
        <InfoOutlineIcon color="primaryBlue" marginY="auto" />
        <Text
          textAlign="left"
        >
          {props.subTitle}
        </Text>
      </HStack>
      
      <Text
        variant="bold"
        textAlign="left"
      >
        <i>{props.title}</i>
      </Text>
      <Link
        href={props.link}
        _hover={{
          underline: "none",
          paddingLeft: "5"
        }}
        isExternal={true}
        display="flex"
        flexDirection="row"
        gap="1"
        width="fit-content"
        transition="ease-out 0.15s"
        marginTop="auto"
      >
        <Text
          fontSize="xs"
          fontWeight="bold"
          color="primaryBlue"
        >
          {props.linkText}
        </Text>
        <ArrowForwardIcon color="primaryBlue" marginY="auto" />
      </Link>
    </Flex>
  );
};

export default LinkCard;
