import { Box, Flex, Image, Text, Button, HStack } from '@chakra-ui/react';
import { FC } from 'react';


const Header = () => {

  const NavbarButton: FC<{text: string, page: string}>  = ({ text, page }) => {
    return (
      <Button onClick={() => {
        window.location.href = `/${page}`
      }}
        backgroundColor="transparent"
        width="fit-content"
        padding="0"
      >
        <HStack gap="10px">
          <Image src="/assets/navbar-icon.svg" height="15px"/>
          <Text fontSize="xs" color="textLight" fontWeight="bold">{text.toUpperCase()}</Text>
        </HStack>
      </Button>
    )
  }

  return (
    <Flex
      as="header"
      width="full"
      height="50px"
      align="center"
      alignSelf="flex-start"
      justifyContent="space-between"
      gridGap={2}
      borderBottomWidth={1}
      borderBottomColor="lightGray"
    >
      <HStack gap="10px">
        <Image src="/assets/logo.svg" />
        <Text fontSize="sm" fontWeight="bold" color="textLight">name-to-ethnicity</Text>
      </HStack>

      <HStack gap="5">
        <HStack gap="4">
          <NavbarButton text="about" page="" />
          <NavbarButton text="model hub" page="model-hub" />
          <NavbarButton text="API" page="api" />
        </HStack>
        
        <Button
          backgroundColor="primaryBlue"
          width="fit-content"
          height="25px"
          paddingX="5px"
        >
          <Text fontSize="xs" fontWeight="bold" color="white">LOGIN</Text>
        </Button>
      </HStack>
    </Flex>
  );
};

export default Header;
