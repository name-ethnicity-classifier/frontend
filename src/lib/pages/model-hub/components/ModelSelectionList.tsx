import { Flex, Text, Link, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import { ModelType } from "~/types";
import { useAuth } from "~/lib/contexts/AuthContext";


interface ModelSelectionProps {
	models: ModelType[],
    selectedModel: ModelType,
    selectModelHandler: (selectedModel: ModelType) => void
}


const ModelSelectionList = (props: ModelSelectionProps) => {
    const { isLoggedIn } = useAuth();

	return (
        <VStack
            borderRadius="7px"
            bg="surfaceBlue.100"
            width="full"
            padding="4"
            gap="4"
        >
            {
                isLoggedIn ?
                    <Button width="full">
                        + Request custom model
                    </Button>
                :
                    null
            }
            
            {
                props.models.map((model: ModelType) => {
                    const isSelected = model.name === props.selectedModel?.name;

                    let modelButtonStyle = {
                        bg: "white",
                        color: "textLight",
                        fontWeight: "normal",
                        _hover: {
                            bg: "secondaryBlue.100",
                        }
                    }

                    let selectedModelButtonStyle = {
                        bg: "secondaryBlue.100",
                        color: "primaryBlue.100",
                        _hover: {
                            bg: "secondaryBlue.200",
                        }
                    }

                    return (
                        <HStack
                            width="full"
                            borderRadius="7px"
                            paddingY="10px"
                            paddingX="3"
                            gap="3"
                            maxWidth="300px"
                            transition="100ms ease-in-out"
                            boxShadow="sm"
                            cursor="pointer"
                            sx={
                                isSelected ? selectedModelButtonStyle
                                : modelButtonStyle
                            }
                            onClick={() => props.selectModelHandler(model)}
                        >
                            <Box
                                width="10px"
                                aspectRatio="1"
                                borderRadius="full"
                                bg={isSelected ? "primaryBlue.100" : "secondaryBlue.100"}
                            />
                            <Text maxWidth="75%"
                                color={isSelected ? "primaryBlue.100" : "textLight"}
                                isTruncated
                            >
                                {model.name}
                            </Text>

                        </HStack>
                    )
                })
            }
        </VStack>
	);
};

export default ModelSelectionList;
