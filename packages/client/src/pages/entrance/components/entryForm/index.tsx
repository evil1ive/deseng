import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "./entryFrom.scss"
import { IRootState, useAppDispatch } from "store/index"
import { loginUser, registrateUser } from "store/auth/actionCreators"
import { useSelector } from "react-redux"
type MyForm = {
    login: string
    password: string
}

export const EntryForm = () => {
    const [formName, setFormName] = useState("form")
    const isLoggedIn = useSelector(
        (state: IRootState) => state.auth.authData
    );
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MyForm>({
        defaultValues: {},
        mode: "onChange",
    })
    const navigate = useNavigate()

    const submit: SubmitHandler<MyForm> = async (values) => {
      
        if (formName === "form registrate") {
            await dispatch(registrateUser({ login:values.login, password:values.password }))
            navigate("")
        } else {
            await dispatch(loginUser({ login:values.login, password:values.password }))
            navigate("")
        }
    }

    return (
        <div className={"form-wrapper"}>
            <form onSubmit={handleSubmit(submit)}>
                <label className="" htmlFor="login">
                    {formName.includes("registrate") ? "Регистрация" : "Авторизация"}
                </label>
                <div className={errors.login?.type}>
                    <input
                        className={"login " + errors.login?.type}
                        type="login"
                        placeholder="Логин"
                        id="login"
                        {...register("login", {
                            required: true,
                            maxLength: 50,
                            minLength: 3,
                            validate: (fieldValue) => {
                                return fieldValue.search(/\W/) !== -1 ? "pattern" : true
                            },
                        })}
                    />
                </div>
                <div className={errors.password?.type}>
                    <input
                        className={"password " + errors.password?.type}
                        type="password"
                        placeholder="Пароль"
                        {...register("password", {
                            required: true,
                            maxLength: 50,
                            minLength: 3,
                            validate: (fieldValue) => {
                                return fieldValue.search(/\W/) !== -1 ? "pattern" : true
                            },
                        })}
                        autoComplete="on"
                    />
                </div>

                <div className="form-wrapper__buttons">
                    <button className={"submit-button"}>
                        {formName.includes("registrate") ? "Зарегистрироваться" : "Войти"}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setFormName(formName === "form registrate" ? "form" : "form registrate")
                        }}
                        className={"button"}
                    >
                        {formName.includes("registrate") ? "Авторизация" : "Регистрация"}
                    </button>
                </div>
                <label className="request-status">
                    {isLoggedIn.message === "Network Error"
                        ? "Проблемы с сетью"
                        : isLoggedIn.message === "User with this login already exists"
                          ? "Данный логин занят"
                          : isLoggedIn.message === null? "": "Неверный логин или пароль" }
                </label>
            </form>
        </div>
    )
}
