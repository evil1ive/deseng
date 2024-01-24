import { FC, ReactNode } from "react"
import cn from "classnames"

import Style from "./tabbar.module.scss"

type TabBarItemProps = {
    label: string
    icon: ReactNode
    selected?: boolean
    onClick?: () => void
}

export const TabBarItem: FC<TabBarItemProps> = ({ icon, label, selected = false, onClick }) => {
    return (
        <button className={cn(Style.item, { [Style.item__selected]: selected })} onClick={onClick}>
            {icon}
            <span>{label}</span>
        </button>
    )
}
