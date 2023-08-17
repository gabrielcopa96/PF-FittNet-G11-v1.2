import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt } from "../../utils/sweetalert";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { getCart, postCart } from "../../redux/actions/index";
import CardServices from "../CardCarritoService/CardServices";
import style from "./styles/style.module.css";

export function NavBar3({
  id,
  usuarioId,
  button,
  background,
  color,
  align
}: any): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore TS(2532): Object is possibly 'undefined'.
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
      // @ts-ignore TS(2532): Object is possibly 'undefined'.
      services: [...cart],
      user: usuarioId,
    });
    // }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems])
  }, [cart, totalPrice, totalItems, id, usuarioId]);

  function handleSubmit() {
    if (cartCount < 1) {
      // @ts-ignore TS(2532): Object is possibly 'undefined'.
      return SweetAlrt("Su carrito esta vacio");
    }
    dispatch((postCart(body) as any));
    dispatch((getCart() as any));
    navigate("/stripe");
  }

  return (
    <div className={style.contCarr} style={{backgroundColor: background, color: color}}>
      <p className={style.titleCarrito} style={{textAlign: align}}>CARRITO DE COMPRAS</p>
      <div className={style.tablePadre}>        
        <CardServices title="true" />
        {console.log("cards")}
        {console.log(cart)}
        {cart.map((e: any) => {
          return (
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
