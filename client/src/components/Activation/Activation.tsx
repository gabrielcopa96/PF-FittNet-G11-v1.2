import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module './styles/style.Activation.modu... Remove this comment to see the full error message
import style from "./styles/style.Activation.module.css";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
// @ts-expect-error TS(2307): Cannot find module '../../asets/icons/check-circle... Remove this comment to see the full error message
import check from "../../asets/icons/check-circle.svg";

export default function Activation() {
  const { userId, secretToken } = useParams();

  useEffect(() => {
    // verifico el largo del id y el token andes de ejecutar el get al back
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("se ejecuta el useEffect");
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (userId.length > 9 && secretToken.length > 5) {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("sale el get al back");
      axios
        .get(`/api/service/activation/${userId}/${secretToken}`)
        .then((response) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(response.data);
        })
        .catch((error) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.lgo(error);
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
