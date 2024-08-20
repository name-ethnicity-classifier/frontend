import { Box, Button, Checkbox, VStack, FormControl, useDisclosure, IconButton, InputGroup, InputRightElement, Heading, HStack, Input, Link as Link, Stack, Text, Image, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse, AxiosError } from "axios";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";


const Login = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false);

	return (
        <Flex
            width="full"
            alignItems="center"
            justifyContent="center"
            height="calc(100vh - 60px)"
        >
            <Box
                p={{ base: "6", md: "12" }}
                bg="transparent"
                borderRadius="7px"
                borderWidth="0px"
            >
                <VStack gap="2">
                    <VStack gap="6"  bg="surfaceBlue.100" borderRadius="7px" padding="5">
                        <VStack gap="5" width="full" alignItems="left">
                            <HStack>
                                {
                                    isSignup ?
                                        <>
                                            <LuUserPlus size="23px" color="var(--chakra-colors-primaryBlue-200)" />
                                            <Heading variant="h2" color="primaryBlue.100">
                                                Sign up
                                            </Heading>
                                        </>
                                    :
                                        <>
                                            <LuLogIn size="23px" color="var(--chakra-colors-primaryBlue-200)" />
                                            <Heading variant="h2" color="primaryBlue.100">
                                                Login
                                            </Heading>
                                        </>
                                }
                            </HStack>

                            <HStack gap="1">
                                {
                                    isSignup ?
                                        <>
                                            <Text>
                                                Already have an account?&nbsp;
                                            </Text>
                                            <Link color="primaryBlue.100" onClick={() => setIsSignup(false)}>
                                                <Text variant="link">Login</Text>
                                            </Link>
                                        </>
                                    :
                                        <>
                                            <Text>
                                                Don't have an account yet?&nbsp;
                                            </Text>
                                            <Link color="primaryBlue.100" onClick={() => setIsSignup(true)}>
                                                <Text variant="link">Sign Up</Text>
                                            </Link>
                                        </>
                                }
                            </HStack>
                        </VStack>
                                
                        {
                            isSignup ?
                                <SignupContainer />
                            :
                                <LoginContainer />
                        }
                        
                        
                    </VStack>
                </VStack>
            </Box>
        </Flex>
	);
}

export default Login;