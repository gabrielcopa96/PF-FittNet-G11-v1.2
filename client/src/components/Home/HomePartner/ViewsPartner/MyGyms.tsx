import React from "react";
import { useSelector } from "react-redux";
// @ts-expect-error TS(2307): Cannot find module './styles/mygym.module.css' or ... Remove this comment to see the full error message
import styles from "./styles/mygym.module.css";
import { CardGymPartner } from "../../../../helpers/Cards/Cards.jsx";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../redux/actions";
// import { EditMyGyms } from "../ViewsPartner/EditMyGyms";

export function MyGyms() {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userPartner = useSelector((state) => state.myGyms);

  let { userId } = useParams()
  const dispatch = useDispatch();

  useEffect(()=>{
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getUser(userId))
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log('refrezco el estado user', userId)

  }, [userId])
  


//   const [view, setView] = useState("myGyms")  
  
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("userPartner", userPartner);

  return (
    <div className={styles.containMainMyGyms}>
      <div className={styles.headerMyGyms}>
        <h2 style={{ color: "#fff" }}>Mis gimnasios</h2>
        {/* <div className={styles.listBtn}>
          <span className={styles.titleBtn}>Crear gimnasio</span>
        </div> */}
      </div>
      <div className={styles.mainMyGym}>
        {/* <CardGymPartner/> */}
        {userPartner && userPartner.gyms?.length > 0 ? (
          userPartner.gyms.map((x: any, y: any) => (
            <CardGymPartner
              title={x.name}
              id={x._id}
              image={x.image}
              price={x.price.$numberDecimal}
              trainers={x.trainers}
              email={x.email}
              phone={x.phone}
              favorito={x.favourite}
              key={y}
            />
          ))
        ) : (
          <h2 style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>
            No cuenta con gimnasios
          </h2>
        )}
      </div>
    </div>
  );
}
