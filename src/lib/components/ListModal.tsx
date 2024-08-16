import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState } from "react";


interface ListModalProps {
	isOpen: boolean,
	onCloseHandler: () => void,
	title: string,
	description: ReactNode,
	data: Record<string, number>,
	searchBar?: boolean
}


const ListModal = (props: ListModalProps) => {

	return (
			<Modal
				isCentered
				isOpen={props.isOpen}
				onClose={props.onCloseHandler}
				size="2xl"
			>
				<ModalOverlay
					bg='blackAlpha.300'
					backdropFilter='blur(10px)'
				/>
				<ModalContent
					padding="10"
					gap="5"
				>
					<ModalHeader padding="0">
						<HStack alignItems="center">
							<Text
								fontSize="lg"
								fontWeight="bold"
								color="textDark"
							>
								{props.title}
							</Text>
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
						<VStack>
							<VStack alignItems="left">
								{props.description}
							</VStack>
						</VStack>
					</ModalBody>
				</ModalContent>
			</Modal>
	)
}

export default ListModal;