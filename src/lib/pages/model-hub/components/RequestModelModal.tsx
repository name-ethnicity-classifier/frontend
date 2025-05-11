import { Input, Heading, Checkbox, Textarea, Flex, Button, FormErrorMessage, FormControl, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, ChangeEvent, useEffect, ReactElement } from "react";
import { LuLock, LuPencil, LuPointer } from "react-icons/lu";
import { NationalityDataType } from "~/types";
import { fetchNationalityData } from "~/lib/utils/serverRequests";
import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import SectionTitle from "~/lib/components/SectionTitle";
import config from "~/config";


interface ValidationError {
	server: { failed: boolean, message: string },
	modelName: { failed: boolean, message: string },
	modelDescription: { failed: boolean, message: string },
	selection: { failed: boolean, message: string },
}

const FieldErrorMessage = (props: { message: string }) => {
	return (
		<FormErrorMessage fontSize="0.7em" marginTop="4px" marginLeft="5px">
			{props.message}
		</FormErrorMessage>
	);
}


interface RequestModelModalProps {
	isOpen: boolean,
	onCloseHandler: () => void,
}


const RequestModelModal = (props: RequestModelModalProps) => {
	const [nationalityData, setNationalityData] = useState<NationalityDataType | null>(null);
	const [selectGroupLevel, setSelectGroupLevel] = useState<boolean>(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [smallestNameAmount, setSmallestNameAmount] = useState<number>(0);
	const [modelName, setModelName] = useState<string>("");
	const [modelDescription, setModelDescription] = useState<string | undefined>(undefined);
	const [requestSuccessful, setRequestSuccessful] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<ValidationError>(
		{
			server: { failed: false, message: "" },
			modelName: { failed: false, message: "" },
			modelDescription: { failed: false, message: "" },
			selection: { failed: false, message: "" },
		}
	);

	const toast = useToast();

	useEffect(() => {
		fetchNationalityData((responseData) => {
			setNationalityData({
				nationalities: {... responseData.nationalities, "else": 0},
				nationalityGroups: {... responseData.nationalityGroups, "else": 0},
			});
		});
	}, []);

	const showToast = (message: string, failed: boolean = false, duration: number = 5000) => {
		toast({
			title: `Model request ${failed ? "failed" : "successful"}.`,
			description: message,
			status: failed ? "error" : "success",
			duration: duration,
			isClosable: true,
		});
	}

	const getNameAmountByKey = (key: string): number => {
		if (!nationalityData) return 0;

		if (selectGroupLevel) {
			return nationalityData?.nationalityGroups[key];
		}
		return nationalityData?.nationalities[key];
	}

	useEffect(() => {
		if (selectedClasses.length === 0) {
			setSmallestNameAmount(0);
			return;
		}
	
		let currentSmallest = Infinity;
		for (const class_ of selectedClasses) {
			if (class_ === "else") {
				continue;
			}
	
			const currentAmount = getNameAmountByKey(class_);
			if (currentAmount < currentSmallest) {
				currentSmallest = currentAmount;
			}
		}
		setSmallestNameAmount(currentSmallest === Infinity ? 0 : currentSmallest);
	}, [selectedClasses, nationalityData]);
	

	const sendModelRequest = () => {
		if (modelName.length === 0 || selectedClasses.length < 2) {
			if (modelName.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					modelName: { failed: true, message: "Please provide a model name." }
				}));
			}
			if (selectedClasses.length < 2) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					selection: { failed: true, message: "Please select at least two ethnicities." }
				}));
			}

			return;
		}

		axios.post(
			`${config.BACKEND_URL}/models`, {
					name: modelName,
					description: modelDescription,
					nationalities: selectedClasses
			},
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${Cookies.get("token")}`,
				}
			}
		)
			.then((_response: AxiosResponse) => {
				// Reset all error states
				setValidationError({
					server: { failed: false, message: "" },
					modelName: { failed: false, message: "" },
					modelDescription: { failed: false, message: "" },
					selection: { failed: false, message: "" }
				});
					
					setRequestSuccessful(true);

					showToast("Your model was created successfully and is now queued for being trained.", false, 3000);
					setTimeout(() => {
						window.location.reload();
					}, 2000);
			})
			.catch((error: AxiosError) => {
				if (error.code === "ERR_NETWORK") {
					setValidationError((prevErrors) => ({
						...prevErrors,
						server: { failed: true, message: "Couldn't reach server. We are sorry for the inconvenience. Please try again later." },
					}));
					return;
				}

				const responseData = error.response?.data as { errorCode: string, message: string };
				switch (responseData?.errorCode) {
					case "MODEL_NAME_EXISTS": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							modelName: { failed: true, message: "You already have a model with that name." },
						}));
						break;
					}
					case "NATIONALITIES_INVALID": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							selection: { failed: true, message: "Please select at least two origins or at least two origin groups." },
						}));
						break;
					}
					case "MODEL_NAME_INVALID": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							modelName: { failed: true, message: "Model name too long." },
						}));
						break;
					}
					case "MODEL_DESCRIPTION_INVALID": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							modelName: { failed: true, message: "Model description too long." },
						}));
						break;
					}
					case "RESTRICTED_ACCESS": {
						showToast(responseData?.message, true, 120000);
						break;
					}
					case "PENDING_ACCESS": {
						showToast(responseData?.message, true, 120000);
						break;
					}
					default: {
						showToast(`[${responseData?.errorCode}] An unexpected error occured. Please try again later.`, true);
					}
				}
			})
	}

	return (
		<Modal
			isCentered
			isOpen={props.isOpen}
			onClose={props.onCloseHandler}
			size="6xl"
		>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px)"
			/>
			<ModalContent
				padding={{ base: "5", md: "10" }}
				gap="5"
				maxHeight="80vh"
				overflow="hidden"
				margin={{ base: "5", md: "none" }}
			>
				<ModalHeader padding="0">
					<HStack alignItems="center">
						<Heading
							variant="h2"
						>
							Request custom model
						</Heading>
						<ModalCloseButton
							position="relative"
							top="unset"
							right="unset"
							marginLeft="auto"
							backgroundColor="transparent"
							color="textDark"
							boxSize="15px"
						/>
					</HStack>
				</ModalHeader>

				<ModalBody
					padding="0"
					display="flex"
					flexDirection="column"
					gap="5"
					overflowY="auto"
				>
					<Flex
						gap="5"
						flexDirection={{ base: "column", md: "row" }}
					>
						<VStack
							flex="1"
							gap="5"
						>
							<VStack
								bg="surfaceBlue.100"
								padding="10px"
								width="full"
								borderRadius="7px"
								gap="3"
							>
								<SectionTitle
									title="Name"
									icon={<LuPencil color="var(--chakra-colors-primaryBlue-100"/>}
								/>

								<FormControl
									isInvalid={validationError.modelName.failed}
                				>
									<Input
										placeholder="Give your model a descriptive name!"
										value={modelName}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModelName(e.target.value.trim())}
										width="full"
										onFocus={() => {
											setValidationError((prevErrors) => ({
												...prevErrors, modelName: { failed: false, message: "" }
											}));
										}}
									/>
									{
										validationError.modelName.failed ?
											<FieldErrorMessage message={validationError.modelName.message} />
									: null
									}
								</FormControl>

							</VStack>

							<VStack
								bg="surfaceBlue.100"
								padding="10px"
								flex="1"
								width="full"
								borderRadius="7px"
								gap="3"
							>
								<SectionTitle
									title="Description"
									icon={<LuPencil color="var(--chakra-colors-primaryBlue-100"/>}
								/>
								
								<Text width="full">
									Description of this model and it's usecase &#40;voluntary&#41;.
								</Text>

								<FormControl
									isInvalid={validationError.modelDescription.failed}
									flex="1"
        							width="full"
								>
									<Textarea
										placeholder="What will you use this model for?"
										value={modelDescription}
										maxLength={300}		
										onChange={(e) => setModelDescription(e.target.value)}
										onFocus={() => {
											setValidationError((prevErrors) => ({
												...prevErrors, modelDescription: { failed: false, message: "" }
											}));
										}}
										width="full"
										height="full"
										flex="1"
									/>
									{
										validationError.modelDescription.failed ?
											<FieldErrorMessage message={validationError.modelDescription.message} />
										: null
									}
								</FormControl>
								
							</VStack>
						</VStack>

						<VStack
							bg="surfaceBlue.100"
							padding="10px"
							flex="1.5"
							width="full"
							borderRadius="7px"
							alignItems="left"
							gap="3"
						>
							<HStack
								width="full"
								gap="10px"
							>
								<SectionTitle
									title="Choose origins to train on"
									icon={<LuPointer color="var(--chakra-colors-primaryBlue-100"/>}
								/>
								<Flex
									borderRadius="7px"
									bg="secondaryBlue.100"
									height="full"
									justifyContent="center"
									aspectRatio="1"
									alignItems="center"
									fontWeight="bold"
									color="primaryBlue.100"
								>
									{selectedClasses.length}
								</Flex>
							</HStack>

							<VStack
								width="full"
								alignItems="left"
								gap="2"
							>
								<Checkbox
									sx={{
										".chakra-checkbox__control": {
											borderWidth: "0px",
											borderColor: "primaryBlue.200",
											borderRadius: "3px",
											bg: "secondaryBlue.100"
										}
									}}
									width="full"
									size="sm"
									onChange={() => {
										setSelectedClasses([]);
										setSelectGroupLevel(!selectGroupLevel)
									}}
								>
									<Text lineHeight="15px">Select from origin groups</Text>
								</Checkbox>
							</VStack>
							<Flex
								flexWrap="wrap"
								borderRadius="7px"
								maxHeight="75%"
								overflowY="auto"
							>
								{
									nationalityData ?
										Object.entries(
											selectGroupLevel ?  nationalityData.nationalityGroups : nationalityData.nationalities
										).map(([nationality, amount]) => {
											const isSelected: boolean = selectedClasses.includes(nationality);
											return (
												<Button
													margin="3px"
													bg={ isSelected ? "primaryBlue.100" : "secondaryBlue.100" } 
													color={ isSelected ? "white" : "primaryBlue.100" }
													fontWeight="normal"
													borderRadius="7px"
													paddingY="5px"
													fontSize="2xs"
													key={nationality}
													textAlign="center"
													display="inline-block"
													height="auto"
													border={nationality === "else" ? "1px solid" : "none"}
													title={nationality !== "else" ? amount.toString() : ""}
													_hover={{
														bg: isSelected ? "primaryBlue.200" : "secondaryBlue.200"
													}}
													onClick={() => {
														// reset validation errors
														setValidationError((prevErrors) => ({
															...prevErrors, selection: { failed: false, message: "" }
														}));

														if (selectedClasses.includes(nationality)) {
															setSelectedClasses((prev) => {
																return prev.filter((item) => item !== nationality);
															});
														}
														else {
															setSelectedClasses((prev) => {
																return [...prev, nationality];
															});
														}
													}}
												>
													{nationality}
												</Button>
											)
										})
									: null
								}
							</Flex>
							
							

							<VStack
								width="full"
								alignItems="left"
								gap="1"
								mt="auto"
							>
								<HStack>
									<Text variant="bold" color="primaryBlue.100">Tip:</Text>
									<Text>Select "else" to group all unselected origins into one, eg. as in "british or not british".</Text>
								</HStack>
								<HStack>
									<Text variant="bold" color="primaryBlue.100">Total amount of names:</Text>
									<Text>{smallestNameAmount * selectedClasses.length}</Text>
								</HStack>
								{
									validationError.selection.failed ?
										<Text width="full" color="red">{validationError.selection.message}</Text>
									: null
								}
							</VStack>

						</VStack>
					</Flex>

					<Button
						width="full"
						paddingY="16px"
						isLoading={requestSuccessful}
						onClick={sendModelRequest}
					>
						request model
					</Button>
					
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default RequestModelModal;