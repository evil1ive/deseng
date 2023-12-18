import { FC } from "react"

import { Header } from "components/Header"
import { Page } from "components/Page"

import { Footer } from "./components/Footer"
import Style from "./menu.module.scss"

export const MenuPage: FC = () => {
    return (
        <Page header={<Header>Меню</Header>} className={Style.page}>
            <Footer />
        </Page>
    )
}
