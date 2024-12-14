import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
	Text,
	Button,
	useDisclosure,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
} from "@chakra-ui/react";
import ModelSelectionList from "./ModelSelectionList";
import { ModelType } from "~/types";



interface ModelSelectionPopoverProps {
    models: ModelType[],
    selectedModel?: ModelType,
    modelSelectionHandler: (model: ModelType) => void,
    maxModelsReached: boolean
}


const ModelSelectionPopver = (props: ModelSelectionPopoverProps) => {
	const { isOpen: isPopoverOpen, onToggle, onClose: onPopoverClose } = useDisclosure();
    
    return (
        <Popover
            isOpen={isPopoverOpen}
            onClose={onPopoverClose}
            closeOnBlur={true}
            placement="bottom-start"
        >
            <PopoverTrigger>
                <Button
                    paddingLeft="2"
                    paddingRight="3"
                    onClick={onToggle}
                    width={{ base: "full", sm: "auto"}}
                    justifyContent="left"
                    leftIcon={
                        isPopoverOpen ? 
                            <ChevronUpIcon
                                boxSize="5"
                                marginY="auto"
                            />
                        :
                            <ChevronDownIcon
                                boxSize="5"
                                marginY="auto"
                            />
                    }
                >
                    <Text
                        textOverflow="ellipsis"
                        color="white"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        maxWidth={{ base: "225px", xs: "auto" }}
                    >
                        {props.selectedModel?.name}
                    </Text>
                    
                </Button>
            </PopoverTrigger>
            <PopoverContent
                maxWidth="fit-content"
                borderColor="lightGray"
                boxShadow="lg"
                marginTop="2"
                width="auto"
            >
                <PopoverBody display="flex" flexDirection="column">
                    <ModelSelectionList
                        models={props.models}
                        selectedModel={props.selectedModel}
                        selectModelHandler={(model: ModelType) => {
                            onToggle();
                            props.modelSelectionHandler(model);
                        }}
                        maxModelsReached={props.maxModelsReached}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default ModelSelectionPopver;