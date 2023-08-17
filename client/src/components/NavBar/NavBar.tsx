import { Button, Logo } from "../atoms";
import Link from "../atoms/Link/Link";
import { UserLogged } from "../molecules";
import stylesScss from "./navbar.module.scss";
import { useNavigate } from "react-router-dom";

export default function NavBar(): JSX.Element {

  const navigate = useNavigate();

  const idUser = localStorage.getItem("userId");

  return (
    <nav className={stylesScss.nav}>
      <Logo />
      <ul className={stylesScss.ul}>
        <Link onNavigate="/legendCe">Sos propietario? Unite!</Link>
        <Link onNavigate="/legendUf">Beneficios para miembros</Link>
        {idUser ? (
          <UserLogged />
        ) : (
          <Button
            onClick={() => navigate("/register", { replace: true })}
            size="md"
            effect="slide"
            variant="ghost"
          >
            Prueba gratis
          </Button>
        )}
      </ul>
    </nav>
  );
}
