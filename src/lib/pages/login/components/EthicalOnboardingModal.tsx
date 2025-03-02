import { WarningTwoIcon } from "@chakra-ui/icons";
import {
	Button,
	HStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Heading,
	Input,
	Text,
	VStack,
	useToast,
	Textarea,
	Box
} from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";



const EthicalUseGuidelinesStage = () => {
	return (
		<VStack gap="5">
			<Text>
				Before proceeding, please read and acknowledge the following ethical guidelines regarding the use of this service:
			</Text>
			<Text>
				✅ <b>Research-Only Purpose:</b> This tool is intended solely for research purposes to analyze correlations between ethnicity and other variables.
			</Text>
			<Text>
				🚫 <b>Not for Personal Identification:</b> The results should not be used to assign ethnicity to individuals in personal databases, hiring processes, customer profiling, or any private-sector decision-making.
			</Text>
			<Text>
				🛑 <b>Ethical Responsibility:</b> Misuse of this service for discriminatory, invasive, or unethical purposes may result in <b>account suspension</b>.
			</Text>
		</VStack>
	);
}


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
	);
}


/*interface UsageDescriptionStageProps {
	usageDescription: string,
	onUsageDescriptionChange: (description: string) => void,
	minUsageDescriptionCharacters: number
}


const UsageDescriptionStage = (props: UsageDescriptionStageProps) => {
	return (
		<VStack gap="3">
			<Text>
				To ensure ethical usage, we require users to briefly explain why they need access to this tool. Requests that are too vague or suggest unethical use may result in account suspension.
			</Text>

			<VStack
				bg="surfaceBlue.100"
				padding="10px"
				flex="1"
				width="full"
				borderRadius="7px"
				gap="3"
				alignItems="left"
			>
				<SectionTitle
					title="What do you aim to use this tool for?"
					icon={<LuPencil color="var(--chakra-colors-primaryBlue-100"/>}
				/>

				<Textarea
					placeholder={`Minimum of ${props.minUsageDescriptionCharacters} characters.`}
					value={props.usageDescription}
					maxLength={300}		
					onChange={(e) => setUsageDescription(e.target.value)}
					width="full"
					flex="1"
				/>
			</VStack>
			
		</VStack>
		);
}*/


enum EthicalUseStage {
	GUIDLINES = 1,
	USAGE_DESCRIPTION = 2
}


interface EthicalUseModalProps {
	isOpen: boolean,
	usageDescription: string,
	onUsageDescriptionChange: (description: string) => void,
	onComplete: (description: string) => void,
	onClose: () => void
}


const EthicalOnboardingModal = (props: EthicalUseModalProps) => {
	const [usageDescription, setUsageDescription] = useState<string>(props.usageDescription);
	const [stage, setStage] = useState<number>(EthicalUseStage.GUIDLINES);

	const lastEthicalUseStage = EthicalUseStage.USAGE_DESCRIPTION;
	const MIN_USAGE_DESCRIPTION_CHARACTERS = 40;

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={() => {
				props.onClose();
				setUsageDescription(props.usageDescription);
			}}
			size={"2xl"}
			isCentered
			preserveScrollBarGap
		>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px)"
			/>
				<ModalContent
					padding={{ base: "5", md: "10" }}
					maxHeight="80vh"
					overflow="hidden"
					margin={{ base: "5", md: "none" }}
				>

				<ModalBody padding="0">
					<VStack gap="5" align="stretch">

						<VStack gap="3">
							<WarningTwoIcon boxSize="35px" color="primaryRed.100" />
							<Heading variant={{ base: "h3", md: "h2" }} color="primaryRed.100" textAlign="center">
								Important notice on the ethical use of Name-Ethnicity classification
							</Heading>
						</VStack>

						
						{
							stage == EthicalUseStage.GUIDLINES ? 
								<EthicalUseGuidelinesStage />
							: stage == EthicalUseStage.USAGE_DESCRIPTION ? 
								<VStack gap="3">
									<Text>
										To ensure ethical usage, we require users to briefly explain why they need access to this tool. Requests that are too vague or suggest unethical use may result in account suspension.
									</Text>

									<VStack
										bg="surfaceBlue.100"
										padding="10px"
										flex="1"
										width="full"
										borderRadius="7px"
										gap="3"
										alignItems="left"
									>
										<SectionTitle
											title="What do you aim to use this tool for?"
											icon={<LuPencil color="var(--chakra-colors-primaryBlue-100"/>}
										/>

										<Textarea
											placeholder={`Minimum of ${MIN_USAGE_DESCRIPTION_CHARACTERS} characters.`}
											value={usageDescription}
											maxLength={300}		
											onChange={(e) => setUsageDescription(e.target.value)}
											width="full"
											flex="1"
										/>
									</VStack>
									
								</VStack>
							:
								null
						}


						<HStack gap="5">
							<Button
								flex="1"
								variant="cautious"
								onClick={() => { window.location.href = "/" }}
							>
								I don't agree.
							</Button>

							<Button
								flex="1"
								variant="secondary"
								isDisabled={
									stage as EthicalUseStage == EthicalUseStage.USAGE_DESCRIPTION && usageDescription.length < MIN_USAGE_DESCRIPTION_CHARACTERS
								}
								onClick={() => {
									if (stage == lastEthicalUseStage) {
										setStage(1 as EthicalUseStage);
										props.onComplete(usageDescription);
									}
									else {
										setStage((stage + 1) as EthicalUseStage);
									}
								}}
							>
								{stage == lastEthicalUseStage ? "Complete" : "Next"}
							</Button>
							
						</HStack>
					</VStack>

				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EthicalOnboardingModal;