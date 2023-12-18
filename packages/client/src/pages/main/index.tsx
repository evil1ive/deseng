import { FC } from "react"

import { Header } from "components/Header"
import { Page } from "components/Page"

export const MainPage: FC = () => {
    return <Page header={<Header>Главная страница</Header>}>что-то</Page>
}
