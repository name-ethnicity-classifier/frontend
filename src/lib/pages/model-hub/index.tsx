import {
	Flex,
	Text,
	Image,
	Heading,
	Box,
	useDisclosure,
	HStack,
	VStack,
	useBreakpointValue,
	useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";
import { fetchDefaultModels, fetchModels } from "~/lib/utils/serverRequests";
import DeleteModal, { ConfirmationType } from "~/lib/components/DeleteModal";
import ModelDetails from "./components/ModelDetails";
import { useAuth } from "~/lib/contexts/AuthContext";
import { ModelType } from "~/types";
import ModelSelectionList from "./components/ModelSelectionList";
import { deleteModel } from "~/lib/utils/serverRequests";
import ModelSelectionPopver from "./components/ModelSelectionPopver";
import Pill from "~/lib/components/Pill";
import { LuEye } from "react-icons/lu";
import ListModal from "~/lib/components/ListModal";
import { useSearchParams } from "react-router-dom";


const ModelHub = () => {

	const [queryParams, setQueryParams] = useSearchParams();
	const toast = useToast();
	const { isLoggedIn } = useAuth();
	const isMediumViewPort = useBreakpointValue({ base: true, lg: false });
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
	const [models, setModels] = useState<ModelType[]>([]);
	const [modelsEmpty, setModelsEmpty] = useState<boolean>(false);
	const [maxModelsReached, setMaxModelsReached] = useState<boolean>(false);
	const [showNationalityList, setShowNationalityList] = useState<boolean>(false);
	const [classScoreRecords, setClassScoreRecords] = useState<Record<string, number | string>>({});
	const [isDeletingModel, setIsDeletingModel] = useState<boolean>(false);

	const MAX_CUSTOM_MODELS = 3;

	useEffect(() => {
		if (isLoggedIn === undefined) {
			return;
		}

		if (isLoggedIn) {
			fetchModels(
				(customModels: ModelType[], defaultModels: ModelType[]) => {
					const allModels = defaultModels.reverse().concat(customModels);
					initialzeModels(allModels);
				},
				() => showErrorToast()
			);
		}
		else {
			fetchDefaultModels(
				(defaultModels: ModelType[]) => {
					initialzeModels(defaultModels.reverse());
				},
				() => showErrorToast()
			);
		}

		toast.closeAll();
		toast({
			title: "We have resetted our models!",
			description: "With our release of stable version 1.0 we have resetted all custom models. Please request them again if needed!",
			status: "warning",
			duration: 60000,
			isClosable: true,
		});

	}, [isLoggedIn]);

	useEffect(() => {
		// Everytime a model gets added or deletes, check the max. amount of custom models
		const customModelAmount = models.filter((model: ModelType) => model.isCustom);
		setMaxModelsReached(customModelAmount.length >= MAX_CUSTOM_MODELS);

	}, [models]);

	useEffect(() => {
		// When changing the model, create a dict. of its ethnicity names and their independent accuracy
		if (!selectedModel) return;

		setClassScoreRecords(
			Object.fromEntries(selectedModel.nationalities.map((class_, idx) => {
				return [class_, selectedModel.scores ? selectedModel.scores[idx] : "training..."]
			}))
		)
	}, [selectedModel]);

	const initialzeModels = (allModels: ModelType[]) => {
		// Load all models and select the inital one based on the "model" query parameter
		setModels(allModels);

		if (allModels.length == 0) {
			setModelsEmpty(true);
			return;
		};

		let initiallySelectedModel = allModels[0];
		const queriedModelName = queryParams.get("model");
		
		if (queriedModelName) {
			const matchingNameModel = allModels.filter((model: ModelType) => model.name == queriedModelName);

			if (matchingNameModel.length > 0) {
				initiallySelectedModel = matchingNameModel[0];
			}
		}
		selectModel(initiallySelectedModel);
	}

	const selectModel = (model: ModelType) => {
		setSelectedModel(model);
		setQueryParams({ model: model.name });
	}

	const showErrorToast = () => {
		toast({
			title: "Failed to reach server",
			description: "We are sorry for the inconvenience. Please try again later.",
			status: "error",
			duration: 60000,
			isClosable: false,
		});
	}

	if (modelsEmpty) {
		return <Box height="100vh"><Text>No models found :/ Please come back later!</Text></Box>
	}
	else if (models.length == 0) {
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
							selectModelHandler={(model: ModelType) => selectModel(model)}
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
					gap="3"
					alignItems="center"
					borderRadius="7px"
					flexWrap="wrap"
				>
					{
						isMediumViewPort ?
							<ModelSelectionPopver
								models={models}
								selectedModel={selectedModel}
								modelSelectionHandler={(model: ModelType) => selectModel(model)}
								maxModelsReached={maxModelsReached}
							/>
						:	
							<>
								<Text variant="bold" color="primaryBlue.100">
									Selected:
								</Text>
								<Text fontSize="xs" isTruncated>
									{selectedModel?.name}
								</Text>
							</>
					}

					<Pill
						text={selectedModel?.isCustom ? "custom model" : "default model"}
						colorPalette={selectedModel?.isCustom ? "turquoise" : "orange"}
					/>

					<HStack
						flex="1"
						marginLeft={{base: "none"}}
						width={{base: "full", sm: "auto"}}
					>

						
						
						<HStack marginLeft={{base: "none", md: "auto"}} gap={{ base: "2", sm: "3" }}>
							<Box onClick={() => setShowNationalityList(true)}>
								<Pill
									text="details"
									icon={<LuEye color="var(--chakra-colors-primaryBlue-100" />}
									interactive={true}
								/>

								<ListModal
									isOpen={showNationalityList}
									onCloseHandler={() => { setShowNationalityList(false) }}
									title={"Model Details"}
									description={
										<>
											<Text>
												<b>Name:</b>&nbsp;&nbsp;{selectedModel?.name}
											</Text>
											<Text>
												<b>Created:</b>&nbsp;&nbsp;{selectedModel?.creationTime?.split(" ")[0]}
											</Text>
											<Text>
												<b>Description:</b>&nbsp;&nbsp;
												{
													selectedModel?.isCustom ? selectedModel.description || <i>none</i>
													: "This is one of our custom models - already trained and ready to use!"
												}
											</Text>
										</>
									}
									data={classScoreRecords}
									columns={["Class", "Accuracy"]}
									searchBar={false}
								/>
							</Box>

							{
								isLoggedIn && selectedModel?.isCustom ?
									<Flex
										bg="transparent"
										borderRadius="full"
										justifyContent="center"
										alignItems="center"
										padding="0px"
										marginLeft="auto"
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
									</Flex>
								:
									null
							}
						</HStack>

					</HStack>

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
				deleteEntityName="model"
				deleteText={`Are you sure you want to delete the model '${selectedModel?.name}'? This action cannot be undone.`}
				confirmationType={ConfirmationType.DELETE_PHRASE_MATCH}
				isLoading={isDeletingModel}
				onDeleteConfirm={() => {
					if (!selectedModel) {
						return;
					}
					setIsDeletingModel(true);
					deleteModel(
						selectedModel.name,
						() => {
							setIsDeletingModel(false);
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
							
							selectModel(models[0]);
						},
						(errorCode: string) => {
							setIsDeletingModel(false);
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
