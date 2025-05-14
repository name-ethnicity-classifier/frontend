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
import { useState } from "react";
import { LuPencil, LuHeartHandshake } from "react-icons/lu";
import SectionTitle from "./SectionTitle";



const EthicalGuidelineListStage = () => {
	return (
		<VStack gap="5" alignItems="left">
			<Text>
				Before proceeding, please read and acknowledge the following ethical guidelines regarding the use of this service:
			</Text>
			<Text>
				✅ <b>Research-Only Purpose:</b> This tool is intended for studying demographic patterns, assessing diversity, and conducting research—whether in academia, journalism, or organizational analysis.
			</Text>
			<Text>
				🚫 <b>Not for Personal Identification:</b> The results should not be used to assign ethnicity to individuals in personal databases, hiring processes, customer profiling, or any private-sector decision-making.
			</Text>
			<Text>
				🛑 <b>Ethical Responsibility:</b> Misuse of this service for discriminatory, invasive, or unethical purposes may result in account suspension.
			</Text>
			<Text>
				⚖️ <b>Commitment to Fair Use:</b> Users should apply this tool responsibly, promoting fairness, inclusivity, and transparency while avoiding any use that could lead to discrimination or harm.
			</Text>
			<Text>
				<i>You acknowlege these guidelines by accepting the terms of services.</i>
			</Text>
		</VStack>
	);
}



enum EthicalGuidelineStage {
	GUIDLINE_LIST,
	USAGE_DESCRIPTION
}


interface EthicalGuidelinesModalProps {
	isOpen: boolean,
	includeInteractiveStages: boolean,
	usageDescription?: string,
	onComplete: (description: string | undefined) => void,
	onClose: () => void,
	submitText?: string;
}


const EthicalGuidelineModal = (props: EthicalGuidelinesModalProps) => {
	const [usageDescription, setUsageDescription] = useState<string>(props.usageDescription || "");
	const [stage, setStage] = useState<number>(0);

	const guidelineStages = props.includeInteractiveStages ? [EthicalGuidelineStage.GUIDLINE_LIST, EthicalGuidelineStage.USAGE_DESCRIPTION] : [EthicalGuidelineStage.GUIDLINE_LIST];
	const MIN_USAGE_DESCRIPTION_CHARACTERS = 40;
	const MAX_USAGE_DESCRIPTION_CHARACTERS = 500;

	return (
		<Modal
			isOpen={props.isOpen}
			onClose={() => {
				props.onClose();
				setUsageDescription(props.usageDescription || "");
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

				<ModalBody padding="0" overflowY="auto">
					<VStack gap="5" align="stretch">

						<VStack gap="3">
							<LuHeartHandshake size="45px" color="var(--chakra-colors-primaryRed-100)" />
							<Heading variant={{ base: "h3", md: "h2" }} textAlign="center">
								Notice on the ethical use of Name-Ethnicity classification
							</Heading>
						</VStack>

						
						{
							guidelineStages[stage] == EthicalGuidelineStage.GUIDLINE_LIST ? 
								<EthicalGuidelineListStage />
							: guidelineStages[stage] == EthicalGuidelineStage.USAGE_DESCRIPTION ? 
								<VStack gap="3">
									<Text>
										To ensure ethical usage, we require users to briefly explain why they need access to this tool. Upon your registration we will review your description and see if it aligns with our ethical use standard. <b>Only after we reviewed your request, your account will be able to use our models.</b>
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
											title="What do you aim to use this tool for? (40 chars.)"
											icon={<LuPencil color="var(--chakra-colors-primaryBlue-100"/>}
										/>

										<Textarea
											placeholder={`Minimum of ${MIN_USAGE_DESCRIPTION_CHARACTERS} characters.`}
											value={usageDescription}
											maxLength={MAX_USAGE_DESCRIPTION_CHARACTERS}		
											onChange={(e: any) => setUsageDescription(e.target.value)}
											width="full"
											flex="1"
										/>
									</VStack>
									
								</VStack>
							:
								null
						}


						{
							guidelineStages.length > 1 &&
							<HStack gap="5">
								<Button
									flex="1"
									variant="secondary"
									isDisabled={stage == 0}
									onClick={() => {
										if (stage > 0) {
											setStage(stage - 1);
										}
									}}
								>
									Previous
								</Button>

								<Button
									flex="1"
									variant="secondary"
									isDisabled={
										guidelineStages[stage] == EthicalGuidelineStage.USAGE_DESCRIPTION && usageDescription.length < MIN_USAGE_DESCRIPTION_CHARACTERS
									}
									onClick={() => {
										if (stage >= guidelineStages.length - 1) {
											props.onComplete(usageDescription);
											setStage(0);
										}
										else {
											setStage(stage + 1);
										}
									}}
								>
									{
										stage != guidelineStages.length - 1 ? "Next" :
										props.submitText ? props.submitText :
										"Complete"
									}
								</Button>
								
							</HStack>
						}
					</VStack>

				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default EthicalGuidelineModal;