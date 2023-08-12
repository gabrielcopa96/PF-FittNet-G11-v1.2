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
import style from "./styles/style.module.css";
import { ButtonHomePA } from "../../../helpers/Buttons/Buttons";

export default function HomeAdmin(): JSX.Element {
  const [view, setView] = useState("finances");

  const dispatch = useDispatch();

  let { userId } = useParams();

  // Necesito una barra de búsqueda con filtros
  useEffect(() => {
    dispatch((getAllSales(userId) as any))
    dispatch((getAllPartners() as any));
    dispatch((getAllUsers() as any));
    dispatch((getLockAccounts() as any));// eslint-disable-next-line
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
          {view === "deleteAccount" && <DeteleteAccount />}
          {view === "blockAccount" && <BlockAccount />}
        </div>
      </div>
    </div>
  );
}
