import { Input, Heading, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, ModalBody, Box, Text, VStack, Spacer, Image, Link, HStack, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode, useState, ChangeEvent, useEffect } from "react";
import { Search2Icon } from "@chakra-ui/icons";


export interface ListModalProps {
	isOpen: boolean,
	onCloseHandler: () => void,
	title: string,
	description: ReactNode,
	data: Record<string, number | string>,
	columns: string[],
	searchBar?: boolean
}


const ListModal = (props: ListModalProps) => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [filteredData, setFilteredData] = useState<Record<string, number | string>>({});

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

	useEffect(() => {
		const filteredEntries = Object.entries(props.data).filter(([key]) =>
			key.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredData(Object.fromEntries(filteredEntries));
	}, [searchQuery]);


	return (
		<Modal
			isCentered
			isOpen={props.isOpen}
			onClose={props.onCloseHandler}
			size="2xl"
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
							{props.title}
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
					<VStack gap="5">
						<VStack alignItems="left">
							{props.description}
						</VStack>

						<VStack
							maxHeight="40vh"
							minHeight={ props.searchBar ? "40vh" : "none" }
							overflowY="auto"
							width="full"
							borderTopWidth="1px"
							borderTopColor="surfaceBlue.100"
							borderBottomWidth="1px"
							borderBottomColor="surfaceBlue.100"
							bg="surfaceBlue.100"
							borderRadius="7"
							gap="0px"
							alignItems="left"
                        >
							{
								props.searchBar && (
									<HStack
										maxWidth="full"
										border="none"
										margin="10px"
										marginBottom="0px"
										bg="red"
										borderRadius="7"
										backgroundColor="white"
										paddingLeft="5"
										paddingRight="10px"
										gap="0"
										boxShadow="sm"
									>
										<Search2Icon color="primaryBlue.100"/>
										<Input
											fontSize={{ base: "2xs", sm: "xs"}}
											width="full"
											boxShadow="none"
											placeholder="Search..."
											value={searchQuery}
											_focus={{ boxShadow: "none", outline: "none" }}
											onChange={handleSearchChange}
										/>
									</HStack>
								)
							}
							<Table
								style={{borderCollapse: "separate", borderSpacing: "10px 10px"}}
							>
								<Thead>
									<Tr>
										<Th
											textTransform="none"
											bg="secondaryBlue.100"
											borderRadius="7"
											color="primaryBlue.100"
											paddingX="5"
											paddingY="3"
											boxShadow="sm"
											fontSize={{ base: "2xs", sm: "xs"}}
										>
											{props.columns[0]}
										</Th>
										<Th
											textTransform="none"
											bg="secondaryBlue.100"
											borderRadius="7"
											color="primaryBlue.100"
											paddingX="5"
											paddingY="3"
											boxShadow="sm"
											fontSize={{ base: "2xs", sm: "xs"}}
										>
											{props.columns[1]}
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{
										Object.entries(
											searchQuery.length > 0 ? filteredData : props.data
										).map(([key, value]) => (
											<Tr
												key={key}
												backgroundColor="white"
											>
												<Td
													color="textLight"
													paddingX="5"
													paddingY="3"
													boxShadow="sm"
													borderRadius="7"
													fontSize={{ base: "2xs", sm: "xs"}}
												>
													{key}
												</Td>
												<Td
													color="textLight"
													paddingX="5"
													paddingY="3"
													boxShadow="sm"
													borderRadius="7"
													fontSize={{ base: "2xs", sm: "xs"}}
												>
													{value}
												</Td>
											</Tr>
										))
									}
									{
										searchQuery.length > 0 && Object.entries(filteredData).length === 0 ?
											<Text
												fontSize="xs"
												color="textLight"
												padding="5px"
											>
												No such nationality exists in our dataset!
											</Text>
										: null
									}
								</Tbody>
							</Table>
						</VStack>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default ListModal;