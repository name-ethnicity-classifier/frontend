import { Text, Button, Box, HStack, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ModelType } from "~/types";
import { useAuth } from "~/lib/contexts/AuthContext";
import RequestModelModal from "./RequestModelModal";
import { LuLock } from "react-icons/lu";
import Cookies from "js-cookie";


const MODEL_COLORS = ["#FFA7A7", "#F8D78F", "#8AB0F5", "#91E489", "#CCA4EF", "#F396B0", "#85DCEC", "#EBEB75", "#ED94EB", "#AA8EEA"];

interface ModelSelectionProps {
	models: ModelType[],
    selectedModel?: ModelType,
    selectModelHandler: (selectedModel: ModelType) => void,
    maxModelsReached: boolean
}


const ModelSelectionList = (props: ModelSelectionProps) => {
	const [showRequestModal, setShowRequestModal] = useState<boolean>(false);

    const { isLoggedIn } = useAuth();
	const toast = useToast();

	return (
        <VStack
            borderRadius="7px"
            bg="surfaceBlue.100"
            width="full"
            padding="3"
            gap="3"
        >
            {
                isLoggedIn ?
                    Cookies.get("access") != "full" ?
                        <Button
                            variant="secondary"
                            width="full"
                            margin="auto"
                            leftIcon={<LuLock />}
                            onClick={() => { window.location.reload() }}
                        >
                            Access not yet granted.
                        </Button>
                    :
                        <Button
                            width="full"
                            onClick={() => {
                                props.maxModelsReached ?
                                    toast({
                                        title: "Maximum amount of custom models reached!",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    })
                                : setShowRequestModal(true)
                            }}
                        >
                            + request custom model
                        </Button>
                :
                    <Button
                        width="full"
                        variant="secondary"
                        onClick={() => { window.location.href = "/login" }}
                        leftIcon={<LuLock />}
                    >
                        Log in to request models
                    </Button>
            }

            <VStack
                gap="3"
                width="full"
                overflowY="auto"
                className="no-scrollbar"
                maxHeight={{ base: "50vh", lg: "75vh" }}
            >    
                {
                    props.models.map((model: ModelType, key: number) => {
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
                                key={key}
                                maxWidth="300px"
                                transition="100ms ease-in-out"
                                boxShadow="sm"
                                cursor="pointer"
                                sx={isSelected ? selectedModelButtonStyle : modelButtonStyle}
                                onClick={() => props.selectModelHandler(model)}
                            >
                                <Box
                                    width="10px"
                                    aspectRatio="1"
                                    borderRadius="full"
                                    bg={MODEL_COLORS[key % MODEL_COLORS.length]}
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

            <RequestModelModal
                isOpen={showRequestModal}
                onCloseHandler={() => { setShowRequestModal(false) }}
            />

        </VStack>
	);
};

export default ModelSelectionList;
