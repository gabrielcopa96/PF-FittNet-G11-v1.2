import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
// @ts-expect-error TS(2307): Cannot find module './styles/stylePasword.module.c... Remove this comment to see the full error message
import style from "./styles/stylePasword.module.css";
import { InputPrymary, InputSecond } from "../../helpers/Inputs/Inputs";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../helpers/Backround/Background";

// Esta es la ruta del back que podemos usar
// router.post('/updatepassword', async (req, res, next) => {
// if (userId && newPassword && password && !secretToken) { // Actualizo una vieja contraseña
// if (userId && newPassword && !password && secretToken) { // Seteo un nueva contraseña
// if (userId && !newPassword && !password && !secretToken) { // Reinicio la contraseña

// Voy a entrar en el primer if de arriba
// Esto es lo que le voy a envíar desde el front
// let form = {
//   userId: userId,
//   password: password,
//   newPassword: newPassword
// }
export default function UpdatePasword() {
  // Esta función sirve para cuando alguien quiere actualizar su contraseña.
  let { userId } = useParams();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [copyNewPassword, setCopyNewPassword] = useState("");
  // const [error, setError] = useState("");

  // Falta setear errores según la validación que queramos
  function onSubmit(e: any) {
    e.preventDefault();
    if (userId && password && newPassword && copyNewPassword) {
      // if ( userId && password && newPassword && copyNewPassword && !error) {
      if (newPassword === copyNewPassword && newPassword !== password) {
        let formUpdate = {
          userId: userId,
          password: password,
          newPassword: newPassword,
        };
        // Enviar formulario luego de esta línea
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(formUpdate, "se envía el formulario");

        axios
          .post("/api/service/updatepassword", formUpdate)
          .then((response) => {
            // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
            console.log(response.data);
            // window.alert(response.data)
            // @ts-expect-error TS(2554): Expected 3 arguments, but got 4.
            SweetAlrt("Exito!", response.data, "success", true);
            // @ts-expect-error TS(2304): Cannot find name 'window'.
            return (window.location = "http://localhost:3000/login");
          })
          .catch((error) => {
            // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
            console.log(error);
          });

        // Acá iría la petición con axios donde se manda el form a la ruta de actualización
        // window.alert('Contraseña actualizada')
        // return (window.location = "http://localhost:3000/login");
      } else {
        SweetAlrt(
          "Atencion",
          "Verifique los datos del formulario",
          "warning",
          // @ts-expect-error TS(2554): Expected 3 arguments, but got 4.
          true
        );
        // window.alert("Verifique los datos del formulario");
      }
    } else {
      SweetAlrt(
        "Atencion",
        "Verigique los datos del formulario",
        "error",
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 4.
        true
      );
      // window.alert("Verifique los datos del formulario");
      //setError("Verifique los datos del formulario");
    }
  }

  return (
    <div className={style.container}>
      <div className={style.screen}>
        <div className={style.screenContent}>
          <form className={style.login}>
            {/* Bloque inputs */}
            <InputPrymary
              type="password"
              value={password}
              name="password"
              placeholder="Old password"
              required
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={newPassword}
              name="passwnewPasswordord"
              placeholder="New password"
              required
              onChange={(e: any) => setNewPassword(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={copyNewPassword}
              name="copyNnewPassword"
              placeholder="New password"
              required
              onChange={(e: any) => setCopyNewPassword(e.target.value)}
            />
            {/* Bloque button */}
            <InputSecond
              type="submit"
              value="Confirmar"
              onClick={(e: any) => onSubmit(e)}
            />
          </form>
          {/* Bloque de background */}
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
