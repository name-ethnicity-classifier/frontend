import { Flex, Text, Link, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { Bar } from "react-chartjs-2";
import { DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import DeleteModal from "~/lib/components/DeleteModal";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const ModelHub = () => {
	const isMobile = useBreakpointValue({ base: true, lg: false });

	const allModels = ["chinese_and_else", "8_nationality_groups", "20_nationalities_else", "greek_german_else", "20_most_occuring_nationalities"]
	const [selectedModel, setSelectedModel] = useState<string>(allModels[0]);
	const dummyModelData = {
		"nationalities": ["german", "greek", "egyptian", "new zealander", "turkish", "finnish"],
		"accuracies": [0.82423, 0.8210, 0.8283, 0.82867, 0.850, 0.883],
		"accuracy": 0.82363
	}

	const [isRendered, setIsRendered] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        setIsRendered(true);
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
							<Button width="full">
								+ Request custom model
							</Button>

							{
								allModels.map((model: string) => {
									const isSelected = model === selectedModel;

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
											maxWiidth="300px"
											transition="100ms ease-in-out"
											boxShadow="sm"
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
											<Text maxWiidth="75%"
												color={isSelected ? "primaryBlue.100" : "textLight"}
												isTruncated
											>
												{model}
											</Text>

										</HStack>
									)
								})
							}
						</VStack>
					</VStack>
					: null
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
						{selectedModel}
					</Text>

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
				</Flex>

				<Flex
					flexDirection={{ base: "column", md: "row" }}
					width="full"
					gap="4"
				>
					<Flex
						flex="5"
						bg="surfaceBlue.100"
						borderRadius="7px"
						padding="4"
					>
						<Box
							height="99%"
							width="99%"
						>
							{
								isRendered ?
									<Bar
										animation={false}
										height={100} 
										width={400}
										data={{
											labels: dummyModelData.nationalities,
											datasets: [
												{
													label: "Accuracies",
													data: dummyModelData.accuracies,
													backgroundColor: "rgba(0, 47, 255, 0.55)",
													order: 2
												}
											]
										}} 
										options={{
											maintainAspectRatio: false,
											scales: {
												yAxes: [{
													ticks: {
														beginAtZero: true,
														min: 0
													}
												}],
												xAxes: [{
													tooltips: {
														callbacks: {
															title: function (tooltipItems: { index: string | number; }[], data: { labels: { [x: string]: any; }; }) {
																return data.labels[tooltipItems[0].index]
															}
														}
													}
												}]
											}
										}}
									/>
								: null
							}
						</Box>
						
					</Flex>
					<Flex
						flex="1"
						flexDirection={{ base: "row", md: "column" }}
						gap="4"
					>
						<Flex
							aspectRatio={{ base: "auto", md: "1" }}
							bg="surfaceBlue.100"
							flex="1"
							borderRadius="7px"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							<Heading color="primaryBlue.100" fontSize="64px">
								{dummyModelData.nationalities.length}
							</Heading>
							<Text>
								ethnicities
							</Text>
						</Flex>
						<Flex
							aspectRatio={{ base: "auto", md: "1" }}
							bg="surfaceBlue.100"
							flex="1"
							borderRadius="7px"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							<HStack alignItems="flex-end">
								<Heading
									color="primaryBlue.100"
									alignItems="bottom"
								>
									{Math.round(dummyModelData.accuracy * 100 * 10) / 10}
								</Heading>
								<Heading
									color="primaryBlue.100"
									variant="h2"
									paddingBottom="4px"
								>
									%
								</Heading>
							</HStack>
							
							<Text>
								accuracy
							</Text>
						</Flex>
					</Flex>
				</Flex>
				
				<VStack
					width="full"
					gap="4"
				>
					<Flex
						flexDirection={{ base: "column", md: "row" }}
						width="full"
						gap="4"
					>
						<VStack
							flex="1"
							bg="surfaceBlue.100"
							borderRadius="7px"
							padding="3"
							alignItems="left"
							textAlign="left"
							gap="3"
						>
							<Text variant="bold">
								Classify names via file upload
							</Text>
							<Text>
								Put all the names you want to classify into a .csv file under a column “names” and upload it below! Here is an exemplary .csv file.
							</Text>

							<VStack
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
									size="sm"
									onChange={() => { }}
								>
									<Text lineHeight="15px">Give me only the most likely ethnicity per name</Text>
								</Checkbox>
								<Checkbox
									sx={{
											".chakra-checkbox__control": {
													borderWidth: "0px",
													borderColor: "primaryBlue.200",
													borderRadius: "3px",
													bg: "secondaryBlue.100"
											}
									}}
									size="sm"
									onChange={() => { }}
								>
									<Text lineHeight="15px">Give me the entire ethnicity-likelyhood distribution per name</Text>
								</Checkbox>
							</VStack>

							<Dropzone onDrop={(acceptedFiles: any) => console.log(acceptedFiles)}>
								{() => (
									<Box
										width="full"
										bg="transparent"
										borderWidth="1px"
										borderColor="primaryBlue.100"
										borderStyle="dashed"
										borderRadius="7px"
										display="flex"
										flexDirection="column"
										alignItems="center"
										gap="0"
										padding="5"
										marginTop="2"
										_hover={{
											bg: "surfaceBlue.200"
										}}
									>
										<LuFileUp size="32px" color="var(--chakra-colors-primaryBlue-100)"/>
										<Text variant="bold" color="primaryBlue.100">
											Drop .csv file
										</Text>
										<Text variant="bold" color="primaryBlue.100">
											or click to browse files
										</Text>
									</Box>
								)}
							</Dropzone>
						</VStack>

						<VStack
							flex="1"
							bg="surfaceBlue.100"
							borderRadius="7px"
							padding="3"
							alignItems="left"
							textAlign="left"
							gap="3"
						>
							<Text variant="bold">
								Classify names via API
							</Text>
							<Text>
								You can also use the /classify endpoint of our REST API.
							</Text>
							<Text>
								Please note:<br />
								We do not recommend you to use the API as part of your backend or any kind of deployed service. It is mainly meant for doing experiments and to be included in, for example, your Python Notebooks or R scripts.
							</Text>

							<Link
								href={"/api"}
								_hover={{
									underline: "none",
									paddingLeft: "3"
								}}
								isExternal={true}
								display="flex"
								flexDirection="row"
								gap="1"
								width="fit-content"
								transition="ease-out 0.15s"
								marginTop="auto"
							>
								<Text
									fontSize="xs"
									fontWeight="bold"
									color="primaryBlue.100"
								>
									View API documentation
								</Text>
								<ArrowForwardIcon color="primaryBlue.100" marginY="auto" />
							</Link>
						</VStack>
					</Flex>

					<VStack
						width="full"
						bg="surfaceBlue.100"
						borderRadius="7px"
						padding="3"
						alignItems="left"
						textAlign="left"
						gap="3"
					>
						<Text variant="bold">
							Classify names locally on your machine
						</Text>
						<Text>
							<i>Coming soon... or sent us an inquiry via email :&#41;</i>
						</Text>
					</VStack>
				</VStack>
					
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
