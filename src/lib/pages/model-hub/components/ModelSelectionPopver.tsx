import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Flex,
	Text,
	IconButton,
	Image,
	Button,
	Heading,
	Box,
	Checkbox,
	useDisclosure,
	HStack,
	VStack,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	useToast
} from "@chakra-ui/react";
import ModelSelectionList from './ModelSelectionList';
import { ModelType } from '~/types';



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
                    padding="1"
                    onClick={onToggle}
                >
                    <HamburgerIcon
                        variant="text"
                        color="white"
                        size="sm"
                    />
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