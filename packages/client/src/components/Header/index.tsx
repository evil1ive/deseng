import { FC, ReactNode } from "react"
import { IconChevronRight } from "assets/icons"

import Style from "./header.module.scss"

type HeaderProps = {
    children: ReactNode
    backButton?: boolean
    after?: ReactNode
}

const EmptySlot = () => <div className={Style.emptyslot} />

export const Header: FC<HeaderProps> = (props) => {
    return (
        <div className={Style.header}>
            {props.backButton ? (
                <button className={Style.backbutton}>
                    <IconChevronRight />
                </button>
            ) : (
                <EmptySlot />
            )}
            {props.children}
            {props.after ?? <EmptySlot />}
        </div>
    )
}
