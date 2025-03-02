import { Box, Button, Checkbox, VStack, FormControl, Select, IconButton, HStack, Input, Link as Link, Stack, Text, Image, Flex, useToast, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios, { AxiosResponse, AxiosError } from "axios";
import { BACKEND_URL } from "~/lib/utils/serverRequests";
import { FaBookOpen } from "react-icons/fa";
import PasswordField from "./PasswordField";
import EthicalOnboardingModal from "./EthicalOnboardingModal";



interface SignupRequest {
	name: string,
	email: string,
	role: string,
	password: string,
	consented: boolean,
	usageDescription: string
}


interface ValidationError {
	server: { failed: boolean, message: string },
	name: { failed: boolean, message: string },
	email: { failed: boolean, message: string },
	password: { failed: boolean, message: string },
	confirmedPassword: { failed: boolean, message: string },
	consented: { failed: boolean, message: string },
	ethicalOnboarding: { failed: boolean, message: string }
}


const FieldErrorMessage = (props: { message: string }) => {
	return (
		<FormErrorMessage fontSize="0.7em" marginTop="4px" marginLeft="5px">
			{props.message}
		</FormErrorMessage>
	);
}



const SignupContainer = (props: {onSuccessfulSignup: () => void}) => {
	const toast = useToast();

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmedPassword, setConfirmedPassword] = useState<string>("");
	const [consented, setConsented] = useState<boolean>(false);
	const [ethicalOnboardingModalOpen, setEthicalOnboardingModalOpen] = useState<boolean>(false);
	const [ethicalOnboardingFinished, setEthicalOnboardingFinished] = useState<boolean>(false);
	const [usageDescription, setUsageDescription] = useState<string>("");
	const [signupInProgress, setSignupInProgress] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<ValidationError>(
		{
			server: { failed: false, message: "" },
			name: { failed: false, message: "" },
			email: { failed: false, message: "" },
			password: { failed: false, message: "" },
			confirmedPassword: { failed: false, message: "" },
			consented: { failed: false, message: "" },
			ethicalOnboarding: { failed: false, message: "" }
		}
	);

    const roles = ["Researcher", "Student", "Data Scientist", "Sociologist", "Educator", "Journalist", "Developer", "else"]

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
					...prevErrors,
					name: { failed: true, message: "Please provide a name." }
				}));
			}
			if (email.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					email: { failed: true, message: "Please provide an email." }
				}));
			}
			if (password.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					password: { failed: true, message: "Please provide a password." }
				}));
			}
			if (confirmedPassword.length === 0) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					confirmedPassword: { failed: true, message: "Please confirm password." }
				}));
			}
			if (confirmedPassword !== password) {
				setValidationError((prevErrors) => ({
					...prevErrors,
					confirmedPassword: { failed: true, message: "Passwords do not match." }
				}));
			}

			return;
		}

		setSignupInProgress(true);
		
        let requestBody: SignupRequest = {
			name: name,
            email: email,
			role: role,
			password: password,
			consented: consented,
			usageDescription: usageDescription
        };
        axios.post(`${BACKEND_URL}/signup`, requestBody)
            .then((_response: AxiosResponse) => {
				// Reset all error states
				setValidationError({
					server: { failed: false, message: "" },
					name: { failed: false, message: "" },
					email: { failed: false, message: "" },
					password: { failed: false, message: "" },
					confirmedPassword: { failed: false, message: "" },
					consented: { failed: false, message: "" },
					ethicalOnboarding: { failed: false, message: "" }
				});
				
				toast({
					title: "Success! Please verify your account.",
					description: "We have sent you an email to activate your account.",
					status: "success",
					duration: 60000,
					isClosable: false,
				});

				setTimeout(() => {
					props.onSuccessfulSignup();
				}, 2000);
            })
            .catch((error: AxiosError) => {
				setSignupInProgress(false);

				if (error.code === "ERR_NETWORK") {
					setValidationError((prevErrors) => ({
						...prevErrors,
						server: { failed: true, message: "Couldn't reach server. We are sorry for the inconvenience. Please try again later." },
					}));
					return;
				}

				const responseData = (error as AxiosError).response?.data as { errorCode?: string };
				switch (responseData?.errorCode) {
					case "EMAIL_EXISTS": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							email: { failed: true, message: "An account with this email already exists." },
						}));
						break;
					}
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
					case "INVALID_ROLE": {
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
					case "INVALID_USAGE_DESCRIPTION": {
						setValidationError((prevErrors) => ({
							...prevErrors,
							ethicalOnboarding: { failed: true, message: "Please provide a reason why you need access to this tool." },
						}));
						break;
					}
					default: {
						setValidationError((prevErrors) => ({
							...prevErrors,
							server: {
								failed: true,
								message: `[${responseData?.errorCode}] An unexpected error occured. Please try again later.`
							},
						}));
					}
				}
            });
    }

	return (
        <VStack gap="5">
            <VStack width="300px">

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
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								setRole(e.target.value);
							}}
						>
							{
								roles.map((role: string) => (
									<option value={role}>
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
							borderRadius: "3px",
							bg: validationError.consented.failed ? "red.100" : "secondaryBlue.100"
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
                    <Text
						color={validationError.consented.failed ? "primaryRed.100" : "textLight"}
					>
						I read and accept the <Link href="/terms-of-service" target="_blank">terms of service</Link>.
					</Text>
                </Checkbox>
            </HStack>


			<VStack width="full" gap="4">

				<Button
					width="full"
					variant={
						validationError.ethicalOnboarding.failed ? "cautious" :
						ethicalOnboardingFinished ? "success" :
						"secondary"
					}
					onFocus={() => {
						setValidationError((prevErrors) => ({
                            ...prevErrors, ethicalOnboarding: { failed: false, message: "" }
                        }))
					}}
					onClick={() => setEthicalOnboardingModalOpen(true)}
					leftIcon={
						ethicalOnboardingFinished ?
							<CheckCircleIcon color="primaryTurquoise.100"/>
						:
							<FaBookOpen
								color={`var(--chakra-colors-primary${validationError.ethicalOnboarding.failed ? "Red" : "Blue"}-100)`}
							/>
					}
				>
					{
						ethicalOnboardingFinished ? "Ethical onboarding completed!" : "Complete ethical onboarding"
					}
				</Button>
				
				<Button
					width="full"
					onClick={() => sendSignupData()}
					isLoading={signupInProgress}
				>
					Sign up
				</Button>
            </VStack>

			<EthicalOnboardingModal
				isOpen={ethicalOnboardingModalOpen}
				usageDescription={usageDescription}
				onUsageDescriptionChange={setUsageDescription}
				onComplete={(description: string) => {
					setEthicalOnboardingModalOpen(false);
					setEthicalOnboardingFinished(true);
					setUsageDescription(description);
					setValidationError((prevErrors) => ({
						...prevErrors, ethicalOnboarding: { failed: false, message: "" }
					}));
				}}
				onClose={() => setEthicalOnboardingModalOpen(false)}
			/>
        </VStack>
	);
}

export default SignupContainer;