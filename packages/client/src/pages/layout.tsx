import { FC } from "react"
import { Outlet } from "react-router-dom"

import { TabBar } from "../components/tab-bar"

export const RootLayout: FC = () => {
    return (
        <>
            <Outlet />
            <TabBar />
        </>
    )
}
