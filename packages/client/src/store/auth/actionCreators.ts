import { Dispatch } from "@reduxjs/toolkit";
import api from "../../api/index";
import { ILoginRequest, ILoginResponse, IRegistrateRequest } from "../../api/auth/types";
import { loginStart, loginSuccess, loginFailure, RegistrateSuccess, RegistrateFailure, RegistrateStart, logoutSuccess, getMaterialsStart, getMaterialsSuccess, getMaterialsFailure, getNewsStart, getNewsSuccess, getNewsFailure, getDictionaryStart, getDictionaryFailure, getDictionarySuccess, checkUserEnd, checkUserStart } from "./authReducer";
import { store } from "..";
import { AxiosPromise } from "axios";
import { isTokenExpired } from "store/jwt";


export const loginUser = (data: ILoginRequest) => async (dispatch: Dispatch<any>): Promise<void> => 
    {
        try {
            dispatch(loginStart())
            const res = await api.auth.login(data)
            dispatch(loginSuccess({accessToken:res.data.accessToken, user:res.data.user}))
            
            dispatch(getDictionary())
            dispatch(getNews())
            dispatch(getMaterials())
            
        } catch (e: any) {
            console.error(e)
            if(!!e.response?.data) {
                dispatch(loginFailure({error: e.message, message:e.response.data.message}))
            } else{
                dispatch(loginFailure({error: e.message, message:e.message}))
            }
            
        }
    }

export const registrateUser = (data: IRegistrateRequest) => async (dispatch: Dispatch<any>): Promise<void> => 
    {
        try {
            dispatch(RegistrateStart())
            const res = await api.auth.registrate(data)
            dispatch(RegistrateSuccess({accessToken:res.data.accessToken, user:res.data.user}))
        } catch (e: any) {
            console.error(e)
            if(!!e.response?.data) {
                dispatch(RegistrateFailure({error: e.message, message:e.response.data.message}))
            } else{
                dispatch(RegistrateFailure({error: e.message, message:e.message}))
            }
        }
    }

export const logoutUser = () => async (dispatch:Dispatch<any>): Promise<void> =>
    {
        try{
            
            await api.auth.logout()
            dispatch(logoutSuccess())
        }
        catch (e: any){
            console.error(e)
        }
    }

export const getMaterials = () => async (dispatch:Dispatch<any>): Promise<void> =>
    {
        try{
            dispatch(getMaterialsStart())
            const res = await api.auth.getMaterials()
            dispatch(getMaterialsSuccess({materials:res.data.materials}))
        }
        catch (e: any){
            console.error(e)
            dispatch(getMaterialsFailure({error: e.message}))
        }
    }
     
export const getNews = () => async (dispatch:Dispatch<any>): Promise<void> =>
    {
        try{
            dispatch(getNewsStart())
            const res = await api.auth.getNews()
            dispatch(getNewsSuccess({articles:res.data.articles, status:res.data.status, totalResults:res.data.totalResults}))
        }
        catch (e: any){
            console.error(e)
            dispatch(getNewsFailure({error: e.message}))
        }
    }  
    
export const getDictionary = () => async (dispatch:Dispatch<any>): Promise<void> =>
    {
        try{
            dispatch(getDictionaryStart())
            const res = await api.auth.getDictionary()
            dispatch(getDictionarySuccess({dictionary:res.data.dictionary}))
        }
        catch (e: any){
            console.error(e)
            dispatch(getDictionaryFailure({error: e.message}))
        }
    }   

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null

export const getAccessToken = () => async (dispatch:Dispatch<any>): Promise<string|null> => {
    try{
        const accessToken = store.getState().auth.authData.accessToken


        if(!accessToken || isTokenExpired(accessToken)){
            if(refreshTokenRequest === null){
                refreshTokenRequest = api.auth.refreshToken()
            }  
            const res = await refreshTokenRequest
            refreshTokenRequest = null
            
            dispatch(loginSuccess({accessToken: res.data.accessToken, user:res.data.user}))
           
            return res.data.accessToken  
        }
        
        return accessToken
    } catch(e){
        console.log(e)
        return null
    }
}

export const checkUserLog = () => async (dispatch:Dispatch<any>): Promise<void> => {
    try{
        dispatch(checkUserStart())
        const res = await api.auth.checkUser()
        dispatch(checkUserEnd())
        
        
    }
    catch (e: any){
        console.error(e)
        dispatch(checkUserEnd())
        if(store.getState().auth.authData.accessToken){
            dispatch(getDictionary())
            dispatch(getNews())
            dispatch(getMaterials())    
        }
    }    
}