import { Flex, Text, Link, Button, Heading, Box, HStack, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";
import Classification from "./Classification";
import ClassScoresChart from "./ClassScoresChart";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

import { useAuth } from "~/lib/contexts/AuthContext";
import { ModelType } from "~/types";
import { LuLock } from "react-icons/lu";
import { acessAlertToast } from "~/lib/utils/toasts";
import config from "~/config";
import Pill from "~/lib/components/Pill";

interface ModelDetailsProps {
	selectedModel: ModelType
}


const ModelDetails = (props: ModelDetailsProps) => {
	const { isLoggedIn } = useAuth();
	const toast = useToast();

	const [isRendered, setIsRendered] = useState<boolean>(false);

	useEffect(() => {
		setIsRendered(true);
	}, []);

	return (
		<VStack gap="4">
			<Flex
				flexDirection={{ base: "column", md: "row" }}
				width="full"
				gap="4"
			>
				<Box
					flex="5"
					bg="surfaceBlue.100"
					borderRadius="7px"
					padding="3"
				>
					<ClassScoresChart classes={props.selectedModel.nationalities} scores={props.selectedModel.scores}/>
				</Box>
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
						minHeight={{ base: 100, md: "auto" }}
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
						minHeight={{ base: 100, md: "auto" }}
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
							Put all the names you want to classify into a .csv file under a single column (do not add an index column or any header rows) and upload it below!
						</Text>
						
						{
							isLoggedIn ?
								Cookies.get("access") != "full" ?
									<Button
										variant="secondary"
										width="fit-content"
										margin="auto"
										leftIcon={<LuLock />}
										onClick={() => {
											acessAlertToast(toast);
										}}
									>
										Access not yet granted.
									</Button>
								:
									<Classification selectedModelName={props.selectedModel.name} />
							:
								<Button
									variant="secondary"
									width="fit-content"
									margin="auto"
									leftIcon={<LuLock />}
									onClick={() => { window.location.href = "/login" }}
								>
									Log in to classify names.
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
							You can also use the <i>/classify</i> or <i>/classify-distribution</i> endpoint of our REST API.
						</Text>
						<Text>
							<b>Rate limiting:</b> You can classify <i>10.000</i> names per request and have a daily quota of <i>100.000</i> names.
							<br />
							<b>API key:</b> You can find your key in the user settings. It will expire after a month, then you have to copy it again from the user settings.
							<br />
							<b>Dislcaimer:</b> Do not use our API as part of your backend or any kind of deployed service. It is mainly meant for doing experiments and to be included in, for example, your Python Notebooks or R scripts.
						</Text>
						<Link
							href={config.API_DOC_URL}
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
						Classify unlimited names locally on your machine
					</Text>
					<Text>
						<i>Coming soon... or sent us an inquiry via email :&#41;</i>
					</Text>
				</VStack>
			</VStack>
		</VStack>

	);
};

export default ModelDetails;
