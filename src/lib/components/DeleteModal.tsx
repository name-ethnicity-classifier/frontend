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
	useToast
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from "react";


interface DeleteModalProps {
	deleteEntitiyName: string,
	deleteText: string,
	onDeleteConfirm: () => void,
	isOpen: boolean,
	onClose: () => void
}


const DeleteModal = (props: DeleteModalProps) => {
	const [confirmationText, setConfirmationText] = useState<string>("");
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const toast = useToast();

	const handleDelete = () => {
		if (confirmationText === "DELETE") {
			setIsDeleting(true);

			setTimeout(() => {
				setIsDeleting(false);
				props.onDeleteConfirm();
				props.onClose();
			}, 1000);

		} else {
			toast({
				title: "Invalid confirmation.",
				description: "Please type DELETE to confirm.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Modal
				isOpen={props.isOpen}
				onClose={props.onClose}
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

							<HStack>
								<DeleteIcon size="23px" color="primaryBlue.100" />
								<Heading variant="h2" color="primaryBlue.100">
									Delete {props.deleteEntitiyName}
								</Heading>
							</HStack>

							<Text>
								{props.deleteText}
							</Text>
							<HStack padding="10px" bg="surfaceBlue.100" borderRadius="7px">
								<Input
									placeholder="Type DELETE to confirm"
									value={confirmationText}
									onChange={(e) => setConfirmationText(e.target.value)}
								/>
							</HStack>


							<HStack gap="5">
								<Button
									flex="1"
									variant="secondary"
									isDisabled={isDeleting}
									onClick={props.onClose}
								>
									Cancel
								</Button>
								<Button
									flex="1"
									variant="cautious"
									isDisabled={confirmationText !== "DELETE"}
									onClick={handleDelete}
									isLoading={isDeleting}
								>
									Delete {props.deleteEntitiyName}
								</Button>
							</HStack>
						</VStack>



					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteModal;