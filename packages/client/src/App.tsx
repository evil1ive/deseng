import { Route, Routes } from "react-router-dom"
import { RootLayout } from "pages/layout.tsx"
import { MainPage } from "pages/main"
import { MenuPage } from "pages/menu"
import { NotFoundPage } from "pages/notfound"
import { EntrancePage } from "pages/entrance"
import { IRootState, useAppDispatch } from "./store";
import "styles/global.scss"
import { useSelector } from "react-redux"
import { Loader } from "pages/loader"
import { useEffect, useRef } from "react"
import { checkUserLog } from "store/auth/actionCreators"
import { Dictionary } from "pages/dictionary"
import { Materials } from "pages/materials"

const App = () => {
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );
    const isLoading = useSelector(
        (state: IRootState) => state.auth.authData
    );
    const dispatch = useAppDispatch();
    const hasMounted = useRef(false);
    useEffect(() => {
        if(!hasMounted.current){
            hasMounted.current = true;
            dispatch(checkUserLog())
            
        }
    }, []);
      
    return (
        <Routes>
            { isLoading.isLoading ? <Route path={"*"} element={<Loader />}></Route> : isLoggedIn ? (
                <Route path={"/"} element={<RootLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path={"/menu"} element={<MenuPage />} />
                    <Route path={"/dictionary"} element={<Dictionary />}></Route>
                    <Route path={"/materials"} element={<Materials   />}></Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            ) : (
                <Route path={"*"} element={<EntrancePage></EntrancePage>}></Route>  
            )}
        </Routes>
    )
}
export default App
