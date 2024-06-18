import { Page } from "../../components/page"
import { EntryForm } from "./components/entryForm"

import Style from "./entrance.module.scss"



export const EntrancePage = () => {
    return (
        <Page className={Style.page}>
            <EntryForm ></EntryForm>
        </Page>
    )
}
