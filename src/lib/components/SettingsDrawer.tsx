import { SettingsIcon, CopyIcon } from "@chakra-ui/icons";
import {
  LuShieldCheck,
  LuUser,
  LuArrowRight,
  LuMail,
  LuUserX,
  LuLogOut,
} from "react-icons/lu";
import {
  Box,
  Flex,
  useDisclosure,
  Heading,
  Text,
  Link,
  Button,
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useToast,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import DeleteModal from "./DeleteModal";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import EthicalGuidelineModal from "~/lib/components/EthicalGuidelinesModal";
import { deleteAccount, updateUsageDescription } from "../utils/serverRequests";
import { ConfirmationType } from "./DeleteModal";


interface SettingValueType {
  text: string;
  type: "text" | "hidden" | "link";
  link?: string;
  onclick?: () => void
}

const SettingsCardTable = (props: {
  rows: Record<string, SettingValueType>;
}) => {
  const toast = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied API key to clipboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Table style={{ borderCollapse: "separate", borderSpacing: "10px 10px" }}>
      <Tbody>
        {Object.entries(props.rows).map(([key, value]) => (
          <Tr key={key} backgroundColor="white">
            <Td
              paddingX="5"
              paddingY="3"
              boxShadow="sm"
              borderRadius="7"
              fontSize={{ base: "2xs", sm: "xs" }}
              width="45%"
            >
              <Text variant="bold">{key}</Text>
            </Td>
            <Td
              color="textLight"
              paddingX="5"
              paddingY="3"
              boxShadow="sm"
              borderRadius="7"
              fontSize={{ base: "2xs", sm: "xs" }}
              width="55%"
              maxWidth="150px"
            >
              {value.type === "text" ? (
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  onClick={value.onclick}
                >
                  {value.text}
                </Text>
              ) : value.type === "hidden" ? (
                <HStack justifyContent="space-between">
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {`${"●".repeat(200)}`}
                  </Text>
                  <Box>
                    <CopyIcon
                      onClick={() => handleCopy(value.text)}
                      color="primaryBlue.100"
                    />
                  </Box>
                </HStack>
              ) : value.type === "link" ? (
                <Link
                  href={value.link}
                  onClick={value.onclick}
                  isExternal
                  _hover={{
                    underline: "none",
                  }}
                >
                  <HStack
                    marginX="auto"
                    width="fit-content"
                    alignItems="center"
                  >
                    <Text variant="link">{value.text}</Text>
                    <LuArrowRight color="var(--chakra-colors-primaryBlue-100)" />
                  </HStack>
                </Link>
              ) : (
                "-"
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer = (props: SettingsDrawerProps) => {
  const { logOut } = useAuth();
  const toast = useToast();

  const maintainerName = "Theodor Peifer";
  const maintainerEmail = "theodorpeifer[at]gmail.com";
  const maintainerGitHub = "https://github.com/theopfr";

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);

  const [ethicalGuidelinesModalOpen, setEthicalGuidelinesModalOpen] = useState<boolean>(false);
  const [ethicalGuidelinesInteractive, setEthicalGuidelinesInteractive] = useState<boolean>(false);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");

  const handleDeleteConfirm = (password: string) => {
    setIsDeletingAccount(true);
    deleteAccount(password, () => {
        toast({
          title: "Account deleted.",
          description: "Your account has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        setTimeout(() => {
          setIsDeleteModalOpen(false);
          logOut();
        }, 2000);
      },
      () => {
        toast({
          title: "Failed to delete account.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsDeletingAccount(false);
        setIsDeleteModalOpen(false);
      }
    );
  };

  return (
    <Drawer
      placement="right"
      onClose={props.onClose}
      isOpen={props.isOpen}
      preserveScrollBarGap
    >
      <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <DrawerContent maxWidth="500px" padding="5" gap="5">
        <DrawerHeader padding="0">
          <HStack gap="3">
            <DrawerCloseButton
              position="relative"
              top="unset"
              right="unset"
              marginLeft="auto"
              backgroundColor="transparent"
              color="textDark"
              boxSize="15px"
            />
          </HStack>
        </DrawerHeader>

        <DrawerBody padding="0">
          <VStack alignItems="left" gap="5">
            <VStack
              alignItems="left"
              gap="2"
              bg="surfaceBlue.100"
              borderRadius="7"
            >
              <HStack margin="5" marginBottom="0">
                <LuUser color="var(--chakra-colors-primaryBlue-200)" />
                <Heading variant="h3" color="primaryBlue.100">
                  Profile
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  Email: { text: Cookies.get("email"), type: "text" },
                  "API key": { text: Cookies.get("token"), type: "hidden" },
                  "Usage description": { text: "update", type: "link", onclick: () => {
                    setEthicalGuidelinesInteractive(true);
                    setEthicalGuidelinesModalOpen(true);
                  }},
                }}
              />

              <VStack padding="10px" paddingTop="0" gap="3">
                <Button
                  variant="secondary"
                  width="full"
                  leftIcon={
                    <LuLogOut color="var(--chakra-colors-primaryBlue-100" />
                  }
                  onClick={() => {
                    logOut();
                    window.location.href = "/";
                  }}
                >
                  Log out
                </Button>

                <Button
                  variant="cautious"
                  width="full"
                  leftIcon={
                    <LuUserX color="var(--chakra-colors-primaryRed-100" />
                  }
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete account
                </Button>
              </VStack>
            </VStack>

            <VStack
              alignItems="left"
              gap="2"
              bg="surfaceBlue.100"
              borderRadius="7"
            >
              <HStack margin="5" marginBottom="0">
                <LuShieldCheck color="var(--chakra-colors-primaryBlue-200)" />
                <Heading variant="h3" color="primaryBlue.100">
                  Legal
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  "Terms of Services": { text: "read", type: "link", link: "/terms-of-service" },
                  "Privacy Policy": { text: "read", type: "link", link: "/privacy-policy" },
                  "Ethical Guidelines": { text: "read", type: "link", onclick: () => {
                    setEthicalGuidelinesInteractive(false);
                    setEthicalGuidelinesModalOpen(true);
                  }},
                }}
              />
            </VStack>

            <VStack
              alignItems="left"
              gap="2"
              bg="surfaceBlue.100"
              borderRadius="7"
            >
              <HStack margin="5" marginBottom="0">
                <LuMail color="var(--chakra-colors-primaryBlue-200)" />
                <Heading variant="h3" color="primaryBlue.100">
                  Contact
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  Maintainer: { text: maintainerName, type: "text" },
                  Email: { text: maintainerEmail, type: "text" },
                  GitHub: {
                    text: "visit",
                    type: "link",
                    link: maintainerGitHub,
                  },
                }}
              />
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>

      {isDeleteModalOpen && (
        <DeleteModal
          deleteEntityName="account"
          deleteText="Are you sure you want to delete your account? This action cannot be undone."
          onDeleteConfirm={(password?: string) => handleDeleteConfirm(password || "")}
          confirmationType={ConfirmationType.PASSWORD}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          isLoading={isDeletingAccount}
        />
      )}

      <EthicalGuidelineModal
        isOpen={ethicalGuidelinesModalOpen}
        includeInteractiveStages={ethicalGuidelinesInteractive}
        submitText={"Update"}
        onComplete={(usageDescription: string | undefined) => {
          if (usageDescription) {
            updateUsageDescription(usageDescription, () => {
              toast({
                title: "Usage description updated.",
                description: "We will review your provided description and then grant you access to our models. Please be patient and check in again later!",
                status: "success",
                duration: 10000,
                isClosable: true,
              });
            });
          }
          setEthicalGuidelinesModalOpen(false);
        }}
        onClose={() => setEthicalGuidelinesModalOpen(false)}
      />
    </Drawer>
  );
};

export default SettingsDrawer;
