import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { ButtonSecondaryDeslice } from "../../../helpers/Buttons/Buttons.jsx";

// @ts-expect-error TS(2307): Cannot find module '../styles/Landing.module.css' ... Remove this comment to see the full error message
import styles from "../styles/Landing.module.css";


//? ESTE ES MI CARD DEL PACK BALANCE CARE
export const CardPromoBalance = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.promoBalance}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h2 className={styles.balanceTitulo}>Pack Balance Care</h2>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <ul className={styles.balanceLista}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Planes de dieta
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Clases de gimnasia indoor
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Entrenamiento de pesas y maquinas
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Entrenamiento de artes marciales
        </li>
      </ul>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h2>$6000/mensual</h2>
    </div>
  );
};

//? ESTE ES MI CARD DEL PACK PRO BULK
export const CardPromoBulk = () => {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.promoBulk}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h2 className={styles.bulkTitulo}>Pack Pro Bulk</h2>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <ul className={styles.bulkLista}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Pack Balance Care +
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Seguimiento personalizado
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Clases premium: pilates, yoga, spa room
        </li>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <li>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span>&bull;</span>Suplementos
        </li>
      </ul>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h2>$9000/mensual</h2>
    </div>
  );
};

export const PortadaFittnet = () => {

  const navigate = useNavigate();

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const name = localStorage.getItem("name");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const idUser = localStorage.getItem("userId");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.contPrim}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.contElempadre}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.contElem}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.contText}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <h1>
              La red de los mejores gimnasios acompañandote durante todo el
              proceso de cambio
            </h1>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <br />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <br />
            {!idUser ? (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <Link to="/login">
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <button className={styles.btn}>Empezá aquí</button>
              </Link>
            ) : avatar ? (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() =>
                  navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
                }
              />
            ) : (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <ButtonSecondaryDeslice
                title="Ir a home"
                padding="1.1rem 5rem"
                onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
              />
            )}
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={`${styles.screenBackground}`}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeTop1}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeButtom1}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeTop2}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeButtom2}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeTop3}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeButtom3}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeTop4}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.shapeButtom4}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {

  const navigate = useNavigate();

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.user);

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const name = localStorage.getItem("name");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const idUser = localStorage.getItem("userId");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");

  const styleH1 = {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: "40px",
    marginTop: "5rem",
  }
  
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={ styles.hero }>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h1 style={ styleH1 }>El cambio empieza dentro tuyo</h1>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h1 className={styles.texto}>FITTNET</h1>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div style={{ marginBottom: "6rem" }}>
        {!idUser ? (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ButtonSecondaryDeslice
            padding="1.5rem 5rem"
            title="Empeza aqui"
            onClick={() => navigate("/login")}
          />
        ) : user.avatar ? (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ButtonSecondaryDeslice
            title="Ir a home"
            padding="1rem 5rem"
            onClick={() =>
              navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
            }
          />
        ) : (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ButtonSecondaryDeslice
            title="Ir a home"
            padding="1.1rem 5rem"
            onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
          />
        )}
      </div>
  </div>
  )
}