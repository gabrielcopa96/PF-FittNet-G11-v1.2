import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt } from "../../asets/helpers/sweetalert";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { getCart, postCart } from "../../redux/actions/index";
import CardServices from "../CardCarritoService/CardServices";
// @ts-expect-error TS(2307): Cannot find module './styles/style.module.css' or ... Remove this comment to see the full error message
import style from "./styles/style.module.css";

export function NavBar3({
  id,
  usuarioId,
  button,
  background,
  color,
  align
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const cart = useSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [body, setBody] = useState({
    gym: [],
    services: [],
    user: "",
  });

  useEffect(() => {
    let count = 0;
    cart.forEach((item: any) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cart, cartCount, id, usuarioId]);
  //   }, [cart, cartCount])

  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item: any) => {
      items = item.price.$numberDecimal * item.qty;
      price += item.qty * item.price.$numberDecimal;
    });
    setTotalPrice(price);
    setTotalItems(items);
    setBody({
      gym: id,
      // @ts-expect-error TS(2322): Type 'any[]' is not assignable to type 'never[]'.
      services: [...cart],
      user: usuarioId,
    });
    // }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
  }, [cart, totalPrice, totalItems, id, usuarioId]);

  // @ts-expect-error TS(7030): Not all code paths return a value.
  function handleSubmit() {
    if (cartCount < 1) {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      return SweetAlrt("Su carrito esta vacio");
    }
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<Axios... Remove this comment to see the full error message
    dispatch(postCart(body));
    // @ts-expect-error TS(2345): Argument of type '((dispatch: any) => Promise<any>... Remove this comment to see the full error message
    dispatch(getCart());
    navigate("/stripe");
  }

  return (
    <div className={style.contCarr} style={{backgroundColor: background, color: color}}>
      <p className={style.titleCarrito} style={{textAlign: align}}>CARRITO DE COMPRAS</p>
      <div className={style.tablePadre}>        
        // @ts-expect-error TS(2786): 'CardServices' cannot be used as a JSX component.
        <CardServices title="true" />
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        {console.log("cards")}
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        {console.log(cart)}
        {cart.map((e: any) => {
          return (
            // @ts-expect-error TS(2786): 'CardServices' cannot be used as a JSX component.
            <CardServices
              title="false"
              key={e._id}

              img={e.photo[0]}
              name={e.name}
              unidad={e.qty}
              price={e.price.$numberDecimal}
            />
          );
        })}
      </div>
      {/* Bloque de total de compra */}
      <div className={style.contTotalC}>
        <div>Cantidad Total: {cartCount}</div>
        <div>Precio Total: ${totalPrice}</div>
        <div>
          {button ? (
            <ButtonSimple
              onClick={() => handleSubmit()}
              title="COMPRAR"
              padding="0 1rem"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
