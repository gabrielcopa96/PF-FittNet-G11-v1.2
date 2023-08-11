import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// @ts-expect-error TS(2307): Cannot find module './styles/StripeCart.module.css... Remove this comment to see the full error message
import styles from "./styles/StripeCart.module.css";
import axios from "axios";
import { NavBar3 } from "../GymDetail/NavBar3";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import {
  clearCart,
  updateClientGym,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import { SendEmail } from "./SendEmail";
import { BackgroundOne } from "../../helpers/Backround/Background";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import { getUser } from "../../redux/actions";


const stripePromise = loadStripe(
  "pk_test_51L7OPdEPCpA0H6YFBVpVX0fFBJbIIUnXcU4hSY5uUZwQth9mmogZEiwUzXyXi5aJLSb43EzWLXcMPk75NBTjFGEC00usvaG53P"
);



// @ts-expect-error TS(7030): Not all code paths return a value.
const CheckoutForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const cart = useSelector((state) => state.cart);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const allcart = useSelector((state) => state.gymDetail);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.user);

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  localStorage.setItem('phone', allcart.phone)
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  localStorage.setItem('nameGym', allcart.name)

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  let userId = localStorage.getItem('userId');


  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const usuarioId = localStorage.getItem('userId');
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const name = localStorage.getItem("name");
  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getUser(userId))

  }, [userId])

  const [detailUser, setDetailUser] = useState({ ///--------------Nano details
    userName: user.name,
    email: user.userName
  })
  
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");

  const [statusClient, setStatusClient] = useState({
    id2: allcart._id,
    client: name,
  });

  const [statusGym, setStatusGim] = useState({
    nameGim: allcart.name,
    phonmeGim: allcart.phone
  })

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const idCart = useSelector((state) => state.getCart);
  const [imgBack, setImgBack] = useState(
    Math.floor(Math.random() * (26 - 1) + 1)
  );

  const img =
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/" +
    imgBack +
    ".jpeg";

  async function functionEditStatus(detalle: any) {
    const put = await axios({
      method: "put",
      url: "/api/shopcart",
      data: detalle,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
      .then((res) => {
        return res.data;
      })
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      .catch((error) => console.log(error));
    return put;
  }

  const handleSubmit = async (e: any) => {
    var detalle = cart.map((c: any) => ({
      user: usuarioId,
      services: c._id,
      gyms: statusClient.id2,
      price: c.price.$numberDecimal,
      quantity: c.qty,
      total: c.qty * c.price.$numberDecimal,
      status: "Payed"
    }));

    var saleDetail = cart.map((c: any) => ({
      sericesName: c.name,
      gymName: allcart.name,
      price: c.price.$numberDecimal,
      quantity: c.qty,
      total: c.qty * c.price.$numberDecimal
    }));

    const det = {
      userDetail: detailUser,
      gymDetail: {
        gymName: statusGym.nameGim,
        phoneGym: statusGym.phonmeGim
      },
      saleDetail: saleDetail,
    };
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      // @ts-expect-error TS(2322): Type 'StripeCardElement | null' is not assignable ... Remove this comment to see the full error message
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      let compra = await axios
        .post("/api/checkout", {
          id,
          amount: 2000 * 10,
        })
        .then((response) => {
          return response
        })
        .catch((error) => {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(error);
        });
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(compra.data)
      // @ts-expect-error TS(2339): Property 'data' does not exist on type 'void | Axi... Remove this comment to see the full error message
      if (compra.data === 'todomal') {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        SweetAlrt(`Su pago fue rechazado ${name}`, "Intente con otra tarjeta")
        return navigate(`/home/${type}/${name}/${usuarioId}/${avatar}`);
      }
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<Axios... Remove this comment to see the full error message
      dispatch(updateClientGym(detalle));
      SendEmail(det);
      SweetAlrtTem(`Su compra fue realizada con exito ${name}`, "success");
      navigate(`/home/${type}/${name}/${usuarioId}/${avatar}`);
      dispatch(clearCart());
    } else {
      SweetAlrtTem(`Su compra NO fue realizada con exito ${name}`, "error");
    }
  };
  
  if (imgBack) {
    return (
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.screenContent}>
            <form>
              <div className={styles.tarjetPadre}>
                <div className={styles.tarjet}>
                  <div className={styles.cardTarjet}>
                    <div className={styles.cardBackground}>
                      <img
                        src={img}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <div className={styles.cardWrapper}>
                      <div className={styles.itemTop}>
                        <img
                          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                          alt=""
                          style={{ width: "70px", height: "56px" }}
                        />
                        <img
                          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                          alt=""
                          style={{ width: "100px", height: "55px" }}
                        />
                      </div>
                      <div className={styles.itemCredit}>
                        <CardElement />
                      </div>
                      <div className={styles.itemButton}>
                        <p>{name ? name : "USUARIO"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ height: "140px" }}></div>
              <div
                style={{
                  boxShadow: "0px 0px 12px 1px var(--light-color)",
                  borderRadius: "20px",
                }}
              >
                <div className={styles.contNav}>
                  <NavBar3 />
                </div>
                <div className={styles.contButton}>
                  <div>
                    {/* <Link to={`/home/${type}/${name}/${usuarioId}/${avatar}`}> */}
                    // @ts-expect-error TS(2322): Type 'number' is not assignable to type 'To'.
                    <Link to={-1}>
                      <ButtonSimple
                        onClick={() => clearCart()}
                        title="VOLVER"
                        padding="0 1rem"
                      />
                    </Link>
                  </div>
                  <ButtonSimple
                    onClick={(e: any) => handleSubmit(e)}
                    title="PAGAR"
                    padding="0 1rem"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <BackgroundOne />
      </div>
    );
  }
};

export default function StripeCart() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        // @ts-expect-error TS(2786): 'CheckoutForm' cannot be used as a JSX component.
        <CheckoutForm />
      </Elements>
    </div>
  );
}