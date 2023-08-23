import { useSelector } from "react-redux";
import styles from "./styles/mygym.module.css";
import { CardGymPartner } from "../../../../helpers/Cards/Cards";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../redux/actions";

export function MyGyms(): JSX.Element {
  const userPartner = useSelector((state: any) => state.myGyms);

  let { userId } = useParams()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch((getUser(userId) as any))
  }, [userId])

  return (
    <div className={styles.containMainMyGyms}>
      <div className={styles.headerMyGyms}>
        <h2 style={{ color: "#fff" }}>Mis gimnasios</h2>
        <div className={styles.listBtn}>
          <span className={styles.titleBtn}>Crear gimnasio</span>
        </div>
      </div>
      <div className={styles.mainMyGym}>
        <CardGymPartner/>
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
