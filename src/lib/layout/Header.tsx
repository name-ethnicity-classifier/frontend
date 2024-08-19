import { HamburgerIcon } from "@chakra-ui/icons";
import {
  VStack,
  Flex,
  Image,
  Text,
  Link,
  Button,
  HStack,
  useBreakpointValue,
  useDisclosure,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import type { FC } from "react";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../components/PrimaryButton";
import SettingsDrawer from "../components/SettingsDrawer";


const NavbarButton: FC<{ text: string; iconName: string, page: string }> = ({ text, iconName, page }) => {
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
        bg: "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={goToPage}
    >
      <HStack gap="10px">
        <Image
          src={
            isHovered
              ? `/assets/${iconName}-active-icon.svg`
              : `/assets/${iconName}-icon.svg`
          }
          height="15px"
        />
        <Text
          color={isHovered ? "primaryBlue.100" : "textLight"}
          fontWeight="bold"
        >
          {text}
        </Text>
      </HStack>
    </Button>
  );
};


interface HeaderProps {
  height: number
}

const Header = (props: HeaderProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: settingsIsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const {
    isOpen: isPopoverOpen,
    onToggle,
    onClose: onPopoverClose,
  } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [homeIsHovered, setHomeIsHovered] = useState<boolean>(false);

  return (
    <Flex
      as="header"
      position="fixed"
      width="full"
      height={props.height}
      borderBottomWidth={1}
      borderBottomColor="surfaceBlue.200"
      backgroundColor="white"
      zIndex={1000}
    >
      <Flex
        width="full"
        marginX="auto"
        maxWidth={1500}
        paddingX={{ base: "2.5", md: "10", lg: "50", xl: "100" }}
        alignSelf="center"
        justifyContent="space-between"
        gridGap={2}
      >
        <Link
          gap="10px"
          _hover={{
            cursor: "pointer",
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
            marginY="auto"
            color={homeIsHovered ? "primaryBlue.100" : "textLight"}
          >
            name-to-ethnicity
          </Text>
        </Link>

        <HStack gap={{ base: "10px", md: 10 }}>
          {!isMobile ? (
            <HStack gap="10">
              <NavbarButton text="About" iconName="about" page="/" />
              <NavbarButton text="Model Hub" iconName="model-hub" page="/model-hub" />
              <NavbarButton text="API" iconName="api" page="/api" />
            </HStack>
          ) : (
            <Popover
              isOpen={isPopoverOpen}
              onClose={onPopoverClose}
              closeOnBlur
              placement="bottom-start"
            >
              <PopoverTrigger>
                <IconButton
                  icon={<HamburgerIcon color="textLight" />}
                  backgroundColor="transparent"
                  aria-label="Open Menu"
                  marginY="auto"
                  _hover={{ backgroundColor: "surfaceBlue.100" }}
                  onClick={onToggle}
                />
              </PopoverTrigger>
              <PopoverContent
                maxWidth="fit-content"
                borderColor="lightGray"
                boxShadow="lg"
                marginTop="2"
                width="auto"
              >
                <PopoverBody display="flex" flexDirection="column">
                  <VStack align="start" spacing="0">
                    <NavbarButton text="About" page="/" />
                    <NavbarButton text="Model Hub" page="/model-hub" />
                    <NavbarButton text="API" page="/api" />
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          {!isLoggedIn ? (
            <Button
              leftIcon={<LuUser color="white" />}
              onClick={() => {
                //navigate("/login")
                setIsLoggedIn(true);
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                borderRadius="full"
                size="sm"
                bgGradient="linear(to-br, purple.300, primaryBlue.100)"
                marginY="auto"
                color="white"
                _hover={{
                  bgGradient: "linear(to-br, purple.400, secondaryBlue.200)",
                }}
                onClick={onSettingsOpen}
              >
                {userEmail ? userEmail[0] : "?"}
              </Button>
              <SettingsDrawer
                isOpen={settingsIsOpen}
                onClose={onSettingsClose}
              />
            </>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
