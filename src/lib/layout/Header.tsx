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
import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import SettingsDrawer from "../components/SettingsDrawer";
import { useAuth } from "../contexts/AuthContext";
import config from "~/config";

interface NavigationButtonProps {
  text: string;
  iconName: string;
  page: string;
  isExternal: boolean;
  targetId?: string;
  onClickEffect?: () => void;
}

const NavigationButton = (props: NavigationButtonProps) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleNavigation = () => {
    window.scrollTo(0, 0);
    if (props.onClickEffect) props.onClickEffect();

    if (props.isExternal) {
      window.open(props.page, "_blank");
      return;
    }
    
    navigate(props.page);

    if (props.targetId) {
      setTimeout(() => {
        const element = document.getElementById(props.targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  };

  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      padding="0"
      _hover={{
        bg: "transparent",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigation}
    >
      <HStack gap="10px">
        <Image
          src={
            isHovered
              ? `/assets/${props.iconName}-active-icon.svg`
              : `/assets/${props.iconName}-icon.svg`
          }
          height="15px"
        />
        <Text
          color={isHovered ? "primaryBlue.100" : "textLight"}
          fontWeight="bold"
        >
          {props.text}
        </Text>
      </HStack>
    </Button>
  );
};

interface HeaderProps {
  height: number;
}

const Header = (props: HeaderProps) => {
  const { isLoggedIn } = useAuth();
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

  const [homeIsHovered, setHomeIsHovered] = useState<boolean>(false);

  const NavigationButtonList = () => (
    <>
      <NavigationButton
        text="About"
        iconName="about"
        page="/"
        isExternal={false}
        targetId="about-section"
        onClickEffect={onPopoverClose}
      />
      <NavigationButton
        text="Model Hub"
        iconName="model-hub"
        page="/model-hub"
        isExternal={false}
        onClickEffect={onPopoverClose}
      />
      <NavigationButton
        text="API"
        iconName="api"
        page={config.API_DOC_URL}
        isExternal={true}
        onClickEffect={onPopoverClose}
      />
    </>
  );

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
        maxWidth={1750}
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
              <NavigationButtonList />
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
                <PopoverBody>
                  <VStack align="start" spacing="0">
                    <NavigationButtonList />
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
          {!isLoggedIn ? (
            <Button
              leftIcon={<LuUser color="white" />}
              size="sm"
              onClick={() => {
                navigate("/login");
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
                {isLoggedIn ? Cookies.get("email")[0].toUpperCase() : "?"}
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
