import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getLockAccounts } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SweetAlrt, SweetAlrtTem } from "../../../../asets/helpers/sweetalert";
// @ts-expect-error TS(2307): Cannot find module '../styles/style.module.css' or... Remove this comment to see the full error message
import styles from "../styles/style.module.css";

// @ts-expect-error TS(2591): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { regexEmail } = require("../../../../asets/helpers/regexValidators");

// Necesito un form con un input, un botón de agregar y otro de quitar
// Necesito una lista los correos baneados

export default function BlockAccount() {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const lockAccounts = useSelector((state) => state.lockAccounts);
  const dispatch = useDispatch();

  let [userName, setUserName] = useState("");
  let [error, setError] = useState("");
  let [submit, setSubmit] = useState(true);

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getLockAccounts());
    setSubmit(false);
  }, [submit]);

  async function addLockAccount(e: any) {
    e.preventDefault();
    if (userName && !error) {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("trato de agregar la cuenta", userName);
      // le paso la solicitud al back para agrerar la cuenta
      const addAccount = await axios({
        method: "put",
        url: "/api/admin/lockaccounts",
        data: { userName: userName },
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(res.data);
          if (res.data === null) {
            return SweetAlrtTem(
              `No puede agregar dos veces la misma cuenta.`,
              "warning"
            );
          }
          SweetAlrt(
            "Exito!",
            `Cuenta ${res.data.userName} agregada con éxito.`,
            "success"
          );
          setSubmit(true);
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));
    }
  }

  async function removeLockAccount(e: any) {
    e.preventDefault();
    if (userName && !error) {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("trato de quitar la cuenta", userName);
      // le paso la solicitud al back para remover a cuenta
      const removeAccount = await axios({
        method: "delete",
        url: "/api/admin/lockaccounts",
        data: { userName: userName },
        headers: { "X-Requested-With": "XMLHttpRequest" },
        // withCredentials: true,
      })
        .then((res) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(res.data);
          if (res.data === null) {
            return SweetAlrtTem(`Cuenta inexistente.`, "info");
          }
          SweetAlrt(
            "Exito!",
            `Cuenta ${res.data.userName} quitada con éxito.`,
            "success"
          );
          setSubmit(true);
        })
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        .catch((error) => console.log(error));
    }
  }

  function onChange(e: any) {
    setUserName(e.target.value);
    if (!regexEmail.test(e.target.value)) {
      setError("Este campo debe contener un email");
    } else {
      setError("");
    }
  }

  // console.log(lockAccounts, 'correos bloqueados en la app')
  return (
    <div className={styles.containerMainBlockAccount}>
      <h3
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: ".7rem",
          fontSize: "1.45rem",
        }}
      >
        Inhabilitación de cuenta
      </h3>
      <p style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
        Pendiente: el registro y login con terceros
      </p>

      <div className={styles.containerBodyBlockAccount}>
        <form style={{ padding: "10px" }} action="deleteUser">
          <div>
            <p style={{ fontSize: "1.1rem", fontWeight: "700" }}>
              Email del usuario
            </p>
            <input
              type="text"
              value={userName}
              className={styles.inputBlockAccount}
              onChange={(e) => {
                onChange(e);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.2rem",
              gap: "1.8rem",
            }}
          >
            <button
              className={styles.btnBlockAccount}
              onClick={(e) => {
                addLockAccount(e);
              }}
            >
              Agregar
            </button>
            <button
              className={styles.btnBlockAccount}
              onClick={(e) => {
                removeLockAccount(e);
              }}
            >
              Quitar
            </button>
          </div>
        </form>
      </div>
      <div className={styles.listBlockeados}>
        {lockAccounts.length
          ? lockAccounts.map((c: any) => {
              return <li style={{borderBottom: "1px solid var(--color-primD1)", marginBottom: ".5rem", listStyle: "none"}} key={c}>{c.userName}</li>;
            })
          : null}
      </div>
    </div>
  );
}
