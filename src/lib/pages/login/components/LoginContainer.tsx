import { Button, Checkbox, VStack, FormControl, HStack, Input, Link as Link, Stack, Text, Image, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse, AxiosError } from "axios";
import PasswordField from "./PasswordField";
import { useAuth } from "~/lib/contexts/AuthContext";
import config from "~/config";


interface LoginRequest {
	email: string,
	password: string
}


interface ValidationError {
	server: { failed: boolean, message: string },
	email: { failed: boolean, message: string },
	password: { failed: boolean, message: string }
}


const FieldErrorMessage = (props: { message: string }) => {
	return (
		<FormErrorMessage fontSize="0.7em" marginTop="4px" marginLeft="5px">
			{props.message}
		</FormErrorMessage>
	);
}


const LoginContainer = () => {
	const { logIn } = useAuth();
	const toast = useToast();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<ValidationError>(
		{
			server: { failed: false, message: "" },
			email: { failed: false, message: "" },
			password: { failed: false, message: "" }
		}
	);

	useEffect(() => {
		if (validationError.server.failed) {
			toast({
				title: "Unexpected server error.",
				description: validationError.server.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	}, [validationError, toast]);

    const sendLoginData = () => {
		if (email.length === 0 || password.length === 0) {
			if (email.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors, email: { failed: true, message: "Please provide an email." }
				}));
			}
			if (password.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors, password: { failed: true, message: "Please provide a password." }
				}));
			}
			return;
		}
		
        let requestBody: LoginRequest = {
            email: email,
			password: password,
        };
        axios.post(`${config.BACKEND_URL}/login`, requestBody)
            .then((response: AxiosResponse) => {
				const cookieOptions = {
					expires: rememberMe ? 30 : undefined,
					sameSite: "Strict" as "Strict" | "Lax" | "None",
					secure: true,
				};
				Cookies.set("token", response.data["accessToken"], cookieOptions);
				Cookies.set("email", email, cookieOptions);
				logIn();

				// Reset all error states
				setValidationError({
					server: { failed: false, message: "" },
					email: { failed: false, message: "" },
					password: { failed: false, message: "" }
				});
				
				setLoginSuccessful(true);

				toast({
					title: "Log in successful.",
					description: "You will be redirected shortly.",
					status: "success",
					duration: 2000,
					isClosable: false,
				});

				setTimeout(() => {
					window.location.href = "/"
				}, 2000);
            })
            .catch((error: AxiosError) => {
				if (error.code === "ERR_NETWORK") {
					setValidationError((prevErrors) => ({
						...prevErrors,
						server: {
							failed: true,
							message: `[${error.code}] Couldn't reach server. We are sorry for the inconvenience. Please try again later.`
						},
					}));
					return;
				}

				const responseData = error.response?.data as { errorCode?: string };
				switch (responseData?.errorCode) {
					case "AUTHENTICATION_FAILED": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							email: { failed: true, message: "Email or password not correct." },
							password: { failed: true, message: "Email or password not correct." }
						}));
						break;
					}
					case "UNEXPECTED_ERROR": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							server: {
								failed: true,
								message: `[${responseData?.errorCode}] We are sorry for the inconvenience. Please try again later.`
							}
						}));
						break;
					}
					case "VERIFICATION_ERROR": {
						toast({
							title: "Email not verfied.",
							description: "We've sent you another verification email. Check your inbox!",
							status: "warning",
							isClosable: true,
						});
						break;
					}
				}
            });
    }

	return (
        <VStack gap="5">
            <VStack width="300px">
                <FormControl
                    isInvalid={validationError.email.failed}
                    marginBottom={validationError.email.failed ? "0" : "2"}
                >
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        onFocus={() => {
                            setValidationError((prevErrors) => ({
                                ...prevErrors,
                                server: { failed: false, message: "" },
                                email: { failed: false, message: "" }
                            }));
                        }}
                    />
                    {
                        validationError.email.failed ?
                            <FieldErrorMessage message={validationError.email.message} />
                        : null
                    }
                    
                </FormControl>

                <FormControl
                    isInvalid={validationError.password.failed}
                >
                    <PasswordField
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        onFocus={() => {
                            setValidationError((prevErrors) => ({
                                ...prevErrors,
                                server: { failed: false, message: "" },
                                password: { failed: false, message: "" }
                            }));
                        }}
                    />
                    {
                        validationError.password.failed ?
                            <FieldErrorMessage message={validationError.password.message} />
                        : null
                    }
                </FormControl>
                
            </VStack>
            
            <HStack width="full" justify="space-between">
                <Checkbox
                    sx={{
						".chakra-checkbox__control": {
							borderWidth: "0px",
							borderColor: "primaryBlue.200",
							borderRadius: "3px",
							bg: "secondaryBlue.100"
						}
					}}
                    size="sm"
                    isChecked={rememberMe}
                    onChange={() => {
                        setRememberMe(!rememberMe)
                    }}
                >
                    <Text>Remember me</Text>
                </Checkbox>
            </HStack>
            <Button
                width="full"
                onClick={sendLoginData}
				isLoading={loginSuccessful}
            >
                Log In
            </Button>
        </VStack>
	);
}

export default LoginContainer;