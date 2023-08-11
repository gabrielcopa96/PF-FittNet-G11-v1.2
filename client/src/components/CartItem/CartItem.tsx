import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions";
// @ts-expect-error TS(2307): Cannot find module './styles/style.module.css' or ... Remove this comment to see the full error message
import style from "./styles/style.module.css";

export default function CartItem({
  id,
  name,
  price,
  description,
  duration
}: any) {
  const dispatch = useDispatch();

  function handleClick(id: any) {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(addToCart(id));
  }

  function handleDelete(id: any) {    
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => void' is not ... Remove this comment to see the full error message
    dispatch(removeFromCart(id));
  }
  const styleTemp = {
    fontSize: '15px',
    
  }
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.box}>
          <div className={style.content}>
            <span>{duration} min</span>
            <h2>$ {price}</h2>
            <h3>{name}</h3>
            <p>{description.slice(0,150)} ...</p>
            <div className={style.contButton}>
              <button onClick={() => handleClick(id)}>+</button>
              <button onClick={() => handleDelete(id)}>-</button>
            </div> 
            {/* <a href="">Read More</a> */}
          </div>
        </div>
      </div>
      {/* <h3>Clase: {name}</h3>
      <h3>Precio: $ {price}</h3>
      <h3>Descripcion: {description}</h3>
      <h3>Duracion aproximada: {duration} minutos</h3>
      <div>
        <button onClick={() => handleClick(id)}>+</button>
      </div>
      <div>
        <button onClick={() => handleDelete(id)}>-</button>
      </div> */}
    </div>
  );
}
