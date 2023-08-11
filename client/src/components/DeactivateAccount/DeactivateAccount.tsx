import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
// @ts-expect-error TS(2307): Cannot find module './styles/styleDesactive.module... Remove this comment to see the full error message
import style from "./styles/styleDesactive.module.css";

export default function DeactivateAccount() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userId } = useParams();

  function onChange(e: any) {
    setPassword(e.target.value);

    if (password.length < 2) {
      // Regex que quramos
      setError(
        "Necesita introducir su contraseña para continuar con el proceso"
      );
    } else {
      setError("");
    }
  }

  function onSubmit(e: any) {
    e.preventDefault();

    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (userId.length > 3 && password && !error) {
      let object = { userId, password };

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(object, "lo que sale el get al back");

      axios
        .put(`/api/service/deleteuseraccount/`, object)
        .then((response) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(response.data);
          SweetAlrt("Exito!", response.data, "success");
          // window.alert(response.data)
          // @ts-expect-error TS(2304): Cannot find name 'window'.
          return (window.location = "http://localhost:3000/");
        })
        .catch((error) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.lgo(error);
        });
      setPassword(""); // limpio el estado
    }
  }

  return (
    <div className={style.container}>
      <div className={style.screen}>
        <div className={style.screenContent}>
          <form className={style.login}>
            <div className={style.texto}>
              <p>
                Para borrar su cuenta por favor introdusca su contraseña y dé
                click en confirmar.
              </p>
            </div>
            <div className={style.contInput}>
              <InputPrymary
                type="password"
                value={password}
                name="password"
                placeholder="Password"
                required
                onChange={(e: any) => onChange(e)}
              />
              {/* Bloque button */}
              <InputSecond
                type="submit"
                value="Confirmar"
                onClick={(e: any) => onSubmit(e)}
              />
            </div>
            {error ? (
              <div className={style.errors}>
                <h3>{error}</h3>
              </div>
            ) : null}
          </form>
          {/* Bloque de background */}
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
