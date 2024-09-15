import {
	HStack,
	Input
} from "@chakra-ui/react";
import { ReactElement } from "react";


interface IconSearchbarProps {
    placeholderText: string
    inputValue: string,
    onInputChange: () => void
	icon: ReactElement
}


const IconSearchbar = (props: IconSearchbarProps) => {
    const { placeholderText, inputValue, onInputChange, icon, ...styles } = props;

	return (
		<HStack
            maxWidth="full"
            border="none"
            marginBottom="0px"
            bg="red"
            borderRadius="7"
            backgroundColor="white"
            paddingLeft="5"
            paddingRight="10px"
            gap="0"
            boxShadow="sm"
            {...styles}
        >
            {icon}
            <Input
                fontSize={{ base: "2xs", sm: "xs" }}
                width="full"
                boxShadow="none"
                placeholder={placeholderText}
                value={inputValue}
                _focus={{ boxShadow: "none", outline: "none" }}
                onChange={onInputChange}
            />
        </HStack>
	);
};

export default IconSearchbar;