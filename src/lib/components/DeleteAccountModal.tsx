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
import { LuUserX } from "react-icons/lu";
import { useState } from "react";


interface DeleteAccountModalProps {
	onDeleteConfirm: () => void,
	isOpen: boolean,
	onClose: () => void
}


const DeleteAccountModal = (props: DeleteAccountModalProps) => {
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
      }, 2000);
      
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
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
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
								<LuUserX size="23px" color="var(--chakra-colors-primaryBlue-200"/>
								<Heading variant="h2" color="primaryBlue.100">
										Delete Account
									</Heading>
							</HStack>
								
              <Text>
                Are you sure you want to delete your account? This action cannot be undone. 
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
									Delete account
								</Button>
							</HStack>
            </VStack>

						
						
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccountModal;