import { FC, ReactNode } from "react"
import { IconChevronRight } from "assets/icons"

import Style from "./style.module.scss"

type HeaderProps = {
    children: ReactNode
    backButton?: boolean
    after?: ReactNode
}

export const Header: FC<HeaderProps> = (props) => {
    return (
        <div className={Style.header}>
            {props.backButton && (
                <button className={Style.backbutton}>
                    <IconChevronRight />
                </button>
            )}
            {props.children}
            {props.after ?? <div className={Style.emptyafter} />}
        </div>
    )
}
