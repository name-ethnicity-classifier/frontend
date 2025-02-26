

export interface ModelsResponseType {
	customModels: ModelType[],
	defaultModels: ModelType[]
}


export interface ModelType {
	name: string,
	description?: string,
	accuracy: number,
	isCustom: boolean,
	scores: number[],
	nationalities: string[]
}


export interface NationalityDataType {
	nationalities: Record<string, number>,
	nationalityGroups: Record<string, number>
}

export interface BasicClassificationResponseType {
	[key: string]: [string, number]
}

export interface DistributionClassificationResponseType {
	[key: string]: Record<string, number>
}
