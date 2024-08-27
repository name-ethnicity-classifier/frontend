import { Input, Heading, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, ChangeEvent, useEffect } from "react";


interface RequestModelModalProps {
	isOpen: boolean,
	onCloseHandler: () => void,
}


const RequestModelModal = (props: RequestModelModalProps) => {

	useEffect(() => {
	}, []);

	return (
		<Modal
			isCentered
			isOpen={props.isOpen}
			onClose={props.onCloseHandler}
			size="5xl"
			preserveScrollBarGap
		>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px)"
			/>
			<ModalContent
				padding={{ base: "5", md: "10" }}
				gap="5"
				maxHeight="80vh"
				overflow="hidden"
				margin={{ base: "5", md: "none" }}
			>
				<ModalHeader padding="0">
					<HStack alignItems="center">
						<Heading
							variant="h2"
						>
							Request custom model
						</Heading>
						<ModalCloseButton
							position="relative"
							top="unset"
							right="unset"
							marginLeft="auto"
							backgroundColor="transparent"
							color="textDark"
							boxSize="15px"
						/>
					</HStack>
				</ModalHeader>

				<ModalBody padding="0">
					<Text>Slaaaaay</Text>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default RequestModelModal;