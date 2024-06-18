import { FC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IconBook, IconDots, IconHome, IconPen } from "assets/icons"

import Style from "./tabbar.module.scss"
import { TabBarItem } from "components/tab-bar-item"

export const TabBar: FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    return (
        <nav className={Style.tabbar}>
            <TabBarItem
                icon={<IconHome />}
                label={"Главная"}
                onClick={() => navigate("/")}
                selected={pathname === "/"}
            />
            <TabBarItem
                icon={<IconPen />}
                label={"Материалы"}
                onClick={() => navigate("/materials")}
                selected={pathname === "/materials"}
            />
            <TabBarItem
                icon={<IconBook />}
                label={"Словарь"}
                onClick={() => navigate("/dictionary")}
                selected={pathname === "/dictionary"}
            />
            <TabBarItem
                icon={<IconDots />}
                label={"Меню"}
                onClick={() => navigate("/menu")}
                selected={pathname === "/menu"}
            />
        </nav>
    )
}
