import { Flex, Text, Link, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";
import Papa from "papaparse";


interface ClassificationProps {
	selectedModelName: string
}


const Classification = (props: ClassificationProps) => {

	const [entireDistribution, setEntireDistribution] = useState<boolean>(false);
	const [uploadedNames, setUploadedNames] = useState<string[]>([]);
	const [classificationRunning, setClassificationRunning] = useState<boolean>(false);

	const fileUploadHandler = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 1) {
			alert("Too many files!");
			return;
		}

		const file = acceptedFiles[0];

		if (file.type !== "text/csv") {
			alert("File must be of type '.csv'!");
			return;
		}

		Papa.parse(file, {
			header: false,
			skipEmptyLines: true,
			complete: (result: { data: string[][]}) => {
				setUploadedNames(Object.values(result.data).map(value => value[0]));
				setClassificationRunning(true);
			},
			error: (error: any) => {
				alert(`File upload failed. Error: ${error.message}`)
			}
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
						<Box flex="1">
							<Heading
								width="full"
								textAlign="center"
								variant="h3"
								color="primaryBlue.100"
							>
								Classifying...
							</Heading>
						</Box>
						<Button
							flex="1"
							variant="cautious"
							onClick={() => {}}
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
