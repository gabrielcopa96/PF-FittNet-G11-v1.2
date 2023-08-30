import Google from "../Google/Google";
import stylesScss from "./formauth.module.scss";
import { useHandleLogin } from "../../hooks/useHandleLogin";
import { Button } from "../../../../atoms";
import InputEmail from "../../../../atoms/InputEmail/InputEmail";
import InputPassword from "../../../../atoms/InputPassword/InputPassword";

const FormAuth = (): JSX.Element => {

    const { username, password, error, handleLogin } = useHandleLogin();

    return (
        <div className={stylesScss.form}>

            {/* <InputPrymary
                type="email"
                value={username.get}
                name="email"
                placeholder="Email"
                required
                onChange={(e: any) => username.set(e.target.value)}
            /> */}
            <InputEmail
                value={username.get}
                onChange={(e: any) => username.set(e.target.value)}
            />

            {/* <InputPrymary
                type="password"
                value={password.get}
                name="password"
                placeholder="Contraseña"
                required
                onChange={(e: any) => password.set(e.target.value)}
            /> */}
            <InputPassword
                value={password.get}
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