
export interface ILoginRequest {
    login:string
    password:string
}

export interface ILoginResponse {
    accessToken:string
    user:string
}

export interface IRegistrateRequest {
    login:string
    password:string
}

export interface Idata {}

export interface IDictionaryResponse {
    dictionary:Array<{_id:string, word:string, transcription:string, translation:string}>
}

export interface IMaterialsResponse {
    materials:Array<{_id:string, materialName:string, materialDescription:string, materialLink:string}>
}


export interface INewsResponse {
    status:string
    totalResults: number
    articles: Array<{source:{id:string, name:string}, author:string, title:string, description:string, url:string,urlToImage:string, publishedAt:string}>
}
