import { Box, Button, Flex, Text } from "@chakra-ui/react";

interface PrimaryButtonProps {
  size: "xs" | "sm";
  text: string;
  onClick: () => void;
  width?: number | string,
  leftIcon?: any;
  rightIcon?: any;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Button
      backgroundColor="primaryBlue"
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
        backgroundColor: "primaryBlueHover",
      }}
    >
      <Text fontSize={props.size} color="white">
        {props.text}
      </Text>
    </Button>
  );
};

export default PrimaryButton;
