import { HStack, Text } from "@chakra-ui/react";
import { ReactElement } from "react";


const SectionTitle = (props: { title: string, icon: ReactElement }) => {
    return (
        <HStack
            width="full"
            bg="secondaryBlue.100"
            boxShadow="sm"
            borderRadius="7"
            paddingX="5"
            paddingY="10px"
            gap="4"
        >
            {props.icon}
            <Text
                width="full"
                fontWeight="bold"
                color="primaryBlue.100"
                fontSize={{ base: "2xs", sm: "xs"}}
            >
                {props.title}
            </Text>
        </HStack>
    );
}


export default SectionTitle;