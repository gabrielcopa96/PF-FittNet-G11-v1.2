import { useState } from "react";
import { useDispatch } from "react-redux";
// @ts-expect-error TS(2307): Cannot find module './styles/Search.module.css' or... Remove this comment to see the full error message
import styles from "./styles/Search.module.css";
import {  getSearch } from "../../redux/actions";


export default function Sarch(): JSX.Element {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInput(e: any) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(getSearch(e.target.value));
  }


  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchImp}
          type="text"
          placeholder="Buscar..."
          onChange={(e) => handleInput(e)}
        />
      
      </div>
    </div>
  );
}

