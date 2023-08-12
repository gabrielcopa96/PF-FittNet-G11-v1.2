import { useDispatch } from "react-redux";
import {
  filterByCategory,
  sortByDistance,
  sortByPrice,
  sortByQualification,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @ts-expect-error TS(2307): Cannot find module './styles/OrderBy.module.css' o... Remove this comment to see the full error message
import styles from "./styles/OrderBy.module.css";


export default function OrderBy() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortByDistance("menor"))// eslint-disable-next-line
  },[])

  const [orden, setOrden] = useState("");
  const gyms = useSelector((state: any) => state.gyms);
  console.log(orden)

  function handleChangeKm(e: any) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(sortByDistance(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleChangePunt(e: any) {
    e.preventDefault();
    dispatch(sortByQualification(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleChangePrecio(e: any) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(sortByPrice(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleChangeCateg(e: any) {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(filterByCategory(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  const categorys = gyms.map((e: any) => e.services.map((e: any) => e.name)).flat();
  const categ = new Set(categorys);
  let result = [...categ];
  let ordenados = result.sort((a: any, b) => a.localeCompare(b));
  // console.log("Esto es en orderBy: ", ordenados);

  return (
    <div className={styles.sel}>
      <select className={styles.select} onChange={(e) => handleChangeKm(e)}>
        <option>Distancia</option>
        <option value="menor">-1 Kilometro</option>
        {/* <option value="mayor">+1 Kilometro</option> */}
      </select>

      <select className={styles.select} onChange={(e) => handleChangePunt(e)}>
        <option>Puntuacion</option>
        <option value="ascendente">1 - 5</option>
        <option value="descendente">5 - 1</option>
      </select>
      <select className={styles.select} onChange={(e) => handleChangeCateg(e)}>
        <option value="all">Categoria</option>
        {ordenados.map((e: any) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
      <select className={styles.select} onChange={(e) => handleChangePrecio(e)}>
        <option>Precio</option>
        <option value="ascendente">Menor</option>
        <option value="descendente">Mayor</option>
      </select>
    </div>
  );
}
