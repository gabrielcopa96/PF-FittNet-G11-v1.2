import Google from "../Google/Google";
import stylesScss from "./formauth.module.scss";
import { useHandleLogin } from "../../hooks/useHandleLogin";
import { Button } from "../../../../atoms";
import InputEmail from "../../../../atoms/InputEmail/InputEmail";
import InputPassword from "../../../../atoms/InputPassword/InputPassword";

const FormAuth = (): JSX.Element => {

    const { username, password, handleLogin } = useHandleLogin();

    return (
        <div className={stylesScss.form}>
            <InputEmail
                value={username.get}
                placeholder="Escriba su email..."
                onChange={(e: any) => username.set(e.target.value)}
            />

            <InputPassword
                value={password.get}
                placeholder="Escriba su clave..."
                onChange={(e: any) => password.set(e.target.value)}
            />

            <Button
                type="terciary"
                size="sm"
                width="w-xl"
                onClick={() => handleLogin()}
            >
                Ingresar
            </Button>

            <Google />

            <Button
                type="secondary"
                effect="slide"
                size="sm"
            >
                Olvidé mi contraseña
            </Button>
        </div>
    )
}

export default FormAuth;