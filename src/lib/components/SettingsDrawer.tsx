import { SettingsIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  Button,
  HStack,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDrawer = (props: SettingsDrawerProps) => {
  return (
    <Drawer placement="right" onClose={props.onClose} isOpen={props.isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <HStack justifyContent="">
            <SettingsIcon color="textDark" boxSize="20px" />
            <Text fontSize="sm" color="textDark">
              User Settings
            </Text>
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
        <DrawerBody>TODO</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
