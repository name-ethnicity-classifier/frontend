import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { AccessCheckRespnseType, ModelType, ModelsResponseType, NationalityDataType } from "../../types";
import config from "~/config";


export const BACKEND_URL = config.BACKEND_URL;


export const fetchModels = (callback: (customModels: ModelType[], defaultModels: ModelType[]) => void, onError?: () => void) => {
	axios.get(`${BACKEND_URL}/models`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`,
		}
	})
		.then((response: AxiosResponse<ModelsResponseType>) => {
			let customModels: ModelType[] = [];
			response.data?.customModels?.forEach((model: any) => {
				customModels.push({
					name: model.name,
					description: model.description,
					accuracy: model.accuracy,
					isCustom: true,
					scores: model.scores,
					nationalities: model.nationalities,
					creationTime: model.creationTime
				})
			});

			let defaultModels: ModelType[] = [];
			response.data?.defaultModels?.forEach((model: any) => {
				defaultModels.push({
					name: model.name,
					accuracy: model.accuracy,
					isCustom: false,
					scores: model.scores,
					nationalities: model.nationalities,
					creationTime: model.creationTime
				})
			});

			callback(customModels, defaultModels);
		})
		.catch((error: unknown) => {
			if (onError) onError();
			console.error(`Request failed. Error: ${error}`);
		});
}


export const fetchDefaultModels = (callback: (defaultModels: ModelType[]) => void, onError?: () => void) => {
	axios.get(`${BACKEND_URL}/default-models`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response: AxiosResponse<ModelType[]>) => {
			let models: ModelType[] = [];
			response.data?.forEach((model: any) => {
				models.push({
					name: model.name,
					accuracy: model.accuracy,
					isCustom: false,
					scores: model.scores,
					nationalities: model.nationalities
				})
			});

			callback(models);
		})
		.catch((error: unknown) => {
			if (onError) onError();
			console.error(`Request failed. Error: ${error}`);
		});
}



export const fetchNationalityData = (callback: (nationalityData: NationalityDataType) => void) => {
	axios.get(`${BACKEND_URL}/nationalities`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response: AxiosResponse<NationalityDataType>) => {
			callback(response.data);
		})
		.catch((error: unknown) => {
			console.error(`Request failed. Error: ${error}`);
		});
}


export const authAndAccessCheck = (callback: (accessLevel: string, accessLevelReason: string) => void, errorCallback: () => void) => {
	axios.get(`${BACKEND_URL}/check`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		}
	})
		.then((response: AxiosResponse<AccessCheckRespnseType>) => {
			callback(response.data.accessLevel, response.data.accessLevelReason);
		})
		.catch((error: AxiosError) => {
			if (error.status != 401) {
				console.error(`Request failed. Error: ${error}`);
			}
			errorCallback();
		});
}


export const deleteModel = (modelName: string, callback: () => void, errorCallback: (errorCode: string) => void) => {
	axios.delete(`${BACKEND_URL}/models`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		data: {
			names: [modelName]
		}
	})
		.then((_response: AxiosResponse) => {
			callback();
		})
		.catch((error: AxiosError) => {
			const responseData = (error as AxiosError).response?.data as { errorCode?: string };

			if (responseData?.errorCode && errorCallback) {
				errorCallback(responseData.errorCode);
				return;
			}
			console.error(`Request failed. Error: ${error}`);
		});
}


export const deleteAccount = (password: string, callback: () => void, onError?: () => void) => {
	axios.delete(`${BACKEND_URL}/delete-user`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`
		},
		data: {
			password: password
		}
	})
		.then((_response: AxiosResponse) => {
			callback();
		})
		.catch((error: AxiosError) => {
			if (onError) onError();
			console.error(`Request failed. Error: ${error}`);
		});
}


export const updateUsageDescription = (usageDescription: string, callback: () => void, onError?: () => void) => {
	axios.put(`${BACKEND_URL}/update-usage-description`,
		{
			"usageDescription": usageDescription
		},
		{
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${Cookies.get("token")}`
			}

		})
		.then((_response: AxiosResponse) => {
			callback();
		})
		.catch((error: AxiosError) => {
			if (onError) onError();
			console.error(`Request failed. Error: ${error}`);
		});
}