import { FC } from "react"
import { useLocation } from "react-router-dom"
import ImgPersik from "assets/images/persik.png"

import Style from "./notfound.module.scss"

export const NotFoundPage: FC = () => {
    const { pathname } = useLocation()

    return (
        <div className={Style.container}>
            <h2>
                Страница <span>{pathname}</span> не найдена
            </h2>
            <img src={ImgPersik} alt={"Персик не нашел страницу, плак-плак"} />
        </div>
    )
}
