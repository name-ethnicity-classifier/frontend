import { Box, Button, Checkbox, VStack, Heading, HStack, Input, Link as Link, Stack, Text, Image, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { LuLogIn, LuUserPlus } from "react-icons/lu";
import LoginContainer from "./components/LoginContainer";
import SignupContainer from "./components/SignupContainer";


const Login = () => {
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [showLoginVerificationMessage, setShowLoginVerificationMessage] = useState<boolean>(false);

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
                                                Login
                                            </Link>
                                        </>
                                    :
                                        <>
                                            <Text>
                                                Don't have an account yet?&nbsp;
                                            </Text>
                                            <Link color="primaryBlue.100" onClick={() => setIsSignup(true)}>
                                                Sign Up
                                            </Link>
                                        </>
                                }
                            </HStack>
                        </VStack>
                                
                        {
                            isSignup ?
                                <SignupContainer onSuccessfulSignup={() => {
                                    setIsSignup(false)
                                }}/>
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