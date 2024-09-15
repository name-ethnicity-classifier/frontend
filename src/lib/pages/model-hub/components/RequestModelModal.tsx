import { Input, Heading, Checkbox, Textarea, Flex, Button, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, ChangeEvent, useEffect, ReactElement } from "react";
import { LuPencil, LuPointer } from "react-icons/lu";
import { NationalityDataType } from "~/types";
import { fetchNationalityData } from "~/lib/utils/serverRequests";
import { EmailIcon } from "@chakra-ui/icons";



const SectionTitle = (props: { title: string, icon: ReactElement }) => {
		return (
			<HStack
				width="full"
				bg="secondaryBlue.100"
				boxShadow="sm"
				borderRadius="7"
				paddingX="5"
				paddingY="10px"
				gap="4"
			>
				{props.icon}
				<Text
					width="full"
					fontWeight="bold"
					color="primaryBlue.100"
					fontSize={{ base: "2xs", sm: "xs"}}
				>
					{props.title}
				</Text>
			</HStack>
		)
}

interface RequestModelModalProps {
	isOpen: boolean,
	onCloseHandler: () => void,
}


const RequestModelModal = (props: RequestModelModalProps) => {
	const [nationalityData, setNationalityData] = useState<NationalityDataType | null>(null);
	const [selectGroupLevel, setSelectGroupLevel] = useState<boolean>(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
	const [nameAmount, setNameAmount] = useState<number>(0);
	const [smallestNameAmount, setSmallestNameAmount] = useState<number>(0);
	const [modelName, setModelName] = useState<string>("");
	const [modelDescription, setModelDescription] = useState<string>("");
	
	useEffect(() => {
		fetchNationalityData((responseData) => {
			setNationalityData({
				nationalities: {... responseData.nationalities, "else": 0},
				nationalityGroups: {... responseData.nationalityGroups, "else": 0},
			});
		});
	}, []);

	return (
		<Modal
			isCentered
			isOpen={props.isOpen}
			onClose={props.onCloseHandler}
			marginX="10"
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
								<Input
									placeholder="Give your model a descriptive name!"
									value={modelName}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModelName(e.target.value)}
									width="full"
								/>
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
								
								<Text>
									Use-Cases of ethnicity classification require ethical attention. We would be happy to know what you are aiming to use your model for. Be as specific as you want.
								</Text>
								<Textarea
									placeholder="What will you use this model for?"
									value={modelDescription}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setModelDescription(e.target.value)}
									width="full"
									flex="1"
								/>
								
							</VStack>
						</VStack>

						<VStack
							bg="surfaceBlue.100"
							padding="10px"
							flex="1.5"
							width="full"
							borderRadius="7px"
							gap="4"
						>
							<HStack
								width="full"
								gap="10px"
							>
								<SectionTitle
									title="Choose nationalities to train on"
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
									<Text lineHeight="15px">Select from nationality groups</Text>
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
													title={amount}
													_hover={{
														bg: isSelected ? "primaryBlue.200" : "secondaryBlue.200"
													}}
													onClick={() => {
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
							>
								<Text color="primaryBlue.100"><b>Total amount of names to train on:</b> {nameAmount}</Text>
							</VStack>

						</VStack>
					</Flex>

					<Button
						width="full"
					  paddingY="16px"
						leftIcon={<EmailIcon />}
					>
						request model
					</Button>
					
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default RequestModelModal;