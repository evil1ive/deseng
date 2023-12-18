import { Route, Routes } from "react-router-dom"

import "styles/global.scss"

const App = () => (
    <Routes>
        <Route path={"/"}>
            <Route index element={<div>Hello world</div>} />
        </Route>
    </Routes>
)

export default App
