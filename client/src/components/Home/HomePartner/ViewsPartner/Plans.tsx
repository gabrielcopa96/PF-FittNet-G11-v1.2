import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlans } from "../../../../redux/actions";
import axios from "axios";
import CheckOut from "./CheckOut";
import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './styles/mygym.module.css' or ... Remove this comment to see the full error message
import style from "./styles/mygym.module.css";
import { ButtonSimple } from "../../../../helpers/Buttons/Buttons";


export function Plans() {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const plan = useSelector((state) => state.plans);
  const dispatch = useDispatch();
  const [datos, setDatos] = useState("");
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const idPartner = useSelector((state) => state.user);

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getPlans());
  }, []);

  async function onSubmit(value: any) {
    let data: any = [];
    if (value === "Premium") {
      data = [plan[0], idPartner._id];
    }
    if (value === "Golden") {
      data = [plan[2], idPartner._id];
    }
    if (value === "Standar") {
      data = [plan[1], idPartner._id];
    }
    await axios({
      method: "post",
      url: "/api/service/mercadopago",
      data: data,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((data) => {
        setDatos(data.data);
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.info("contenido de data", data);
      })
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      .catch((err) => console.error(err));
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("todopiola");
  }

  return (
    <div>
      <div className={style.cont}>
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        {console.log(plan)}
        {plan.length
          ? plan.map((p: any) => {
              return (
                <div key={p.planName}>
                  <div className={style.cardright}>
                    <div className={style.plan}>
                      <p
                        style={{
                          fontSize: "46px",
                          padding: "20px",
                          textAlign: "center",
                        }}
                      >
                        {p.planName}
                      </p>
                      <ul>
                        <li>20% de visibilidad</li>
                        <li>Panel de control</li>
                        <li>Historial de ventas</li>
                        <li>Gestios de GYM</li>
                        <li>Gestios de servicios</li>
                        <li>incorporar hasta {p.gymsPermited} gym</li>
                        <li>incorporar hasta {p.servicePerGym} servicos</li>
                        <li>
                          Comision por venta: {p.commission.$numberDecimal}
                        </li>
                      </ul>
                      <p
                        style={{
                          fontSize: "36px",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      >
                        $ {p.price.$numberDecimal}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : "Cargando..."}
      </div>
      <div  style={{padding: "20px 0px 0px 0px ", display:"flex", justifyContent: "space-around"}}>
          <ButtonSimple
            title="Plan Premium"
            padding="0 1rem"
            onClick={() => onSubmit("Premium")}
          />
          <ButtonSimple
            title="Plan Standar"
            padding="0 1rem"
            onClick={() => onSubmit("Standar")}
          />
          <ButtonSimple
            title="Plan Golden"
            padding="0 1rem"
            onClick={() => onSubmit("Golden")}
          />
        </div>

        {!datos ? <p>Aguarde un momento...</p> : <CheckOut data={datos} />}
      
    </div>
  );
}
