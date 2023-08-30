import stylesScss from "./headerauth.module.scss";
import { Button, Logo } from "../../../../atoms";
import { useNavigate } from "react-router-dom";

const HeaderAuth = (): JSX.Element => {

  const navigate = useNavigate();

  return (
    <div className={stylesScss.headerAuth}>
      <Logo size="sm" theme="dark" />
      <Button
        size="sm"
        type="terciary"
        onClick={() => navigate("/register", { replace: true })}
      >
        Crear cuenta
      </Button>
    </div>
  )
}

export default HeaderAuth;