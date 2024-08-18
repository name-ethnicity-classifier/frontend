import { Flex, Box, Text, VStack, Spacer, useDisclosure, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import ListModal from "~/lib/components/ListModal";
import type { ReactNode } from "react";


interface NumberCardProps {
  cardTitle: string,
  modalData: Record<string, number | string>
  modalColumns: string[],
  modalTitle: string,
  modalDescription: ReactNode,
  modalSearchBar?: boolean
}


const NumberCard = (props: NumberCardProps) => {
  const [showListModal, setShowListModal] = useState<boolean>(false);


  return (
    <Flex
      backgroundColor="white"
      borderColor="surfaceBlue"
      borderWidth="1px"
      paddingX={{ base: "2", xl: "12" }}
      paddingY="5"
      borderRadius="7"
      align="center"
      gap={{ base: "0", xl: "10" }}
      maxWidth={{ base: "full", md: "350px" }}
      flexDirection={{ base: "column", xl: "row" }}
      flex="1"
      transition="ease-out 0.15s"
      boxShadow="base"
      _hover={{
        bg: "surfaceBlue",
        borderColor: "surfaceBlue",
        cursor: "pointer"
      }}
      onClick={() => {
        setShowListModal(true);
      }}
    >
      <Text
        fontWeight="bold"
        fontSize={{ base: "3xl", md: "4xl" }}
        color="textDark"
      >
        <CountUp
          start={0}
          end={Object.keys(props.modalData).length}
          duration={2.0}
        />
      </Text>
      <Text
        fontSize={{ base: "sm", md: "sm" }}
        textAlign={{ base: "center", xl: "left" }}
      >
        {props.cardTitle}
      </Text>

      <ListModal
        isOpen={showListModal}
        onCloseHandler={() => { setShowListModal(false) }}
        title={props.modalTitle}
        description={props.modalDescription}
        data={props.modalData}
        columns={props.modalColumns}
        searchBar={props.modalSearchBar}
      />
    </Flex>
  );
};

export default NumberCard;
