import React from "react";
import Finances from "./ViewsAdmin/Finances";
import Partners from "./ViewsAdmin/Partners";
import Users from "./ViewsAdmin/Users";
import DeteleteAccount from "./ViewsAdmin/DeleteAccount";
import BlockAccount from "./ViewsAdmin/BlockAccount";
import SearchComponent from "./SearchComponent/SearchComponent";
import { useDispatch } from "react-redux";
import { getAllPartners, getAllSales, getAllUsers } from "../../../redux/actions";
import { useEffect } from "react";
import { getLockAccounts } from "../../../redux/actions";
import { useState } from "react";
import { useParams } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module './styles/style.module.css' or ... Remove this comment to see the full error message
import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";

export default function HomeAdmin() {
  const [view, setView] = useState("finances");

  const dispatch = useDispatch();

  let { userId } = useParams();

  // Necesito una barra de búsqueda con filtros
  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getAllSales(userId))
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getAllPartners());
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getAllUsers());
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getLockAccounts());// eslint-disable-next-line
  }, [userId]);

  return (
    <div className={style.content}>
      <div className={style.contentH}>
        {/* Bloque de Button */}
        <div className={style.contButton}>
          <div className={style.contButtonTop}>
            <p>ADMIN</p>
          </div>

          <div className={style.contButtonH1}>
            <ButtonHomePA
              onClick={(e: any) => {
                setView("finances");
              }}
              title="Finanzas"
            />
          </div>

          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e: any) => {
                setView("partners");
              }}
              title="Partner"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e: any) => {
                setView("users");
              }}
              title="Users"
            />
          </div>
          {/* <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("viewPartner");
              }}
              title="Vista Partner"
            />
          </div> */}
          {/* <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e) => {
                setView("viewUser");
              }}
              title="Vista User"
            />
          </div> */}
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e: any) => {
                setView("blockAccount");
              }}
              title="Bloquear cuenta"
            />
          </div>
          <div className={style.contButtonHg}>
            <ButtonHomePA
              onClick={(e: any) => {
                setView("deleteAccount");
              }}
              title="Eliminar cuenta"
            />
          </div>
        </div>
        <div>
          <SearchComponent />
          {view === "finances" && <Finances />}
          {view === "partners" && <Partners />}
          {view === "users" && <Users />}
          {/* {view === "viewPartner" && <ViewPartner />} */}
          {/* {view === "viewUser" && <ViewUsers />} */}
          // @ts-expect-error TS(2786): 'DeteleteAccount' cannot be used as a JSX componen... Remove this comment to see the full error message
          {view === "deleteAccount" && <DeteleteAccount />}
          {view === "blockAccount" && <BlockAccount />}
        </div>
      </div>
    </div>
  );
}
