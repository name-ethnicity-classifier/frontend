import {
	HStack,
	Text
} from "@chakra-ui/react";


interface BadgeProps {
    text: string,
    icon?: any,
    onClick?: () => void
}


const Pill = (props: BadgeProps) => {
    const interactive: boolean = props.onClick !== undefined;
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
            onClick={props.onClick}
            _hover={{
                bg: interactive ? backgroundColorHover : backgroundColor
            }}
        >
            {props.icon ? props.icon : null}
            <Text
                fontSize={{ base: "2xs", sm: "xs" }}
                fontWeight="bold"
                color={color}
            >
                {props.text.toUpperCase()}
            </Text>
        </HStack>
	);
};

export default Pill;