import { Route, Routes } from "react-router-dom"
import { MainPage } from "pages/main"

import "styles/global.scss"

const App = () => (
    <Routes>
        <Route path={"/"}>
            <Route index element={<MainPage />} />
        </Route>
    </Routes>
)

export default App
