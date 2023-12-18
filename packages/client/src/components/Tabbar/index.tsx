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
                selected={pathname === "/"}
            />
            <TabbarItem
                icon={<IconPen />}
                label={"Задания"}
                onClick={() => navigate("/tasks")}
                selected={pathname === "/tasks"}
            />
            <TabbarItem
                icon={<IconBook />}
                label={"Словарь"}
                onClick={() => navigate("/dictionary")}
                selected={pathname === "/dictionary"}
            />
            <TabbarItem
                icon={<IconDots />}
                label={"Настройки"}
                onClick={() => navigate("/settings")}
                selected={pathname === "/settings"}
            />
        </div>
    )
}

type TabbarItemProps = {
    label: string
    icon: ReactNode
    selected?: boolean
    onClick?: () => void
}

const TabbarItem: FC<TabbarItemProps> = ({ icon, label, selected = false, onClick }) => {
    return (
        <button className={cn(Style.item, { [Style.item__selected]: selected })} onClick={onClick}>
            {icon}
            <span>{label}</span>
        </button>
    )
}
