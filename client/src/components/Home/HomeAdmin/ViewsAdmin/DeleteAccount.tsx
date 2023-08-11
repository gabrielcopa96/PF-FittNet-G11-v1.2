import React from "react";
import { useState } from "react";
import axios from "axios";
// @ts-expect-error TS(2307): Cannot find module '../styles/style.module.css' or... Remove this comment to see the full error message
import styles from "../styles/style.module.css";
import { SweetAlrt, SweetAlrtTem } from "../../../../asets/helpers/sweetalert";

// @ts-expect-error TS(7030): Not all code paths return a value.
export default function DeteleteAccount() {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});

  async function getUserById(e: any) {
    e.preventDefault();
    if (userId.length > 5) {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(userId, "voy a buscar el user por id a la db");
      // Voy a tener que mandar headers
      const getUser = await axios({
        method: "get",
        url: `/api/admin/userId/${userId}`,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(getUser, "la respuesta del back");
      if (getUser === null) return SweetAlrtTem("Id no encontrado", "error");
      // if (getUser.user === null) return window.alert('Id no encontrado')
      setUser(getUser);
    }
  }

  async function deteleUserById(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(user._id, "voy a borrar el user por id a la db");
    // @ts-expect-error TS(2304): Cannot find name 'window'.
    window.confirm(`Confirma que quiere eliminar el usuario ${user.name}`);

    // Voy a tener que mandar headers
    // console.log("está saliendo el post ", userLogin);
    // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
    if (userId.length && user._id) {
      const userDelete = await axios({
        method: "delete",
        url: "/api/admin/delete",
        data: { userId: userId },
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          return res.data;
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(userDelete, "si lo borra responde");
      if (userDelete === undefined)
        return SweetAlrtTem("No se pudo eliminar el usuario", "error");

      SweetAlrt(
        "Exito!",
        `${userDelete.name} ha sido eliminado con éxito`,
        "success"
      );
      setUserId("");
      setUser({});
    }
  }

  // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
  if (!user._id) {
    return (
      <div className={styles.mainDeleteAccount}>
        <h4
          style={{
            padding: "10px",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1.2rem",
          }}
        >
          Por favor indique el id de la cuenta a eliminar
        </h4>
        <form
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "1rem",
            justifyContent: "center",
            textAlign: "center",
            margin: "0 auto",
            alignItems: "center",
          }}
          action="deleteUser"
        >
          Id del usuario
          <input
            className={styles.inputElminated}
            type="text"
            value={userId}
            onChange={(e) => {
              // @ts-expect-error TS(2812): Property 'value' does not exist on type 'EventTarg... Remove this comment to see the full error message
              setUserId(e.target.value);
            }}
          />
          <button
            className={styles.btnElminated}
            onClick={(e) => {
              getUserById(e);
            }}
          >
            Taer usuario
          </button>
        </form>
        <h4
          style={{
            color: "var(--color-primD3)",
            textAlign: "center",
            margin: ".5rem auto",
            paddingBottom: ".6rem",
          }}
        >
          {userId ? userId : null}
        </h4>
      </div>
    );
  }

  // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
  if (user._id) {
    return (
      <div className={styles.mainDeleteAccount}>
        <h4
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: "1.3rem",
            fontWeight: "700",
            paddingTop: ".5rem",
            paddingBottom: ".5rem",
          }}
        >
          ¿Está seguro que desea eliminar la cuenta indicada?
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.8rem",
            margin: "2rem auto",
          }}
        >
          <button
            className={styles.btnElminated}
            onClick={(e) => {
              deteleUserById(e);
            }}
          >
            Eliminar usuario
          </button>
          <button
            className={styles.btnElminated}
            onClick={(e) => {
              setUser({});
              setUserId("");
            }}
          >
            Cancelar
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ paddingBottom: "15px", paddingTop: "15px" }}>
            Cuenta a eliminar
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "justify",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}
            >
              <h4>
                  Tipo de cuenta:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".5rem" }}
                >
                // @ts-expect-error TS(2339): Property 'type' does not exist on type '{}'.
                {user.type ? user.type : null}
                </span>
              </h4>
              <h4>
                  Nombre del usuario:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                {user.name ? user.name : null}
                </span>
              </h4>
              <h4>
                  Nombre de la cuenta:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                // @ts-expect-error TS(2339): Property 'userName' does not exist on type '{}'.
                {user.userName ? user.userName : null}
                </span>
              </h4>
              <h4 style={{ paddingBottom: ".8rem" }}>
                  Id de cuenta:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                // @ts-expect-error TS(2339): Property '_id' does not exist on type '{}'.
                {user._id ? user._id : null}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
