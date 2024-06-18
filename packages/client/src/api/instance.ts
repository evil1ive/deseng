import axios, { AxiosError } from "axios";
import Endpoints from "./endpoints";
import { store } from "store/index";
import { getAccessToken, logoutUser } from "store/auth/actionCreators";

export const axiosInstance = axios.create({})

export const createFullUrl = (endpoint:string): string => {
    return Endpoints.URL+endpoint
}

const urlsSkipAuth = [createFullUrl(Endpoints.AUTH.LOGIN), createFullUrl(Endpoints.AUTH.REGISTRATE), createFullUrl(Endpoints.AUTH.REFRESH), createFullUrl(Endpoints.AUTH.LOGOUT), createFullUrl(Endpoints.DATA.NEWS)]

axiosInstance.interceptors.request.use(async (config) => {
    if(config.url && urlsSkipAuth.includes(config.url)){
        return config
    }
    const accessToken = await store.dispatch(getAccessToken())
    if(accessToken) {
        const authorization = `Bearer ${accessToken} `

        config.headers = {
            ...config.headers,
            authorization: authorization
        } as any
    }

    return config
})

axiosInstance.interceptors.response.use( 
    (response) => response,
    (error: AxiosError) =>{
        const isLoggedIn = !!store.getState().auth.authData.accessToken

        if((error.response?.status === 401) && isLoggedIn && error.request.url !== createFullUrl(Endpoints.AUTH.LOGOUT)) {
            store.dispatch(logoutUser())
        }

        throw error 
    }
)
