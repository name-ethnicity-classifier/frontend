import { ChakraProps, FormControl, FormErrorMessage, IconButton, Input, InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HTMLProps, useState } from "react";


const PasswordField = (props: any) => {
	const [showPassword, setShowPassword] = useState(false);
	const { isOpen, onToggle } = useDisclosure();

	const onClickReveal = () => {
		onToggle();
		setShowPassword(showPassword);
	}

	return (
		<InputGroup>
            <Input
                id="password"
                name="password"
                type={isOpen ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Password"
                {...props}
            />
            <InputRightElement>
                <IconButton
                    variant="text"
                    color="primaryBlue.100"
                    size="sm"
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    icon={isOpen ? <ViewIcon /> : <ViewOffIcon />}
                    onClick={onClickReveal}
                />
            </InputRightElement>
        </InputGroup>
	);
}


export default PasswordField;
