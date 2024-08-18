import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface SecondaryButtonProps {
  size: "xs" | "sm";
  text: string;
  onClick: () => void;
  width?: number | string,
  leftIcon?: any;
  rightIcon?: any;
  theme: "blue" | "red"
}

const SecondaryButton = (props: SecondaryButtonProps) => {
  return (
    <Button
      backgroundColor={props.theme === "red" ? "secondaryRed" : "secondaryBlue"}
      borderRadius={7}
      onClick={props.onClick}
      width={props.width || "fit-content"}
      paddingY={props.size === "2xs" ? "8px" : props.size === "xs" ? "12px" : "15px"}
      paddingX={props.size === "2xs" ? "11px" : props.size === "xs" ? "14px" : "17px"}
      height="auto"
      size={props.size}
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      _hover={{
        backgroundColor: "surfaceBlue",
      }}
    >
      <Text
        fontSize={props.size}
        color={props.theme === "red" ? "primaryRed" : "primaryBlue"}
      >
        {props.text}
      </Text>
    </Button>
  );
};

export default SecondaryButton;
