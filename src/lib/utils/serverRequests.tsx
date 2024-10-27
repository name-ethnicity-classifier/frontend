import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { ModelType, ModelsResponseType, DefaultModelsResponseType, NationalityDataType } from "../../types";


export const BACKEND_URL = `http://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/`


export const fetchModels = (callback: (customModels: ModelType[], defaultModels: ModelType[]) => void) => {
	axios.get(`${BACKEND_URL}/models`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${Cookies.get("token")}`,
		}
	})
		.then((response: AxiosResponse<ModelsResponseType>) => {
			let customModels: ModelType[] = [];
			response.data.data?.customModels?.forEach((model: any) => {
				customModels.push({
					name: model.name,
					accuracy: model.accuracy,
					isCustom: model.isCustom,
					scores: model.scores,
					nationalities: model.nationalities
				})
			});

			let defaultModels: ModelType[] = [];
			response.data.data?.defaultModels?.forEach((model: any) => {
				defaultModels.push({
					name: model.name,
					accuracy: model.accuracy,
					isCustom: model.isCustom,
					scores: model.scores,
					nationalities: model.nationalities
				})
			});

			callback(customModels, defaultModels);
		})
		.catch((error: unknown) => {
			console.error(`Request failed. Error: ${error}`);
		});
}


export const fetchDefaultModels = (callback: (defaultModels: ModelType[]) => void) => {
	axios.get(`${BACKEND_URL}/default-models`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((response: AxiosResponse<DefaultModelsResponseType>) => {
			let models: ModelType[] = [];
			response.data.data?.forEach((model: any) => {
				models.push({
					name: model.name,
					accuracy: model.accuracy,
					isCustom: model.isCustom,
					scores: model.scores,
					nationalities: model.nationalities
				})
			});

			callback(models);
		})
		.catch((error: unknown) => {
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
		.then((response: AxiosResponse) => {
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
