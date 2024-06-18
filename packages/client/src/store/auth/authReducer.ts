import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDictionaryResponse, ILoginResponse, IMaterialsResponse, INewsResponse } from "../../api/auth/types";


export interface AuthState {
    authData: {
        accessToken: string|null
        isLoading: boolean
        error: string|null
        message: string|null
    }
    userData: {
        user: string|null
        studyDirections:string[]
        isLoading:boolean
        error:string|null
        message: string|null
    },
    newsData: {
        status:string|null
        totalResults: number|null
        articles: Array<{source:{id:string, name:string}, author:string, title:string, description:string, url:string,urlToImage:string, publishedAt:string}>|null
        isLoading:boolean
        error:string|null
    },
    dictionaryData: {
        dictionary:Array<{_id:string, word:string, transcription:string, translation:string}>|null
        isLoading:boolean
        error:string|null
    },
    materialData: {
        materials:Array<{_id:string, materialName:string, materialDescription:string, materialLink:string}>|null
        isLoading:boolean
        error:string|null
    }
}

const initialState: AuthState = {
    authData:{
        accessToken: null,
        isLoading: false,
        error: null,
        message: null
    },
    userData: {
        user: null,
        studyDirections:[],
        isLoading:false,
        error:null,
        message:null
    },
    newsData: {
        status: null,
        totalResults: null,
        articles: null,
        isLoading: false,
        error: null
    },
    dictionaryData: {
        dictionary:null,
        isLoading:false,
        error:null
    },
    materialData: {
        materials:null,
        isLoading:false,
        error:null,
    }
}


export const authReducer = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginStart:(state):AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                isLoading:true,
            }
        }),
        loginSuccess: (state, action:PayloadAction<ILoginResponse>): AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                accessToken: action.payload.accessToken,
                isLoading:false,
                error:null,
                message:null
            },
            userData:{
                ...state.userData,
                user:action.payload.user
            }
        }),
        loginFailure: (state, action:PayloadAction<{error:string, message:string}>): AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                isLoading:false,
                error:action.payload.error,
                message:action.payload.message
            }
        }),
        RegistrateStart:(state):AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                isLoading:true,
            }
        }),
        RegistrateSuccess: (state, action:PayloadAction<ILoginResponse>): AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                accessToken: action.payload.accessToken,
                isLoading:false,
                error:null,
                message:null
            },
            userData:{
                ...state.userData,
                user:action.payload.user
            }
        }),
        RegistrateFailure: (state, action:PayloadAction<{error:string, message:string}>): AuthState =>({
            ...state,
            authData:{
                ...state.authData,
                isLoading:false,
                error:action.payload.error,
                message:action.payload.message
            }
        }),
        loadUserStart:(state):AuthState =>({
            ...state,
            userData:{
                ...state.userData,
                isLoading:true,
            }
        }),
        loadUserSuccess: (state, action:PayloadAction<{user:string,studyDirections:string[]}>): AuthState =>({
            ...state,
            userData:{
                ...state.userData,
                user: action.payload.user,
                studyDirections:action.payload.studyDirections,
                isLoading:false,
                error:null,
                message:null
            }
        }),
        loadUserFailure: (state, action:PayloadAction<{message:string,error:string}>): AuthState =>({
            ...state,
            userData:{
                ...state.userData,
                isLoading:false,
                error:action.payload.error,
                message:action.payload.message
            }
        }),
        logoutSuccess: ():AuthState => initialState,
        getNewsStart:(state):AuthState =>({
            ...state,
            newsData: {
                ...state.newsData,
                isLoading:true
            }
        }),
        getNewsSuccess: (state, action:PayloadAction<INewsResponse>): AuthState =>({
            ...state,
            newsData:{
                ...state.newsData,
                status:action.payload.status,
                articles:action.payload.articles,
                totalResults:action.payload.totalResults,
                isLoading:false,
                error:null,
            }
        }),
        getNewsFailure: (state, action:PayloadAction<{error:string}>): AuthState =>({
            ...state,
            newsData:{
                ...state.newsData,
                isLoading:false,
                error:action.payload.error
            }
        }),
        getMaterialsStart:(state):AuthState =>({
            ...state,
            materialData: {
                ...state.materialData,
                isLoading:true
            }
        }),
        getMaterialsSuccess: (state, action:PayloadAction<IMaterialsResponse>): AuthState =>({
            ...state,
            materialData:{
                ...state.materialData,
                materials: action.payload.materials,
                isLoading:false,
                error:null,
            }
        }),
        getMaterialsFailure: (state, action:PayloadAction<{error:string}>): AuthState =>({
            ...state,
            materialData:{
                ...state.materialData,
                isLoading:false,
                error:action.payload.error
            }
        }),
        getDictionaryStart:(state):AuthState =>({
            ...state,
            dictionaryData: {
                ...state.dictionaryData,
                isLoading:true
            }
        }),
        getDictionarySuccess: (state, action:PayloadAction<IDictionaryResponse>): AuthState =>({
            ...state,
            dictionaryData:{
                ...state.dictionaryData,
                dictionary: action.payload.dictionary,
                isLoading:false,
                error:null,
            }
        }),
        getDictionaryFailure: (state, action:PayloadAction<{error:string}>): AuthState =>({
            ...state,
            dictionaryData:{
                ...state.dictionaryData,
                isLoading:false,
                error:action.payload.error
            }
        }),
        checkUserStart: (state):AuthState => ({
            ...state,
            authData:{
                ...state.authData,
                isLoading:true
            }
        }),
        checkUserEnd: (state):AuthState => ({
            ...state,
            authData:{
                ...state.authData,
                isLoading:false
            }
        })
    }
})

export const { loadUserStart, loadUserSuccess, loadUserFailure, loginStart, loginFailure, loginSuccess, RegistrateStart, RegistrateFailure, RegistrateSuccess, logoutSuccess, getNewsStart, getNewsFailure, getNewsSuccess, getMaterialsStart, getMaterialsFailure, getMaterialsSuccess, getDictionaryStart, getDictionaryFailure, getDictionarySuccess, checkUserStart, checkUserEnd} = authReducer.actions

export default authReducer.reducer