import { Text, Button, useToast, Box, Checkbox, HStack, VStack } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRef, useState } from "react";
import Papa from "papaparse";
import Cookies from "js-cookie";
import { BACKEND_URL } from "~/lib/utils/serverRequests";
import { LuFileUp } from "react-icons/lu";
import { BasicClassificationResponseType, DistributionClassificationResponseType } from "~/types";


interface ClassificationProps {
	selectedModelName: string
}


const Classification = (props: ClassificationProps) => {
	const toast = useToast();

	const [entireDistribution, setEntireDistribution] = useState<boolean>(false);
	const [uploadedFileName, setUploadedFileName] = useState<string>("");
	const [classificationRunning, setClassificationRunning] = useState<boolean>(false);

	const controllerRef = useRef<AbortController | null>(null);
	
	const showToast = (message: string, failed: boolean = false, duration: number = 5000) => {
		toast({
			title: `Classification ${failed ? "failed" : "successful"}.`,
			description: message,
			status: failed ? "error" : "success",
			duration: duration,
			isClosable: true,
		});
	}

	const fileUploadHandler = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 1) {
			showToast("Too many files.", true);
			return;
		}

		const file = acceptedFiles[0];

		setUploadedFileName(file.name.slice(0, (-".csv".length)))

		if (file.type !== "text/csv") {
			showToast("File must be of type '.csv'.", true);
			return;
		}

		Papa.parse(file, {
			header: false,
			skipEmptyLines: true,
			complete: (result: { data: string[][] }) => {
				setClassificationRunning(true);

				const uploadedNames = Object.values(result.data).map(value => value[0]);
				classifyNames(uploadedNames);				
			},
			error: (error: any) => {
				showToast(`File upload failed. Error: ${error.message}`, true);
				setClassificationRunning(false);
			}
		});
	}

	const downloadPredictionCSV = (prediction: (string | number)[][]) => {
		const csv = Papa.unparse(prediction);
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = `${uploadedFileName}-classified.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		URL.revokeObjectURL(url);
	}

	const classifyNames = (uploadedNames: string[]) => {
		controllerRef.current = new AbortController();

        axios.post(`${BACKEND_URL}/classify`, {
			modelName: props.selectedModelName,
			names: uploadedNames,
			getDistribution: entireDistribution
		},
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${Cookies.get("token")}`,
			},
			signal: controllerRef.current.signal
		},
		).then((response: AxiosResponse) => {
			if (entireDistribution) {
				const prediction = response.data as DistributionClassificationResponseType;

				const allClasses = Object.keys(Object.values(prediction)[0]);
				let predictionTable = Object.entries(prediction).map(([name, prediction]) => [name, ...Object.values(prediction)]);
				predictionTable.unshift(["name", ...allClasses]);
				downloadPredictionCSV(predictionTable);
			}
			else {
				const prediction = response.data as BasicClassificationResponseType;

				let predictionTable = Object.entries(prediction).map(([name, prediction]) => [name, ...prediction]);
				predictionTable.unshift(["name", "ethnicity", "score"]);
				downloadPredictionCSV(predictionTable);
			}
			
			showToast("Downloading result...", false, 2500);
			setClassificationRunning(false);
		})
		.catch((error: AxiosError) => {
			controllerRef.current?.signal.aborted ?
				showToast("Cancelled by user.", true)
			:
				showToast("An unexpected error occured.", true)
			
			console.log(`Classification error:\n${error}`)	
			setClassificationRunning(false);
			controllerRef.current = null;
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
						marginTop="auto"
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
								if (controllerRef.current) {
									controllerRef.current.abort();
								}
								setClassificationRunning(false);
							}}
						>
							Cancel
						</Button>
					</HStack>
				:
					<Dropzone onDrop={fileUploadHandler} accept={{"text/csv": [".csv"]}} maxFiles={1}>
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
