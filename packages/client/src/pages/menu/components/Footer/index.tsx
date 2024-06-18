import { APP_VERSION } from "config/constants.ts"

import "./footer.scss"

export const Footer = () => {
    return (
        <footer className="footer">
            <span>{APP_VERSION}</span>
        </footer>
    )
}
