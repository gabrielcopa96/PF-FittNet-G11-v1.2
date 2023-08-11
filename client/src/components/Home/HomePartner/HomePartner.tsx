import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerDetails, getMySales } from "../../../redux/actions";
import { MyGyms } from "./ViewsPartner/MyGyms";
import { MySales } from "./ViewsPartner/MySales";
import { MyClients } from "./ViewsPartner/MyClients";
import { Plans } from "./ViewsPartner/Plans";
import { EditMyGyms } from "./ViewsPartner/EditMyGyms";
import { MyServices } from "./ViewsPartner/MyServices";
import { EditMyServices } from "./ViewsPartner/EditMyServices";
import { getPartner } from "../../../redux/actions/index";

// @ts-expect-error TS(2307): Cannot find module './styles/style.module.css' or ... Remove this comment to see the full error message
import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";

export function HomePartner () {

  const dispatch = useDispatch()
  let { userId } = useParams();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userPartner = useSelector((state) => state.user); 

  useEffect(() => {
    if(Object.keys(userPartner).length === 0) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getPartner(userId))
    } // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMySales(userId))
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getPartnerDetails(userId));// eslint-disable-next-line
  }, []);

  const [ view , setView ] = useState("mySales");

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={style.content}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={style.contentH}>
        {/* Bloque de Button */}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.contButton}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonTop}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <p>{userPartner && userPartner.name}</p>
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonH1}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("plans");
              }}
              title="Planes y promociones"
            />
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonHg}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("mySales");
              }}
              title="Mis ventas"
            />
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonHg}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("myGyms");
              }}
              title="Mis gimnasios"
            />
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonHg}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("editMyGyms");
              }}
              title="Editar mis gimnasios"
            />
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonHg}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("myServices");
              }}
              title="Mis servicios"
            />
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.contButtonHg}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ButtonHomePA
              onClick={(e: any) => {
                setView("editMyServices");
              }}
              title="Editar mis servicios"
            />
          </div>
        </div>
        {/* Bloque de contenido */}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.contData}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "mySales" && <MySales />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "myClients" && <MyClients />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "plans" && <Plans />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "myGyms" && <MyGyms />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "editMyGyms" && <EditMyGyms />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "myServices" && <MyServices />}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          {view === "editMyServices" && <EditMyServices />}
        </div>
      </div>
    </div>
  );
}
