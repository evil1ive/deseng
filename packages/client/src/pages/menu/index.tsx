import { IRootState, useAppDispatch } from "store/index"
import { logoutUser } from "store/auth/actionCreators"
import { useSelector } from "react-redux"
import { ButtonComponent } from "./components/button"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/header"
import { Page } from "../../components/page"

import { Footer } from "./components/Footer"
import "./menu.scss"

export const MenuPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useSelector(
        (state: IRootState) => state.auth.userData
    );
    const Logout = () => {
        dispatch(logoutUser())
        navigate("");
    }

    const DeleteUser = () => {
       // роут удаления пользователя
        navigate("");
    }

    return (
        <Page header={<Header>Меню</Header>} className="page" >
            <p className="username">{"Пользователь: " + userData.user}</p>    
            <ButtonComponent additionalClass="" text="Выйти" action={Logout}/>
            <ButtonComponent additionalClass="delete" text="Удалить аккаунт" action={DeleteUser}/>
            <Footer />
        </Page>
    )
}
