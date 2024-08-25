import { Flex, Text, Link, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { Bar } from "react-chartjs-2";
import { DeleteIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import Classification from "./Classification";
import Cookies from "js-cookie";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useAuth } from "~/lib/contexts/AuthContext";
import { ModelType } from "~/types";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface ModelDetailsProps {
	selectedModel: ModelType
}


const ModelDetails = (props: ModelDetailsProps) => {
	const { isLoggedIn } = useAuth();

	const [isRendered, setIsRendered] = useState(false);

	useEffect(() => {
		setIsRendered(true);
	}, []);

	return (
		<>
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
						minHeight="200px"
					>
						{
							isRendered ?
								<Bar
									animation={false}
									height={100} 
									width={400}
									data={{
										labels: props.selectedModel.nationalities,
										datasets: [
											{
												label: "Accuracies",
												data: props.selectedModel.scores,
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
						<Heading color="primaryBlue.100" fontSize={{ base: "32px", md: "64px" }}>
							{props.selectedModel.nationalities.length}
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
						<HStack
							alignItems="flex-end"
							gap="1"
							transform={{base: "scale(0.8)", "2xl": "none" }}
						>
							<Heading
								color="primaryBlue.100"
								alignItems="bottom"
								variant="h1"
							>
								{
									props.selectedModel.accuracy
								}
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
						
						{
							isLoggedIn ?
								<Classification selectedModelName={props.selectedModel.name} />
							:
								<Button
									variant="secondary"
									width="fit-content"
									margin="auto"
									onClick={() => { window.location.href = "/login" }}
								>
									Log in to classify names
								</Button>
						}
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
		</>

	);
};

export default ModelDetails;
