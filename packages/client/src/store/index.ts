import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import logger from "redux-logger";
import authReducer from "./auth/authReducer";

export const store = configureStore({
    reducer:{
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(...(process.env.NODE_ENV !== "production"? [logger]:[]))
})
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch    
const voices = window.speechSynthesis.getVoices();
export const chooseVoice = voices[voices.length - 16]
