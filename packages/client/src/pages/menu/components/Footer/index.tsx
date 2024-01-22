import { APP_BUILD_DATE, APP_VERSION } from "config/constants.ts"

import Style from "./footer.module.scss"

export const Footer = () => {
    return (
        <footer className={Style.footer}>
            <span>{APP_VERSION}</span>
            <span>{APP_BUILD_DATE.toLocaleString()}</span>
        </footer>
    )
}
