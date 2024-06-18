import { Card } from "./components/Card"

import { Header } from "../../components/header"
import { Page } from "../../components/page"
import Style from "./dictionary.module.scss"
import { useSelector } from "react-redux"
import { IRootState } from "store/index"
import { Loader } from "pages/loader"
import { useEffect, useState } from "react"

const getVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices[voices.length - 16]
}

let lastWord = "";
let utterance = new SpeechSynthesisUtterance("");

const SpeakWords = (word:string) => {
    if (speechSynthesis!.speaking) {
        window.speechSynthesis.cancel();       
    }else{    
        utterance = new SpeechSynthesisUtterance(word);
        utterance.volume = 0.7
        utterance.voice = getVoice()
        utterance.lang = 'english'
        window.speechSynthesis.speak(utterance);
        lastWord = word
    }
}

export const Dictionary = () => {
    
    const [voiceState, setVoiceState] = useState("");
    useEffect(()=>{
        if(voiceState!==""){
            SpeakWords(voiceState)
        }
    }, [voiceState])
    
    

    const dictionaryData = useSelector(
        (state: IRootState) => state.auth.dictionaryData.dictionary
    );
    const dictionaryIsLoading = useSelector(
        (state: IRootState) => state.auth.dictionaryData.isLoading
    )
    console.log(dictionaryIsLoading)
    return (
        <>
        { dictionaryIsLoading ? 
            <Loader /> :  
            <Page header={<Header>Словарь</Header>} className={Style.page}>
                {dictionaryData?.map(({_id, word, transcription, translation}) => (
                    <Card key={_id} word={word} transcription={transcription} translation={translation} setState={setVoiceState} />
                ))}
            </Page>
        }
        </>
        
    )
}
