import { FC } from "react"
import VoiceImage from "../../../../assets/images/voice.png"
import Style from  "./card.module.scss"

type dictionaryCardProps = {
    word:string
    translation:string
    transcription:string
    setState:Function
}

export const Card:FC<dictionaryCardProps> = (props) => {
    return (
        <div className={Style.card}>
            <div className={Style.infoWrapper}>
                <div className={Style.enpart}>
                    <div className={Style.word}>{props.word}</div>
                    <div className={Style.transcription}>{props.transcription}</div>
                    <button className={Style.speakButton} onClick={()=>{props.setState(props.word)}}><img className={Style.voiceImage}  onClick={()=>{props.setState(props.word)}} src={VoiceImage}></img></button>
                </div>
                <div className={Style.rupart}>
                    <div  className={Style.translation}>{props.translation}</div>
                </div>
            </div>
        </div>
    )
}
