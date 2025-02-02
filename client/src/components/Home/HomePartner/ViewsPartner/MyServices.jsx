import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMyGyms } from "../../../../redux/actions";
import { useEffect, useState } from "react";
import styles from "./styles/mygym.module.css";

export function MyServices() {
  const gyms = useSelector((state) => state.myGyms);
  let myGyms = gyms.gyms ? gyms.gyms : [];

  const [myServices, setMyServices] = useState([]);

  let userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  let filterByGym = [];

  useEffect(() => {
    dispatch(getMyGyms(userId));
  }, [userId]);

  function getGyms(e) {
    dispatch(getMyGyms(userId));
  }
  function handleChangeGym(e) {
    e.preventDefault();
    let gymId = e.target.value;

    if (gymId !== "...") {
      filterByGym = myGyms && myGyms.filter((e) => e._id === gymId);

      setMyServices(filterByGym[0].services);

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
              ? myGyms.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))
              : null}
          </select>
          {myServices.length > 0
            ? myServices.map((e) => (
                <p key={e._id}>
                  {" "}
                  {e.name}, {e._id}, {e.description}
                </p>
              ))
            : null}
        </div>
      </div>
  );
}
