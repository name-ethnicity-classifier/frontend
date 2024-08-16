import { Flex, Box, Text, VStack, Spacer, useDisclosure, Image, HStack, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import ListModal from "~/lib/components/ListModal";
import type { ReactNode } from "react";


interface NumberCardProps {
  data: Record<string, number>
  cardTitle: string,
  modalTitle: string,
  modalDescription: ReactNode
}


const NumberCard = (props: NumberCardProps) => {
  const [showListModal, setShowListModal] = useState<boolean>(false);


  return (
    <Flex
      backgroundColor="white"
      borderColor="secondaryBlue"
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
          end={Object.keys(props.data).length}
          duration={2.0}
        />
      </Text>
      <Text
        fontSize={{ base: "sm", md: "sm" }}
        color="textLight"
        textAlign={{ base: "center", xl: "left" }}
      >
        {props.cardTitle}
      </Text>

      <ListModal
        isOpen={showListModal}
        onCloseHandler={() => { setShowListModal(false) }}
        title={props.modalTitle}
        description={props.modalDescription}
        data={props.data}
      />
    </Flex>
  );
};

export default NumberCard;