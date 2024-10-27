import { Flex, Text, Link, Button, useToast, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import Cookies from "js-cookie";
import { BACKEND_URL } from "~/lib/utils/serverRequests";
import { LuFileUp } from "react-icons/lu";


interface ClassificationProps {
	selectedModelName: string
}


const Classification = (props: ClassificationProps) => {
	const toast = useToast();

	const [entireDistribution, setEntireDistribution] = useState<boolean>(false);
	const [uploadedNames, setUploadedNames] = useState<string[]>([]);
	const [classificationRunning, setClassificationRunning] = useState<boolean>(false);

	const showToast = (message: string, failed: boolean = false) => {
		toast({
			title: `Classification ${failed ? "failed" : "successful"}.`,
			description: message,
			status: failed ? "error" : "success",
			duration: 5000,
			isClosable: true,
		});
	}

	const fileUploadHandler = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 1) {
			showToast("Too many files.", true);
			return;
		}

		const file = acceptedFiles[0];

		if (file.type !== "text/csv") {
			showToast("File must be of type '.csv'.", true);
			return;
		}

		Papa.parse(file, {
			header: false,
			skipEmptyLines: true,
			complete: (result: { data: string[][] }) => {
				setUploadedNames(Object.values(result.data).map(value => value[0]));
				setClassificationRunning(true);

				classifyNames();
			},
			error: (error: any) => {
				showToast(`File upload failed. Error: ${error.message}`, true)
			}
		});
	}

	const classifyNames = () => {
        axios.post(`${BACKEND_URL}/classify`, {
			modelName: props.selectedModelName,
			names: uploadedNames,
			getDistribution: entireDistribution
		},
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${Cookies.get("token")}`,
			}
		})
            .then((response: AxiosResponse) => {
				console.log(response.data);
				showToast("Output .csv file downloading...", true);

				setClassificationRunning(false);
            })
            .catch((error: AxiosError) => {
				console.log(props.selectedModelName);
				setClassificationRunning(false);
				/*if (error.code === "ERR_NETWORK") {
					setValidationError((prevErrors) => ({
						...prevErrors,
						server: {
							failed: true,
							message: `[${error.code}] Couldn't reach server. We are sorry for the inconvenience. Please try again later.`
						},
					}));
					return;
				}

				const responseData = error.response?.data as { errorCode?: string };
				switch (responseData?.errorCode) {
					case "AUTHENTICATION_FAILED": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							email: { failed: true, message: "Email or password not correct." },
							password: { failed: true, message: "Email or password not correct." }
						}));
						break;
					}
					case "UNEXPECTED_ERROR": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							server: {
								failed: true,
								message: `[${responseData?.errorCode}] We are sorry for the inconvenience. Please try again later.`
							}
						}));
						break;
					}
				}*/
            });
    }
	

	return (
		<>
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
					disabled={classificationRunning}
					isChecked={!entireDistribution}
					onChange={() => setEntireDistribution(false)}
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
					disabled={classificationRunning}
					isChecked={entireDistribution}
					onChange={() => setEntireDistribution(true)}
				>
					<Text lineHeight="15px">Give me the entire ethnicity-likelyhood distribution per name</Text>
				</Checkbox>
			</VStack>
			
			{
				classificationRunning ?
					<HStack
						width="full"
						borderRadius="7px"
						marginTop="2"
						cursor="pointer"
					>
						<Button
							flex="1"
							variant="secondary"
							onClick={() => {}}
							isLoading={true}
							disabled={true}
							loadingText='Classifying...'
						></Button>
						<Button
							flex="1"
							variant="cautious"
							onClick={() => {
								// TODO sent cancellation request
								setClassificationRunning(false);
							}}
						>
							Cancel
						</Button>
					</HStack>
				:
					<Dropzone onDrop={fileUploadHandler}>
						{({getRootProps, getInputProps}) => (
							<Box
								{...getRootProps()}
								width="full"
								bg="transparent"
								borderWidth="1px"
								borderColor="primaryBlue.100"
								borderStyle="dashed"
								borderRadius="7px"
								display="flex"
								flexDirection="column"
								alignItems="center"
								padding="5"
								marginTop="2"
								cursor="pointer"
								_hover={{
									bg: "surfaceBlue.200"
								}}
							>
								<input {...getInputProps()}/>
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
			}
			
		</>

	);
};

export default Classification;
