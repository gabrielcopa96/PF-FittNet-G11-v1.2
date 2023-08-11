import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGymDetail } from "../../redux/actions";
import { useSelector } from "react-redux";
import { NavBar3 } from "./NavBar3";
import CartItem from "../CartItem/CartItem";
import { clearGymDetail } from "../../redux/actions";
// @ts-expect-error TS(2307): Cannot find module './styles/style.module.css' or ... Remove this comment to see the full error message
import style from "./styles/style.module.css";
import { getUser } from "../../redux/actions";

export default function GymDetail() {
  let { userId } = useParams();
  const dispatch = useDispatch();
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  let idUser = localStorage.getItem("userId");

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getGymDetail(userId)); // eslint-disable-next-line
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getUser(idUser));
  }, [userId, idUser]);

  // This is equivalent to ComponentWillUnmount.
  // Que se ejecute cuando se desmonte gymDetail y limpie su estado en el reducer
  // @ts-expect-error TS(2345): Argument of type '() => () => { type: string; payl... Remove this comment to see the full error message
  useEffect(() => {
    return () => dispatch(clearGymDetail());
  // @ts-expect-error TS(2448): Block-scoped variable 'gymDetail' used before its ... Remove this comment to see the full error message
  }, [gymDetail]);

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gymDetail = useSelector((state) => state.gymDetail);

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  let usuarioId = localStorage.getItem("userId");
  // id de usuario que está en la app
  // console.log(gymDetail, 'id de usuario que está en la app')

  if (!gymDetail.name) {
    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <img
        id="loading"
        src="https://www.sanfranciscohm.com/static/img/loading.gif"
        alt="loading..."
      />
    );
  } else {
    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        {console.log(gymDetail)}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{ background: "#f74177" }}>
          {gymDetail.image.length > 0 ? (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div className={style.container}>
              {gymDetail.image.length == 1 ? (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <div>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.slider}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide1">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[0]} />
                    </li>
                  </ul>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.menu}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide1"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
              {gymDetail.image.length == 2 ? (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <div>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.slider}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide1">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[0]} />
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide2">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[1]} />
                    </li>
                  </ul>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.menu}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide1"></a>
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide2"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
              {gymDetail.image.length >= 3 ? (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <div>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.slider}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide1">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[0]} />
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide2">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[1]} />
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li id="slide3">
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <img src={gymDetail.image[2]} />
                    </li>
                  </ul>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <ul className={style.menu}>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide1"></a>
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide2"></a>
                    </li>
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <a href="#slide3"></a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <p className={style.title}>{gymDetail.name}</p>
        </div>

        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <section className={style.semicircle}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.cardShop}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div className={style.imgBoxLogo}>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <img
                src={
                  gymDetail.logo.length > 0
                    ? gymDetail.logo
                    : "https://i0.wp.com/votoenblanco.com.mx/wp-content/uploads/2021/12/IMG_7680.jpg?fit=972%2C648&ssl=1"
                }
                alt="imagen gym"
                className={style.mouseCardLogo}
              />
            </div>
          </div>
        </section>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{paddingTop:"200px"}}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <NavBar3
            id={[gymDetail]}
            usuarioId={usuarioId}
            button={true}
            background="#fff"
          />
        </div>

        {/* Detalle servicio */}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.contServices}>
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          {console.log(gymDetail)}
          {gymDetail.services.map((e: any) => {
            return (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <div key={e._id}>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <CartItem
                  id={e._id}
                  key={e._id}
                  name={e.name}
                  price={e.price.$numberDecimal}
                  description={e.description}
                  duration={e.duration}
                />{" "}
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <br></br>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
