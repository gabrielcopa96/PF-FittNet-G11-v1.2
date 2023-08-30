import { useNavigate } from "react-router-dom";
import stylesScss from "./headerregister.module.scss";
import { Button, Logo } from "../../../../atoms";

const HeaderRegister = () => {

    const navigate = useNavigate();

    return (
        <div className={stylesScss.headerAuth}>
            <Logo size="sm" theme="dark" />
            <Button
                size="sm"
                type="terciary"
                onClick={() => navigate("/register", { replace: true })}
            >
                Iniciar sesion
            </Button>
        </div>
    )
}

export default HeaderRegister