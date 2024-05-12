import { FC, useState } from "react"
import { Page } from "../../components/page"
import { EntryForm } from "./components/entryForm"

import Style from "./entrance.module.scss"

export type UserProps = {
    setLogin: Function
    log: boolean
}

export const EntrancePage: FC<UserProps> = (props) => {
    return (
        <Page className={Style.page}>
            <EntryForm setLogin={props.setLogin} log={props.log}></EntryForm>
        </Page>
    )
}
