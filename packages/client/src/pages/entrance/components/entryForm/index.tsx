import { FC, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserProps } from "pages/entrance"
import data from "../../../../assets/data/data.json"
import { genSaltSync, hashSync } from "bcrypt-ts"

import "./entryFrom.scss"

type MyForm = {
    login: string
    password: string
}

export const EntryForm: FC<UserProps> = (props) => {
    const [formName, setFormName] = useState("form")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MyForm>({
        defaultValues: {},
        mode: "onChange",
    })
    const [fetchError, setFetchError] = useState("none")
    const navigate = useNavigate()

    const submit: SubmitHandler<MyForm> = async (values) => {
        console.log(data)
        setFetchError("none")
        console.log(formName, fetchError, values)
        if (formName === "form registrate") {
            let isNewUser = data.users.every((elem) => {
                return elem.login === values.login ? false : true
            })

            if (isNewUser) {
                let salt = genSaltSync(10)
                let hash = hashSync(values.password, salt)
                data.users.push({
                    login: values.login,
                    hash: hash,
                    salt: salt,
                })
                data
                localStorage.setItem("userLogin", Date.now().toString())
                navigate("")
                props.setLogin(true)
            } else {
                setFetchError("user are created")
            }
        } else {
            let user = data.users.find((elem) => {
                if (elem.login === values.login) {
                    return true
                } else false
            })
            if (user != undefined) {
                let isUserAreCreated =
                    hashSync(values.password, user.salt) === user?.hash ? true : false
                if (isUserAreCreated) {
                    localStorage.setItem("userLogin", Date.now().toString())
                    props.setLogin(true)
                } else {
                    setFetchError("bad user")
                }
            } else {
                setFetchError("bad user")
            }
        }
    }
    return (
        <div className={"form-wrapper"}>
            <form onSubmit={handleSubmit(submit)}>
                <label className="">
                    {formName.includes("registrate") ? "Регистрация" : "Авторизация"}
                </label>
                <div className={errors.login?.type}>
                    <input
                        className={"login " + errors.login?.type}
                        type="login"
                        placeholder="Логин"
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
                    {fetchError === "bad user"
                        ? "Неверный логин или пароль"
                        : fetchError === "user are created"
                          ? "Данный логин занят"
                          : ""}
                </label>
            </form>
        </div>
    )
}
