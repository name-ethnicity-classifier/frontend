import {
    Box,
    Button,
    Flex,
    Text,
  } from "@chakra-ui/react";
  

  interface PrimaryButtonProps {
    size: "xs" | "sm",
    text: string,
    onClick: () => void
    leftIcon?: any
  }

  const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <Button
            backgroundColor="primaryBlue"
            borderRadius={7}
            onClick={props.onClick}
            width="fit-content"
            paddingY={props.size === "xs" ? "10px" : "13px"}
            paddingX={props.size === "xs" ? "12px" : "15px"}
            height="auto"
            size={props.size}
            leftIcon={props.leftIcon}
            _hover={{
                backgroundColor: "secondaryBlue"
            }}
        >
            <Text
                fontSize={props.size}
                color="white"
            >
                {props.text}
            </Text>
        </Button>

    );
  };
  
  export default PrimaryButton;
  