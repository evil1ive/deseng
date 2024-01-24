import { Route, Routes } from "react-router-dom"
import { RootLayout } from "pages/layout.tsx"
import { MainPage } from "pages/main"
import { MenuPage } from "pages/menu"
import { NotFoundPage } from "pages/notfound"

import "styles/global.scss"

const App = () => (
    <Routes>
        <Route path={"/"} element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path={"/menu"} element={<MenuPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
)

export default App
