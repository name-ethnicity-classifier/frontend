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
	useBreakpointValue,
	useToast,
	Badge
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";
import { fetchDefaultModels, fetchModels } from "~/lib/utils/serverRequests";
import DeleteModal from "~/lib/components/DeleteModal";
import ModelDetails from "./components/ModelDetails";
import { useAuth } from "~/lib/contexts/AuthContext";
import { ModelType } from "~/types";
import ModelSelectionList from "./components/ModelSelectionList";
import { deleteModel } from "~/lib/utils/serverRequests";
import ModelSelectionPopver from "./components/ModelSelectionPopver";


const ModelHub = () => {
	const toast = useToast();
	const { isLoggedIn } = useAuth();

	const isMediumViewPort = useBreakpointValue({ base: true, lg: false });
	const isSmallViewPort = useBreakpointValue({ base: true, md: false });

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
	const [models, setModels] = useState<ModelType[]>([]);
	const [maxModelsReached, setMaxModelsReached] = useState<boolean>(false);

	useEffect(() => {
		if (isLoggedIn === undefined) {
			return;
		}

		if (isLoggedIn) {
			fetchModels(
				(customModels: ModelType[], defaultModels: ModelType[]) => {
					if (customModels.length >= 10) {
						setMaxModelsReached(true);
					}

					setModels(defaultModels.concat(customModels));
					setSelectedModel(defaultModels[0]);
				},
				() => showErrorToast()
			);
		}
		else {
			fetchDefaultModels(
				(defaultModels: ModelType[]) => {
					setModels(defaultModels);
					setSelectedModel(defaultModels[0]);
				},
				() => showErrorToast()
			);
		}
	}, [isLoggedIn]);

	const showErrorToast = () => {
		toast({
			title: "Failed to reach server",
			description: "We are sorry for the inconvenience. Please try again later.",
			status: "error",
			duration: 60000,
			isClosable: false,
		});
	}

	if (models.length == 0) {
		return <Box height="100vh"><Text>Loading...</Text></Box>
	}

	return (
		<HStack
			textAlign="center"
			gap="4"
			marginX="auto"
			width="full"
			marginY="4"
			marginBottom="100"
			alignItems="top"
		>
			{
				!isMediumViewPort ?
					<VStack
						flex="1"
						gap="4"
						maxWidth="275px"
					>
						<Flex
							width="full"
							bg="surfaceBlue.100"
							padding="3"
							gap="5"
							alignItems="center"
							borderRadius="7px"
						>
							<Text variant="bold" color="primaryBlue.100">
								Models:
							</Text>
						</Flex>

						<ModelSelectionList
							models={models}
							selectedModel={selectedModel}
							selectModelHandler={(model: ModelType) => {
								setSelectedModel(model)
							}}
							maxModelsReached={maxModelsReached}
						/>
					</VStack>
				:
					null
			}
			
			<VStack flex="4" gap="4">
				<Flex
					width="full"
					bg="surfaceBlue.100"
					padding="3"
					gap="5"
					alignItems="center"
					borderRadius="7px"
				>
					{
						isMediumViewPort ?
							<ModelSelectionPopver
								models={models}
								selectedModel={selectedModel}
								modelSelectionHandler={(model: ModelType) => setSelectedModel(model)}
								maxModelsReached={maxModelsReached}
							/>
						:
							null	
					}
					{
						!isSmallViewPort ?
							<Text variant="bold" color="primaryBlue.100">
								Selected:
							</Text>
						:
							null
					}

					<Text fontSize="xs" isTruncated>
						{selectedModel?.name}
					</Text>
					
					{
						isLoggedIn && selectedModel?.isCustom ?
							<HStack
								marginLeft="auto"
								height="100%"
								aspectRatio="1"
								borderRadius="4px"
								justifyContent="center"
							>
								<DeleteIcon
									color="primaryBlue.100"
									margin="2px"
									cursor="pointer"
									_hover={{
										color: "primaryBlue.200",
									}}
									onClick={onOpen}
								/>
							</HStack>
						:
							null

					}
				</Flex>
				
				{
					selectedModel?.accuracy ?
						<ModelDetails selectedModel={selectedModel}/>	
					:
						<VStack
							minHeight="75vh"
							alignItems="center"
							justifyContent="center"
							gap="7"
							marginX="10"
						>	
							<Image
								src="/assets/hourglass-illustration.svg"
								height="25%"	
							/>
							<Heading
								variant="h3"
								color="secondaryBlue.200"
								maxWidth="500px"
							>
								This model is currently queued to be trained. Check in again later!
							</Heading>
						</VStack>
				}
					
			</VStack>

			<DeleteModal
				deleteEntitiyName="model"
				deleteText={`Are you sure you want to delete the model '${selectedModel?.name}'? This action cannot be undone.`}
				onDeleteConfirm={() => {
					if (!selectedModel) {
						return;
					}
					deleteModel(
						selectedModel.name,
						() => {
							onClose();
							toast({
								title: `Successfully deleted the model ${selectedModel.name}.`,
								status: "success",
								duration: 3000,
								isClosable: true,
							});
							setModels(
								(prevModels: ModelType[]) => prevModels.filter((model: ModelType) => model.name !== selectedModel.name)
							);
							setSelectedModel(models[0])
						},
						(errorCode: string) => {
							toast({
								title: "Failed to delete model.",
								description: errorCode,
								status: "error",
								duration: 5000,
								isClosable: true
							});
						}
					);
				}}
				isOpen={isOpen}
				onClose={onClose}
			/>

		</HStack>
	);
};

export default ModelHub;
