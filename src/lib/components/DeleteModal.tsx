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
}
  
const DeleteModal = ({
	deleteEntityName,
	deleteText,
	confirmationType,
	onDeleteConfirm,
	isOpen,
	onClose,
}: DeleteModalProps) => {
	const [confirmationText, setConfirmationText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
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
		
		setIsDeleting(true);

		setTimeout(() => {
			onDeleteConfirm(confirmationType === ConfirmationType.PASSWORD ? confirmationText : undefined);
			setIsDeleting(false);
			onClose();
		}, 1000);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered preserveScrollBarGap>
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
				<Button flex="1" variant="secondary" isDisabled={isDeleting} onClick={onClose}>
					Cancel
				</Button>
				<Button
					flex="1"
					variant="cautious"
					isDisabled={!isValidConfirmation}
					onClick={handleDelete}
					isLoading={isDeleting}
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
  