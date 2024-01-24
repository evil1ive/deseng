import { FC } from "react"
import { Card } from "pages/main/components/Card"

import { Header } from "../../components/header"
import { Page } from "../../components/page"

import Style from "./main.module.scss"

const cards = Array.from({ length: 25 }).fill(0)

export const MainPage: FC = () => {
    return (
        <Page header={<Header>Главная страница</Header>} className={Style.page}>
            {cards.map((_, index) => (
                <Card key={index} />
            ))}
        </Page>
    )
}
