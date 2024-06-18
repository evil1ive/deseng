import { FC } from "react"
import youTubeIcon from "../../../../assets/images/youtube.png"
import Style from  "./card.module.scss"

type materialsCardProps = {
    materialName:string
    materialDescription:string
    materialLink:string
}



export const Card:FC<materialsCardProps> = (props) => {
  
    return (
        <div className={Style.card}>
            <div className={Style.infoWrapper}>
                <div className={Style.enpart}>
                    <div><a  className={Style.word} href={props.materialLink} target="_blank">{props.materialName}</a></div>
                </div>
                <div className={Style.rupart}>
                    <div  className={Style.translation}>{props.materialDescription}</div>
                    <div  className={Style.link}><a className={Style.materialLink} href={props.materialLink} target="_blank"><img className={Style.youTubeIcon} src={youTubeIcon} alt="иконка ссылки" /> Посмотреть</a></div>
                </div>
            </div>
        </div>
    )
}
