import HeaderPage from "./HeaderPage.jsx";
import FooterPage from "./FooterPage.jsx";
import Form from "./Form.jsx";
import {useState} from "react";
import Game from "./Game.jsx";

const LoginPage = () => {
    const [isLogged, setIsLogged] = useState(false)

    if (isLogged)
        return <Game />
    return(
        <>
            <HeaderPage />
            <div className="login-form">
                <p>Fill the Form</p>
                <Form setIsLogged={setIsLogged} />
            </div>
            <FooterPage />
        </>
    );
}

export default LoginPage;