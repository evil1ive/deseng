import { FC } from "react"

import Style from  "./card.module.scss"

type materialsCardProps = {
    title:string
    description:string
    link:string
    publishedAt:string
}



export const Card:FC<materialsCardProps> = (props) => {
  
    return (
        <div className={Style.card}>
            <div className={Style.infoWrapper}>
                <div className={Style.enpart}>
                    <div><a  className={Style.word} href={props.link} target="_blank">{props.title}</a></div>
                </div>
                <div className={Style.rupart}>
                    <div  className={Style.translation}>{props.description}</div>
                    <div  className={Style.link}><a className={Style.materialLink} href={props.link} target="_blank">На статью</a></div>
                </div>
                <div className={Style.publishedDate}>{props.publishedAt.split("T")[0]}</div>
            </div>
        </div>
    )
}