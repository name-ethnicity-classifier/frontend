import { Box, Button, Checkbox, VStack, FormControl, Select, IconButton, InputGroup, InputRightElement, Heading, HStack, Input, Link as Link, Stack, Text, Image, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse, AxiosError } from "axios";

import PasswordField from "./PasswordField";




const FieldErrorMessage = (props: { message: string }) => {
	return (
		<FormErrorMessage fontSize="0.7em" marginTop="4px" marginLeft="5px">
			<b>&#9888;</b>&nbsp;&nbsp;{props.message}
		</FormErrorMessage>
	);
}


interface ValidationError {
	server: { failed: boolean, message: string },
	name: { failed: boolean, message: string },
    role: { failed: boolean, message: string },
	email: { failed: boolean, message: string },
	password: { failed: boolean, message: string },
	confirmedPassword: { failed: boolean, message: string },
	consented: { failed: boolean, message: string }
}

const SignupContainer = () => {

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmedPassword, setConfirmedPassword] = useState<string>("");
	const [consented, setConsented] = useState<boolean>(false);

	const [signupSuccessful, setSignupSuccessful] = useState<boolean>(false);

	const [validationError, setValidationError] = useState<ValidationError>(
		{
			server: { failed: false, message: "" },
			name: { failed: false, message: "" },
            role: { failed: false, message: "" },
			email: { failed: false, message: "" },
			password: { failed: false, message: "" },
			confirmedPassword: { failed: false, message: "" },
			consented: { failed: false, message: "" }
		}
	);

    const roles = ["Researcher", "Student", "Data Scientist", "Sociologist", "HR", "Educator", "Journalist", "Developer", "else"]

	const toast = useToast();

	useEffect(() => {
		if (validationError.server.failed) {
			toast({
				title: "Unexpected server error.",
				description: validationError.server.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			setValidationError((prevErrors) => ({
				...prevErrors, server: { failed: false, message: "" }
			}));
		}
	  }, [validationError, toast]);

    const sendSignupData = () => {
		if (
			name.length === 0 || email.length === 0 ||
			password.length === 0 || confirmedPassword.length === 0 ||
			confirmedPassword !== password
		) {
			// Check for empty input fields
			if (name.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors, name: { failed: true, message: "Please provide a name." }
				}));
			}
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
			if (confirmedPassword.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors, confirmedPassword: { failed: true, message: "Please confirm password." }
				}));
			}
			// Check password confirmation
			if (confirmedPassword !== password) {
				setValidationError((prevErrors) => ({
					...prevErrors, confirmedPassword: { failed: true, message: "Passwords do not match." }
				}));
			}

			return;
		}

		
		// Make login request
        let requestBody: { name: string, email: string, password: string, consented: boolean } = {
			name: name,
            email: email,
			password: password,
			consented: consented
        };
        axios.post(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/signup`, requestBody)
            .then((response: AxiosResponse) => {
				// Reset all error states
				setValidationError({
					server: { failed: false, message: "" },
					name: { failed: false, message: "" },
					email: { failed: false, message: "" },
                    role: { failed: false, message: "" },
					password: { failed: false, message: "" },
					confirmedPassword: { failed: false, message: "" },
					consented: { failed: false, message: "" }
				});
				
				setSignupSuccessful(true);

				toast({
					title: "Sign up successful.",
					description: "You will be redirected shortly.",
					status: "success",
					duration: 2000,
					isClosable: false,
				});

				setTimeout(() => {
					window.location.href = "/login"
				}, 2000);
            })
            .catch((error: AxiosError) => {
				if (error.code === "ERR_NETWORK") {
					setValidationError((prevErrors) => ({
						...prevErrors,
						server: { failed: true, message: "Couldn't reach server. We are sorry for the inconvenience. Please try again later." },
					}));
					return;
				}

				const responseData = (error as AxiosError).response?.data as { errorCode?: string };
				switch (responseData?.errorCode) {
					case "INVALID_NAME": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							name: { failed: true, message: "Invalid name (min. 2, max. 50 letters)." },
						}));
						break;
					}
					case "INVALID_EMAIL": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							email: { failed: true, message: "Invalid email format." },
						}));
						break;
					}
					case "PASSWORD_TOO_LONG": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							password: { failed: true, message: "Password must be 8-50 characters, include at least one upper- and lowercase letter, and one number." },
						}));
						break;
					}
					case "PASSWORD_TOO_WEAK": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							password: { failed: true, message: "Password must be 8-50 characters, include at least one upper- and lowercase letter, and one number." },
						}));
						break;
					}
					case "NO_CONSENT": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							consented: { failed: true, message: "Please consent to our Terms of Services in order to sign up." },
						}));
						break;
					}
					default: {
						setValidationError((prevErrors) => ({
							...prevErrors,
							server: {
								failed: true,
								message: `[${responseData?.errorCode}] We are sorry for the inconvenience. Please try again later.`
							},
						}));
					}
				}
            });
    }

	return (
        
        <VStack gap="5">
            <VStack minWidth="300px">

				<FormControl
					isInvalid={validationError.name.failed}
					flex="1"
					marginBottom={validationError.name.failed ? "0" : "2"}
				>
					<HStack gap="4">
						<Input
							id="name"
							type="text"
							placeholder="Name"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setName(e.target.value);
							}}
							onFocus={() => {
								setValidationError((prevErrors) => ({
									...prevErrors, name: { failed: false, message: "" }
								}));
							}}
						/>

						<Select
							placeholder="Select role"
							onFocus={() => {
								setValidationError((prevErrors) => ({
									...prevErrors, role: { failed: false, message: "" }
								}));
							}}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								setRole(e.target.value);
								setValidationError((prevErrors) => ({
									...prevErrors, role: { failed: false, message: "" }
								}));
							}}
						>
							{
								roles.map((role: string) => (
									<option value={`option-${role}`}>
										{role}
									</option>
								))
							}
						</Select>
					</HStack>
					
					{
                        validationError.name.failed ?
							<FieldErrorMessage message={validationError.name.message} />
                        : null
                    }

				</FormControl>
	
					

                <FormControl
                    isInvalid={validationError.email.failed}
                    marginBottom={validationError.email.failed ? "0" : "2"}
                >
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        onFocus={() => {
                            setValidationError((prevErrors) => ({
                                ...prevErrors, email: { failed: false, message: "" }
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
                    marginBottom={validationError.password.failed ? "0" : "2"}
                >
                    <PasswordField
                        placeholder="Password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        onFocus={() => {
                            setValidationError((prevErrors) => ({
                                ...prevErrors, password: { failed: false, message: "" }
                            }));
                        }}
                    />
                    {
                        validationError.password.failed ?
							<FieldErrorMessage message={validationError.password.message} />
                        : null
                    }
                </FormControl>
                
                <FormControl
                    isInvalid={validationError.confirmedPassword.failed}
                >
                    <PasswordField
                        placeholder="Confirm password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setConfirmedPassword(e.target.value);
                        }}
                        onFocus={() => {
                            setValidationError((prevErrors) => ({
                                ...prevErrors, confirmedPassword: { failed: false, message: "" }
                            }));
                        }}
                    />
                    {
                        validationError.confirmedPassword.failed ?
							<FieldErrorMessage message={validationError.confirmedPassword.message} />
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
                    color={validationError.consented.failed ? "primaryRed.100" : "textBlack.100"}
                    borderColor={validationError.consented.failed ? "primaryRed.100" : ""}
                    
                    onChange={() => {
                        setValidationError((prevErrors) => ({
                            ...prevErrors, consented: { failed: false, message: "" }
                        }));
                        setConsented(!consented);
                    }}
                >
                    <Text>Accept terms of service</Text>
                </Checkbox>
            </HStack>
            
            <Button
                width="full"
                onClick={sendSignupData}
            >
                Sign up
            </Button>
            
        </VStack>
	);
}

export default SignupContainer;