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
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gyms = useSelector((state) => state.gyms);
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log(orden)

  function handleChangeKm(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(e.target.value);
    dispatch(sortByPrice(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleChangeCateg(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(e.target.value);
    dispatch(filterByCategory(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }
  const categorys = gyms.map((e: any) => e.services.map((e: any) => e.name)).flat();
  const categ = new Set(categorys);
  let result = [...categ];
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  let ordenados = result.sort((a, b) => a.localeCompare(b));
  // console.log("Esto es en orderBy: ", ordenados);

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.sel}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <select className={styles.select} onChange={(e) => handleChangeKm(e)}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option>Distancia</option>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="menor">-1 Kilometro</option>
        {/* <option value="mayor">+1 Kilometro</option> */}
      </select>

      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <select className={styles.select} onChange={(e) => handleChangePunt(e)}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option>Puntuacion</option>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="ascendente">1 - 5</option>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="descendente">5 - 1</option>
      </select>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <select className={styles.select} onChange={(e) => handleChangeCateg(e)}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="all">Categoria</option>
        {ordenados.map((e) => (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <option key={e} value={e}>
            // @ts-expect-error TS(2322): Type 'unknown' is not assignable to type 'ReactNod... Remove this comment to see the full error message
            {e}
          </option>
        ))}
      </select>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <select className={styles.select} onChange={(e) => handleChangePrecio(e)}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option>Precio</option>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="ascendente">Menor</option>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <option value="descendente">Mayor</option>
      </select>
    </div>
  );
}
