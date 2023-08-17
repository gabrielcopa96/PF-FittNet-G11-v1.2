import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/style.module.css";
import { SweetAlrt, SweetAlrtTem } from "../../../../utils/sweetalert";

export default function DeteleteAccount(): JSX.Element | undefined {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});

  async function getUserById(e: any) {
    e.preventDefault();
    if (userId.length > 5) {
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
        .catch((error) => console.log(error));

      console.log(getUser, "la respuesta del back");
      if (getUser === null) return SweetAlrtTem("Id no encontrado", "error");
      setUser(getUser);
    }
  }

  async function deteleUserById(e: any) {
    e.preventDefault();
    console.log((user as any)._id, "voy a borrar el user por id a la db");
    window.confirm(`Confirma que quiere eliminar el usuario ${(user as any).name}`);

    // Voy a tener que mandar headers
    // console.log("está saliendo el post ", userLogin);
    if (userId.length && (user as any)._id) {
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
        .catch((error) => console.log(error));

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

  if (!(user as any)._id) {
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

  if ((user as any)._id) {
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
                {(user as any).type ? (user as any).type : null}
                </span>
              </h4>
              <h4>
                  Nombre del usuario:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                {(user as any).name ? (user as any).name : null}
                </span>
              </h4>
              <h4>
                  Nombre de la cuenta:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                {(user as any).userName ? (user as any).userName : null}
                </span>
              </h4>
              <h4 style={{ paddingBottom: ".8rem" }}>
                  Id de cuenta:
                <span
                  style={{ color: "var(--color-primD2)", marginLeft: ".4rem" }}
                >
                {(user as any)._id ? (user as any)._id : null}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
