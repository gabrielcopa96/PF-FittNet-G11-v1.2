import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import style from "./styles/style.Activation.module.css";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
import check from "../../asets/icons/check-circle.svg";

export default function Activation(): JSX.Element {
  const { userId, secretToken } = useParams();

  useEffect(() => {
    // verifico el largo del id y el token andes de ejecutar el get al back
    console.log("se ejecuta el useEffect");
    if ((userId as any).length > 9 && (secretToken as any).length > 5) {
      axios
        .get(`/api/service/activation/${userId}/${secretToken}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [userId, secretToken]);

  return (
    <div className={style.container}>
      <div className={style.screen}>
        <div className={style.screenContent}>
          <div className={style.login}>
            <div className={style.cardIcons}>
              <img src={check} alt="" />
            </div>
            <div className={style.texto}>
              <p>Su cuenta ha sido activada con exito</p>
              <div className={style.containerReg}>
                <a href="/login" style={{ textDecoration: "none" }}>
                  Iniciar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
