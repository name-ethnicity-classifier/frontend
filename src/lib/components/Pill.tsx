import {
	HStack,
	Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";


interface BadgeProps {
    text: string,
    icon?: any,
    interactive?: boolean,
    keepCasing?: boolean;
    colorPalette?: "blue" | "orange" | "red" | "turquoise"
}



const Pill = (props: BadgeProps) => {    
    const [color, setColor] = useState<{ text: string, background: string, backgroundHover: string}>({
        text: "primaryBlue.100",
        background: "secondaryBlue.100",
        backgroundHover: "secondaryBlue.200"
    });

    useEffect(() => {
        if (props.colorPalette) {
            let colorPalette = props.colorPalette.charAt(0).toUpperCase() + props.colorPalette.slice(1);
            setColor({
                text: `primary${colorPalette}.100`,
                background: `secondary${colorPalette}.100`,
                backgroundHover: `secondary${colorPalette}.200`
            });
        }
    }, [props.colorPalette]);

	return (
		<HStack
            border="none"
            borderRadius="full"
            bg={color.background}
            paddingX="2"
            paddingY="0px"
            paddingBottom={props.keepCasing ? "1px" : "0px"}
            gap="1"
            _hover={{
                bg: props.interactive ? color.backgroundHover : color.background,
                cursor: props.interactive ? "pointer" : "default"
            }}
            width={"fit-content"}
        >
            {props.icon}

            <Text
                fontSize="xs"
                fontWeight="bold"
                color={color.text}
            >
                {props.keepCasing ? props.text : props.text.toUpperCase()}
            </Text>
            
        </HStack>
	);
};

export default Pill;