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

const NavbarButton: FC<{ text: string; page: string }> = ({ text, page }) => {
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
              ? "/assets/navbar-icon-blue.svg"
              : "/assets/navbar-icon.svg"
          }
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
  );
};

const Header = () => {
  const navigate = useNavigate();

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
      width="full"
      align="center"
      borderBottomWidth={1}
      borderBottomColor="lightGray"
    >
      <Flex
        width="full"
        marginX="auto"
        maxWidth={1500}
        paddingX={{ base: "2.5", md: "10", lg: "50", xl: "100" }}
        paddingY="2.5"
        alignSelf="flex-start"
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
            color={homeIsHovered ? "primaryBlue" : "textLight"}
          >
            name-to-ethnicity
          </Text>
        </Link>

        <HStack gap={{ base: "10px", md: 10 }}>
          {!isMobile ? (
            <HStack gap="10">
              <NavbarButton text="About" page="/" />
              <NavbarButton text="Model Hub" page="/model-hub" />
              <NavbarButton text="API" page="/api" />
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
                  _hover={{ backgroundColor: "surfaceBlue" }}
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
          {isLoggedIn ? (
            <PrimaryButton
              size="xs"
              text="Login"
              leftIcon={<LuUser color="white" />}
              onClick={() => navigate("/login")}
            />
          ) : (
            <>
              <Button
                borderRadius="full"
                size="sm"
                bgGradient="linear(to-br, purple.300, primaryBlue)"
                marginY="auto"
                color="white"
                _hover={{
                  bgGradient: "linear(to-br, purple.300, secondaryBlue)",
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
