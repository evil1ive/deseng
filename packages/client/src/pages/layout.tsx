import { FC } from "react"
import { Outlet } from "react-router-dom"

import { Tabbar } from "../components/Tabbar"

export const RootLayout: FC = () => {
    return (
        <main>
            <Outlet />
            <Tabbar />
        </main>
    )
}
