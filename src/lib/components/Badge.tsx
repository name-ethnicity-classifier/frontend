import {
	HStack,
	Text
} from "@chakra-ui/react";


interface BadgeProps {
    text: string,
    icon?: any,
    interactive?: boolean
}



const Pill = (props: BadgeProps) => {
    const interactive: boolean = props.interactive === true;
    const color: string = "primaryBlue.100";
    const backgroundColor: string = "secondaryBlue.100";
    const backgroundColorHover: string = "secondaryBlue.200";

	return (
		<HStack
            border="none"
            borderRadius="full"
            bg={backgroundColor}
            paddingX="2"
            paddingY="1px"
            gap="1"
            _hover={{
                bg: interactive ? backgroundColorHover : backgroundColor,
                cursor: interactive ? "pointer" : "default"
            }}
        >
            {props.icon}

            <Text
                fontSize="xs"
                fontWeight="bold"
                color={color}
            >
                {props.text.toUpperCase()}
            </Text>
            
        </HStack>
	);
};

export default Pill;