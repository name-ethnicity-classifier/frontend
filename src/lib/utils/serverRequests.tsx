

interface SignupData {
	email: string;
	password: string;
	consented: boolean;
	name: string;
	role: string;
};


const baseURL = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/signup`;


async function signup(data: SignupData): Promise<SignupResponse> {
	const response = await fetch("/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		// Handle HTTP errors
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData: SignupResponse = await response.json();
	return responseData;
}

// Usage example:
const signupData: SignupData = {
	email: "teddypeifer@gmail.com",
	password: "Password#123#",
	consented: true,
	name: "ted",
	role: "else",
};

signup(signupData)
	.then((response) => {
		console.log("Signup successful:", response);
	})
	.catch((error) => {
		console.error("Signup failed:", error);
	});
