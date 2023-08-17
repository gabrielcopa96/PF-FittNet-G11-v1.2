import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { SweetAlrt } from "../../utils/sweetalert";
import {
  BackgroundOne,
  BackgroundTwo,
} from "../../helpers/Backround/Background";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import style from "./styles/styleDesactive.module.css";

export default function DeactivateAccount(): JSX.Element {
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

    if ((userId as any).length > 3 && password && !error) {
      let object = { userId, password };

      axios
        .put(`/api/service/deleteuseraccount/`, object)
        .then((response) => {
          console.log(response.data);
          SweetAlrt("Exito!", response.data, "success");
          return ((window.location as Location | string) = "http://localhost:3000/");
        })
        .catch((error: any) => {
          console.log(error);
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
