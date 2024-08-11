import { Box, Flex, Image, Text, Link, Button, HStack, IconButton } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import { LuUser } from "react-icons/lu";
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';


const NavbarButton: FC<{text: string, page: string}>  = ({ text, page }) => {
  const navigate = useNavigate();
  const goToPage = () => navigate(page);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <Button
      as="a"
      backgroundColor="transparent"
      width="fit-content"
      padding="0"
      _hover={{
        bg: "transparent"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={goToPage}
    >
      <HStack gap="10px">
        <Image
          src={isHovered ? "/assets/navbar-icon-blue.svg" : "/assets/navbar-icon.svg"} 
          height="15px"
        />
        <Text
          fontSize="xs"
          color={isHovered ? "primaryBlue" : "textLight"} 
          fontWeight="bold"
        >
          {text}
        </Text>
      </HStack>
    </Button>
  )
}



const Header = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => navigate('/');

  const [homeIsHovered, setHomeIsHovered] = useState<boolean>(false);
  
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      borderBottomWidth={1}
      borderBottomColor="lightGray"
    >
      <Flex
        width="full"
        marginX="auto"
        maxWidth={1500}
        paddingX={100}
        height="50px"
        alignSelf="flex-start"
        justifyContent="space-between"
        gridGap={2}
      >
        <Link
          gap="10px"
          _hover={{
            cursor: "pointer"
          }}
          href="/"
          onMouseEnter={() => setHomeIsHovered(true)}
          onMouseLeave={() => setHomeIsHovered(false)}
          marginY="auto"
          display="flex"
          flexDirection="row"
        >
          <Image src="/assets/logo.svg" height="30px" />
          <Text
            fontSize="sm"
            fontWeight="medium"
            color={homeIsHovered ? "primaryBlue" : "textLight"}
          >name-to-ethnicity</Text>
        </Link>

        <HStack gap="5">
          <HStack gap="4">
            <NavbarButton text="About" page="/" />
            <NavbarButton text="Model Hub" page="/model-hub" />
            <NavbarButton text="API" page="/api" />
          </HStack>
          
          <PrimaryButton
            size="xs"
            text="Login"
            leftIcon={<LuUser color="white"/>}
            onClick={() => navigate("/login")}
          />
        </HStack>
        </Flex>
    </Flex>
  );
};

export default Header;
