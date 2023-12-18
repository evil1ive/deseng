import { FC, ReactNode } from "react"
import cn from "classnames"

import Style from "./page.module.scss"

type PageProps = {
    header?: ReactNode
    children: ReactNode
    className?: string
}

export const Page: FC<PageProps> = ({ header, children, className }) => {
    return (
        <>
            {header}
            <main className={cn(className, Style["page-wrapper"])}>{children}</main>
        </>
    )
}
