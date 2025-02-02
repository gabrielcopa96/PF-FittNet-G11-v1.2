import React from "react";
// import PartnerCard from "../PartnerCard/PartnerCard";
import styles from "./style/PartnerCards.module.css";
import { useSelector } from "react-redux";

export default function PartnerCards() {
  const partners = useSelector((state) => state.partners);

  return (
    <div className={styles.mainBoxCards2}>
      <div className={styles.boxCards2}>
        <h3 style={{ color: "#fff", textAlign: "center", fontSize: "1.6rem" }}>
          Nuestros Socios Comerciales
        </h3>
        <table className={styles.tableCards2}>
          <thead className={styles.headCards2}>
            <tr>
              <th>Type</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Id de cuenta</th>
            </tr>
          </thead>
          <tbody>
            {partners.length
              ? partners.map((u) => {
                  return (
                    <tr key={u.id}>
                      <td key={`1${u.id}`}>{u.type ? u.type : null}</td>
                      <td key={`2${u.id}`}>{u.name ? u.name : null}</td>
                      <td key={`3${u.id}`}>{u.userName ? u.userName : null}</td>
                      <td key={`4${u.id}`}>{u._id ? u._id : null}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div style={{width: "90%", margin: "1.2rem auto"}}>
          <h4 style={{ color: "#fff" }}>
            La app cuenta actualmente con{" "}
            <span style={{ color: "var(--color-primD1)" }}>
              {partners.length}
            </span>{" "}
            clientes empresa registrados
          </h4>
        </div>
      </div>
    </div>
  );
}
