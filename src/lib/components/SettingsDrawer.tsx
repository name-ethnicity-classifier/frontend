import { SettingsIcon, CopyIcon } from "@chakra-ui/icons";
import { LuShieldCheck, LuUser, LuArrowRight, LuMail, LuUserX, LuLogOut } from "react-icons/lu";
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
  IconButton,
  Table, Thead, Tbody, Tr, Th, Td,
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



interface SettingValueType {
  text: string,
  type: "text" | "hidden" | "link",
  link?: string
}

const SettingsCardTable = (props: { rows: Record<string, SettingValueType> }) => {
  const toast = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied API key to clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <Table
      style={{ borderCollapse: "separate", borderSpacing: "10px 10px" }}
    >
      <Tbody>
        {
          Object.entries(props.rows).map(([key, value]) => (
            <Tr
              key={key}
              backgroundColor="white"
            >
              <Td
                paddingX="5"
                paddingY="3"
                boxShadow="sm"
                borderRadius="7"
                fontSize={{ base: "2xs", sm: "xs"}}
                width="45%"
              >
                <Text
                  variant="bold"
                >
                  {key}
                </Text>
              </Td>
              <Td
                color="textLight"
                paddingX="5"
                paddingY="3"
                boxShadow="sm"
                borderRadius="7"
                fontSize={{ base: "2xs", sm: "xs"}}
                width="55%"
                maxWidth="150px"
              >
                {
                  value.type === "text" ?
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {value.text}
                    </Text>
                  : value.type === "hidden" ?
                    <HStack
                      justifyContent="space-between"
                    >
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
                  : value.type === "link" ?
                    <Link
                      href={value.link}
                      isExternal
                      _hover={{
                        underline: "none"
                      }}
                    >
                      <HStack
                        marginX="auto"
                        width="fit-content"
                        alignItems="center"
                      >
                        <Text
                          variant="link"
                        >
                          {value.text}
                        </Text>
                        <LuArrowRight color="var(--chakra-colors-primaryBlue-100)"/>
                      </HStack>
                    </Link>
                  : "-"
                }
              </Td>
            </Tr>
          ))
        }
      </Tbody>
    </Table>
  );
}



interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}


const SettingsDrawer = (props: SettingsDrawerProps) => {
  const { logOut } = useAuth();

  const name = "theodor peifer"
  const role = "student"
  const email = "teddypeifer@gmail.com"
  const api_key = "nf043th4gbew0b430gj34"

  const maintainerName = "Theodor Peifer"
  const maintainerEmail = "theodorpeifer@gmail.com"
  const maintainerGitHub = "https://github.com/theopfr"

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDeleteConfirm = () => {
    logOut();
    toast({
      title: "Account deleted.",
      description: "Your account has been successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Drawer
      placement="right"
      onClose={props.onClose}
      isOpen={props.isOpen}
      preserveScrollBarGap
    >
      <DrawerOverlay
        bg="blackAlpha.300"
				backdropFilter="blur(10px)"
      />
      <DrawerContent
        maxWidth="500px"
        padding="5"
        gap="5"
      >

        <DrawerHeader
          padding="0"
        >
          <HStack gap="3">
            <SettingsIcon color="textDark" boxSize="25px" />
            <Heading
              variant="h2"
            >
              Settings
            </Heading>
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

        <DrawerBody
          padding="0"
        >
          <VStack
            alignItems="left"
            gap="5"
          >
            <VStack
              alignItems="left"
              gap="2"
              bg="surfaceBlue.100"
              borderRadius="7"
            >
              <HStack
                margin="5"
                marginBottom="0"
              >
                <LuUser color="var(--chakra-colors-primaryBlue-200)" />
                <Heading
                  variant="h3"
                  color="primaryBlue.100"
                >
                  Profile
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  "Name": { text: name, type: "text" },
                  "Email": { text: email, type: "text" },
                  "Role": { text: role, type: "text" },
                  "API key": { text: api_key, type: "hidden" }
                }}
              />

              <VStack
                padding="10px"
                paddingTop="0"
                gap="3"
              >
                <Button
                  variant="secondary"
                  width="full"
                  leftIcon={<LuLogOut color="var(--chakra-colors-primaryBlue-100"/>}
                  onClick={() => {
                    logOut();
                    window.location.href = "/"
                  }}
                >
                  Log out
                </Button>

                <Button
                  variant="cautious"
                  width="full"
                  leftIcon={<LuUserX color="var(--chakra-colors-primaryRed-100"/>}
                  onClick={() => onOpen()}
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
              <HStack
                margin="5"
                marginBottom="0"
              >
                <LuShieldCheck color="var(--chakra-colors-primaryBlue-200)" />
                <Heading
                  variant="h3"
                  color="primaryBlue.100"
                >
                  Legal
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  "Terms of Services": { text: "read", type: "link" },
                  "Privacy Policy": { text: "read", type: "link" },
                }}
              />
            </VStack>

            <VStack
              alignItems="left"
              gap="2"
              bg="surfaceBlue.100"
              borderRadius="7"
            >
              <HStack
                margin="5"
                marginBottom="0"
              >
                <LuMail color="var(--chakra-colors-primaryBlue-200)" />
                <Heading
                  variant="h3"
                  color="primaryBlue.100"
                >
                  Contact
                </Heading>
              </HStack>

              <SettingsCardTable
                rows={{
                  "Maintainer": { text: maintainerName, type: "text" },
                  "Email": { text: maintainerEmail, type: "text" },
                  "GitHub": { text: "visit", type: "link", link: maintainerGitHub },
                }}
              />

            </VStack>

          </VStack>

        </DrawerBody>
      </DrawerContent>

      {isOpen && (
        <DeleteModal
          deleteEntitiyName="account"
          deleteText="Are you sure you want to delete your account? This action cannot be undone."
          onDeleteConfirm={handleDeleteConfirm}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}

    </Drawer>
  );
};

export default SettingsDrawer;
