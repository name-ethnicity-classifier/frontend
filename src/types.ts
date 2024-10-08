

export interface ModelsResponseType {
	data: {
		customModels: ModelType[],
		defaultModels: ModelType[]
	}
}


export interface DefaultModelsResponseType {
	data: ModelType[]
}



export interface ModelType {
	name: string,
	accuracy: number,
	isCustom: boolean,
	scores: number[],
	nationalities: string[]
}


export interface NationalityDataType {
	nationalities: Record<string, number>,
	nationalityGroups: Record<string, number>
}