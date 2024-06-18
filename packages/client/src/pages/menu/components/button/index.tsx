import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "./button.scss"

type MyForm = {}
type MoreButton = {
    additionalClass:string
    text:string
    action:Function
}

export const ButtonComponent = (props:MoreButton) => {
 
    const { handleSubmit} = useForm<MyForm>({
        defaultValues: {},
        mode: "onChange",
    })
    const navigate = useNavigate()

    const submit: SubmitHandler<MyForm> = async () => {
        props.action()
        navigate("")
    }

    return (
        <div className="more-btn">
            <form onSubmit={handleSubmit(submit)}>
                <button type="submit" className={"more-btn__button "+props.additionalClass}>
                    {props.text}
                </button>
            </form>
        </div>
    )
}
