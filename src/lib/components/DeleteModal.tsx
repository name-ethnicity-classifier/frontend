import {
	Button,
	HStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Heading,
	Input,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";


export enum ConfirmationType {
	DELETE_PHRASE_MATCH,
	PASSWORD,
}
  
interface DeleteModalProps {
	deleteEntityName: string;
	deleteText: string;
	confirmationType: ConfirmationType;
	onDeleteConfirm: (phrase?: string) => void;
	isOpen: boolean;
	onClose: () => void;
	isLoading: boolean;
}
  
const DeleteModal = ({
	deleteEntityName,
	deleteText,
	confirmationType,
	onDeleteConfirm,
	isOpen,
	onClose,
	isLoading
}: DeleteModalProps) => {
	const [confirmationText, setConfirmationText] = useState("");
	const toast = useToast();

	const isValidConfirmation = confirmationType === ConfirmationType.PASSWORD || confirmationText === "DELETE";

	const handleDelete = () => {
		if (!isValidConfirmation) {
			toast({
				title: "Invalid confirmation.",
				description: "Please type DELETE to confirm.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		onDeleteConfirm(confirmationType === ConfirmationType.PASSWORD ? confirmationText : undefined);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered preserveScrollBarGap closeOnOverlayClick={false}>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent padding={{ base: "5", md: "10" }} maxHeight="80vh" margin={{ base: "5", md: "none" }}>
				<ModalBody padding="0">
				<VStack gap="5" align="stretch">
					<HStack>
					<DeleteIcon boxSize={"23px"} color="primaryBlue.100" />
					<Heading variant="h2" color="primaryBlue.100">
						Delete {deleteEntityName}
					</Heading>
					</HStack>

					<Text>{deleteText}</Text>

					<HStack padding="10px" bg="surfaceBlue.100" borderRadius="7px">
					<Input
						placeholder={
						confirmationType === ConfirmationType.PASSWORD
							? "Enter your password."
							: "Type DELETE to confirm"
						}
						type={confirmationType === ConfirmationType.PASSWORD ? "password" : "text"}
						value={confirmationText}
						onChange={(e) => setConfirmationText(e.target.value)}
					/>
					</HStack>

					<HStack gap="5">
					<Button flex="1" variant="secondary" isDisabled={isLoading} onClick={onClose}>
						Cancel
					</Button>
					<Button
						flex="1"
						variant="cautious"
						isDisabled={!isValidConfirmation}
						onClick={handleDelete}
						isLoading={isLoading}
					>
						Delete {deleteEntityName}
					</Button>
					</HStack>
				</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
  
export default DeleteModal;
  