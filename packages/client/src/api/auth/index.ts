import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import { IDictionaryResponse, ILoginRequest, ILoginResponse, IMaterialsResponse, INewsResponse, IRegistrateRequest } from "./types";
import Endpoints from "../endpoints";


export const login = (params:ILoginRequest):AxiosPromise<ILoginResponse> => axiosInstance.post(Endpoints.URL+Endpoints.AUTH.LOGIN,params,{withCredentials:true}) 
export const registrate = (params:IRegistrateRequest):AxiosPromise<ILoginResponse> => axiosInstance.post(Endpoints.URL+Endpoints.AUTH.REGISTRATE,params,{withCredentials:true})
export const refreshToken = ():AxiosPromise<ILoginResponse> => axiosInstance.get(Endpoints.URL+Endpoints.AUTH.REFRESH,{withCredentials:true})
export const logout = ():AxiosPromise => axiosInstance.get(Endpoints.URL+Endpoints.AUTH.LOGOUT,{withCredentials:true})
export const getMaterials = ():AxiosPromise<IMaterialsResponse> => axiosInstance.get(Endpoints.URL+Endpoints.DATA.MATERIALS,{withCredentials:true})
export const getDictionary = ():AxiosPromise<IDictionaryResponse> => axiosInstance.get(Endpoints.URL+Endpoints.DATA.DICTIONARY,{withCredentials:true})
export const getNews = ():AxiosPromise<INewsResponse> => axiosInstance.get(Endpoints.APIURL+`q=design&language=en&apiKey=${Endpoints.APIKEY}`)
export const checkUser = ():AxiosPromise<void> => axiosInstance.get(Endpoints.URL+Endpoints.AUTH.CHECKUSER,{withCredentials:true})