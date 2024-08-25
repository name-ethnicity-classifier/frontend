import { Flex, Text, Link, Image, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { Bar } from "react-chartjs-2";
import { DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "~/lib/utils/serverRequests";
import DeleteModal from "~/lib/components/DeleteModal";
import ModelDetails from "./components/ModelDetails";


const ModelHub = () => {
	interface ModelType {
		name: string,
		accuracy: number,
		isCustom: boolean,
		scores?: number[],
		nationalities?: string[]
	}
	
	interface ModelsResponseType {
		data: {
			customModels: ModelType[],
			defaultModels: ModelType[]
		}
	}
	
	const isMobile = useBreakpointValue({ base: true, lg: false });
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [selectedModel, setSelectedModel] = useState<ModelType | null>(null);
	const [models, setModels] = useState<ModelType[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const loggedIn = Cookies.get("token") && Cookies.get("email")
		if (loggedIn) {
			setIsLoggedIn(loggedIn);

			const requestHeaders = {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${Cookies.get("token")}`,
			}
			axios.get(`${BACKEND_URL}/models`, {
				headers: requestHeaders
			})
				.then((response: AxiosResponse<ModelsResponseType>) => {
					let allModels: ModelType[] = [];
					response.data.data?.defaultModels?.forEach((model: any) => {
						allModels.push({
							name: model.name,
							accuracy: model.accuracy,
							scores: model.scores,
							nationalities: model.nationalities,
							isCustom: model.isCustom
						})
					});
					response.data.data?.customModels?.forEach((model: any) => {
						allModels.push({
							name: model.name,
							accuracy: model.accuracy,
							scores: model.scores,
							nationalities: model.nationalities,
							isCustom: model.isCustom
						})
					});
					
					setModels(allModels);
					setSelectedModel(allModels[0])
				})
				.catch((error: unknown) => {
					console.error("There was a problem with the axios request:", error);
				});
		}
		else {
			// fetch only default models if not authenticate
			axios.get(`${BACKEND_URL}/default-models`, {
				headers: { "Content-Type": "application/json" }
			  })
				.then((response: AxiosResponse<ModelType[]>) => {
				  let allDefaultModels: ModelType[] = [];
				  response.data.data?.forEach((model: any) => {
					allDefaultModels.push({
						name: model.name,
						accuracy: model.accuracy,
						scores: model.scores,
						nationalities: model.nationalities,
						isCustom: false
					})
				  });
				  setModels(allDefaultModels);
				  setSelectedModel(allDefaultModels[0])
				})
				.catch((error: unknown) => {
				  console.error("There was a problem with the axios request:", error);
				});
		}
	}, []);

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
				!isMobile ?
					<VStack
						flex="1"
						gap="4"
						maxWidth="275px"
					>
						<Flex
							width="full"
							bg="surfaceBlue.100"
							paddingX="5"
							paddingY="3"
							gap="5"
							alignItems="center"
							borderRadius="7px"
						>
							<Heading variant="h3" color="primaryBlue.100">
								Models:
							</Heading>

						</Flex>
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
								models.map((model: ModelType) => {
									const isSelected = model.name === selectedModel?.name;

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
											onClick={() => setSelectedModel(model)}
										>
											<Box
												width="10px"
												aspectRatio="1"
												borderRadius="full"
												bg="orange.400"
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
					</VStack>
				:
					null
			}
			<VStack flex="4" gap="4">
				<Flex
					width="full"
					bg="surfaceBlue.100"
					paddingX="5"
					paddingY="3"
					gap="5"
					alignItems="center"
					borderRadius="7px"
				>
					<Heading variant="h3" color="primaryBlue.100">
						Selected:
					</Heading>
					<Text fontSize="xs">
						{selectedModel?.name}
					</Text>

					{
						isLoggedIn ?
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
									_hover={{
										color: "primaryBlue.200"
									}}
									onClick={onOpen}
								/>
							</HStack>
						: null
					}
				</Flex>
				
				{
					selectedModel?.accuracy ?
						<ModelDetails selectedModel={selectedModel}/>	
					:
						<VStack
							minHeight={isMobile ? "50vh" : "full"}
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
								This model is currently queued to be trained. Check in again tomorrow!
							</Heading>
						</VStack>
				}
					
			</VStack>

			{isOpen && (
				<DeleteModal
					deleteEntitiyName="model"
					deleteText={`Are you sure you want to delete the model '${selectedModel}'? This action cannot be undone.`}
					onDeleteConfirm={() => {}}
					isOpen={isOpen}
					onClose={onClose}
				/>
			)}

		</HStack>
	);
};

export default ModelHub;
