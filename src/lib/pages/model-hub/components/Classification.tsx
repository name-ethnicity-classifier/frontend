import { Flex, Text, Link, Button, Heading, Box, Checkbox, useDisclosure, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { LuFileUp } from "react-icons/lu";
import { useEffect, useState } from "react";


interface ClassificationProps {
	selectedModelName: string
}


const Classification = (props: ClassificationProps) => {

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
						padding="5"
						marginTop="2"
						cursor="pointer"
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
		</>

	);
};

export default Classification;
