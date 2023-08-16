import style from "./styles/NavBar.module.css";
import {
  ButtonSimple,
  ButtonSecondarySimple,
} from "../../helpers/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export default function NavBar(): JSX.Element {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const idUser = localStorage.getItem("userId");

  return (
    <nav className={style.nav}>
      <div onClick={() => navigate("/")}>
        <img
          src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png"
          alt=""
          style={{
            width: "170px",
            height: "82px",
            marginLeft: "4rem",
            cursor: "pointer",
          }}
        />
      </div>
      <ul className={style.ul}>
        <ButtonSecondarySimple
          title="Sos propietario? Unite!"
          padding="0 2rem"
          onClick={() => navigate("/legendCe", {
            replace: true
          })}
        />
        <ButtonSecondarySimple
          onClick={() => navigate("/legendUf", {
            replace: true
          })}
          title="Beneficios para miembros"
          padding="0 2rem"
        />
        {idUser ? (
          <p style={{color: "#fff", fontSize: "1.3rem"}}>{name} ya estas registrado!</p>
        ) : (
          <ButtonSimple
            title="Prueba gratis"
            onClick={() => navigate("/register", {
              replace: true
            })}
            padding="0 2rem"
          />
        )}
      </ul>
    </nav>
  );
}
