import { FC, ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { IconBook, IconDots, IconHome, IconPen } from "assets/icons"
import cn from "classnames"

import Style from "./tabbar.module.scss"

export const Tabbar: FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    return (
        <div className={Style.tabbar}>
            <TabbarItem
                icon={<IconHome />}
                label={"Главная"}
                onClick={() => navigate("/")}
                active={pathname === "/"}
            />
            <TabbarItem
                icon={<IconPen />}
                label={"Задания"}
                onClick={() => navigate("/tasks")}
                active={pathname === "/tasks"}
            />
            <TabbarItem
                icon={<IconBook />}
                label={"Словарь"}
                onClick={() => navigate("/dictionary")}
                active={pathname === "/dictionary"}
            />
            <TabbarItem
                icon={<IconDots />}
                label={"Настройки"}
                onClick={() => navigate("/settings")}
                active={pathname === "/settings"}
            />
        </div>
    )
}

type TabbarItemProps = {
    label: string
    icon: ReactNode
    active?: boolean
    onClick?: () => void
}

const TabbarItem: FC<TabbarItemProps> = ({ icon, label, active = false, onClick }) => {
    return (
        <button className={cn(Style.item, { [Style.item__active]: active })} onClick={onClick}>
            {icon}
            <span>{label}</span>
        </button>
    )
}
