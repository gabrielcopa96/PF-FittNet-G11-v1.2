import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyGyms } from "../../../../redux/actions";
import { useEffect, useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './styles/mygym.module.css' or ... Remove this comment to see the full error message
import styles from "./styles/mygym.module.css";

export function MyServices() {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gyms = useSelector((state) => state.myGyms);
  let myGyms = gyms.gyms ? gyms.gyms : [];

  const [myServices, setMyServices] = useState([]);

  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log(myGyms, "mis gyms");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  let filterByGym = [];

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMyGyms(userId));
  }, [userId]);

  function getGyms(e: any) {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMyGyms(userId));
  }
  function handleChangeGym(e: any) {
    e.preventDefault();
    let gymId = e.target.value;
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(gymId, "el id del gym");

    if (gymId !== "...") {
      filterByGym = myGyms && myGyms.filter((e: any) => e._id === gymId);

      setMyServices(filterByGym[0].services);

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(filterByGym, "luego del filtro");
    }
  }

  // Cuando se selecciona un gym se filtra la infor relacionada a ese gym
  // luego se renderizam los servicios asociados a ese gym y se los renderiza
  // Esta info (cada servicio) se puede enviar por props a otras cards

  return (
    <div
      style={{
        color: "white",
        width: "32%",
        margin: "0 auto",
        backgroundColor: "#2c2c2c65",
        borderRadius: ".6rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.9rem",
        alignItems: "center",
        textAlign: "center",
        marginTop: "1.2rem",
      }}
    >
      <button onClick={(e) => getGyms(e)} className={styles.btnService}>
        Actualizar
      </button>
      <h3>Mis servicios</h3>
      <div>
        <label style={{ marginRight: ".4rem" }}>
          <strong>*</strong>Gimnasio:{" "}
        </label>
        <select
          style={{
            border: "none",
            backgroundColor: "var(--color-primD1)",
            borderRadius: ".6rem",
            color: "#fff",
            padding: ".2rem 1rem",
            cursor: "pointer",
          }}
          onChange={(e) => handleChangeGym(e)}
        >
          <option key="id4">...</option>
          {myGyms.length > 0
            ? myGyms.map((g: any) => <option key={g._id} value={g._id}>
            {g.name}
          </option>)
            : null}
        </select>
        {myServices.length > 0
          ? myServices.map((e) => (
              // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
              <p key={e._id}>
                {" "}
                // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
                {e.name}, {e._id}, {e.description}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}
