import { Route, Routes } from "react-router-dom"
import { RootLayout } from "pages/layout.tsx"
import { MainPage } from "pages/main"
import { MenuPage } from "pages/menu"
import { NotFoundPage } from "pages/notfound"
import { EntrancePage, UserProps } from "pages/entrance"
import { FC, useState } from "react"

import "styles/global.scss"

export const Entry: FC<UserProps> = (props) => {
    
    if ((Number(localStorage.userLogin) + 57600000) > Date.now()) {
    } else {
        return <EntrancePage log={props.log} setLogin={props.setLogin}></EntrancePage>
    }
}

const App = () => {
    const [login, setLogin] = useState(false)
    return (
        <Routes>
            <Route path={""} element={<Entry log={login} setLogin={setLogin}></Entry>}></Route>
            {(Number(localStorage.userLogin) + 57600000) > Date.now() || login === true ? (
                <Route path={"/"} element={<RootLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path={"/menu"} element={<MenuPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            ) : (
                "хуй"
            )}
        </Routes>
    )
}
export default App
