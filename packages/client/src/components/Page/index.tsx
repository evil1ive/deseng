import { FC, ReactNode } from "react"

type PageProps = {
    header?: ReactNode
    children: ReactNode
    className?: string
}

export const Page: FC<PageProps> = ({ header, children, className }) => {
    return (
        <>
            {header}
            <main className={className}>{children}</main>
        </>
    )
}
