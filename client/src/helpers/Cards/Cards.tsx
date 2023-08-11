import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { updateFavouriteGym } from "../../redux/actions/index";

import axios from "axios";

// @ts-expect-error TS(2307): Cannot find module './styles/stylesCards.module.cs... Remove this comment to see the full error message
import styles from "./styles/stylesCards.module.css";
import { IoIosHeart } from "react-icons/io";
import { AiFillStepForward, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { EditMyGyms } from "../../components/Home/HomePartner/ViewsPartner/EditMyGyms.jsx";

export const CardAvatares = (props: any) => {
  const { image } = props;

  const estiloPruebaImage = {
    backgroundImage: `url(${image})`,
  };

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.containerCardAvatares}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div style={estiloPruebaImage}></div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <span style={{}}></span>
    </div>
  );
};

export const CardAvatarAdicional = (props: any) => {
  // El id del avatar llega por props
  const { name, image, features, id, userId, typeuser, nameUser, icono } =
    props;

  const navigate = useNavigate();
  async function handleUdpateAvatar(idAvatar: any, e: any) {
    e.preventDefault();
    const avatar = { avatar: idAvatar };

    // dispatch(postAvatar(userId, avatar));
    SweetAlrtTem(
      `elegiste el avatar ${name}, ahora vas a ser redirigido a los gimnasios que cumplan con las caracteristicas de este avatar`,
      "success"
    );
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("se agrego el avatar al usuario");
    navigate(`/home/${typeuser}/${nameUser}/${userId}/${idAvatar}`);

    let avatarSelect = await postAvatar(userId, avatar);

    // Hay que avaluar la respuesta y retornar un swit altert
    // console.log(avatarSelect, 'Respuesta a avatarSelect')

    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    if (avatarSelect.data.ok === false) {
      // Si el userId es invalido
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      return SweetAlrtTem(`${avatarSelect.data.msg}`, "warning");
    }

    let avatarId = avatarSelect
      ? avatarSelect.data.UserUpdateAvatar.avatar
      : null;

    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(avatarSelect, "avatar selected id");

    // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
    localStorage.setItem("avatar", avatarId);

    navigate(`/home/${typeuser}/${nameUser}/${userId}/${avatarId}`);
  }

  // @ts-expect-error TS(7030): Not all code paths return a value.
  async function postAvatar(userId: any, avatar: any) {
    try {
      const dataUdpateAvatar = await axios.put(
        `/api/user/avatar/${userId}`,
        avatar
      );

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(dataUdpateAvatar);

      return dataUdpateAvatar;
    } catch (error) {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(error);
    }
  }

  const estiloIcono = {
    content: "",
    width: "120px",
    height: "120px",
    backgroundImage: `url(${icono})`,
  };

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.containerCardAvatar}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.card}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.cardContent}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div
            style={{ backgroundImage: `url(${image})` }}
            className={styles.cardFront}
          >
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div className={styles.cardTitle} style={estiloIcono}></div>
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.cardBack}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <h5 style={{ fontWeight: "700" }}>{name}</h5>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ul>
              {features?.map((x: any, y: any) => (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li className={styles.listFeaturesAvatar} key={y}>
                  {x}
                </li>
              ))}
            </ul>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <button
              className={styles.btnSelectAvatar}
              onClick={(e) => handleUdpateAvatar(id, e)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardIcons = (props: any) => {
  const { img, num } = props;
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.cardIcons}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <img src={img} alt="" />
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <p>{num}</p>
    </div>
  );
};

export const CardShop = (props: any) => {
  const { title, services, favourite, id, logo } = props;

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const userId = localStorage.getItem("userId");

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleFavouriteClick = (e: any, gymId: any) => {
    e.preventDefault();
    if (avatar) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(updateFavouriteGym(gymId, userId));
    } else {
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(
        "no se pudo agregar a favorito por que aun no estas registrado"
      );
    }
  };

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.cardShop}>
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      {console.log(props)}
      {/* <div className={styles.imgBoxLogo}>
        <img
          src={
            logo.length > 0
              ? logo
              : "https://i0.wp.com/votoenblanco.com.mx/wp-content/uploads/2021/12/IMG_7680.jpg?fit=972%2C648&ssl=1"
          }
          alt="imagen gym"
          className={styles.mouseCardLogo}
        />
      </div> */}
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.imgBox}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <img
          src={
            logo.length > 0
              ? logo
              : "https://i0.wp.com/votoenblanco.com.mx/wp-content/uploads/2021/12/IMG_7680.jpg?fit=972%2C648&ssl=1"
          }
          alt="imagen gym"
          className={styles.mouseCard}
        />
      </div>

      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.contentBox}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <h3 style={{ color: "var(--color-primD1)" }}>{title}</h3>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div style={{ display: "flex", alignItems: "center", gap: ".2rem" }}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span
              style={{
                color: "#dadada",
                fontWeight: "700",
                fontSize: "1.27rem",
              }}
            >
              {favourite}
            </span>
            {user.favourite?.some((x: any) => x === id) ? (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <IoIosHeart
                onClick={(e) => handleFavouriteClick(e, props.id)}
                style={{ color: "red", cursor: "pointer", marginTop: ".2rem" }}
              />
            ) : (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <IoIosHeart
                onClick={(e) => handleFavouriteClick(e, props.id)}
                style={{
                  color: "#868686",
                  cursor: "pointer",
                  marginTop: ".2rem",
                }}
              />
            )}
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".1rem",
              fontWeight: "700",
            }}
          >
            {services.length}
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <AiFillStepForward
              style={{ color: "#FEAA09", marginTop: ".2rem" }}
            />
          </span>
        </div>
        {/* <h2 className={styles.priceCard}>
          <small>{price.$numberDecimal}</small> €
        </h2> */}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div
          className={styles.buyCard}
          onClick={() => navigate(`/detail/gym/${id}`)}
        >
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <AiOutlineShoppingCart style={{ width: "30px", height: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export const CardsPlansPartner = (props: any) => {
  const { title, Size, busqueda, servicios, gym } = props;
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.contPlanPartner}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.card}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.face1}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.content}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <span className={styles.stars}></span>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div className={styles.plan}>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <ul>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>{busqueda} de visibilidad</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>Panel de control</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>Historial de ventas</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>Gestios de GYM</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>Gestios de servicios</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>{gym}</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>{servicios}</li>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.face2}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <h2 style={{ fontSize: Size }}>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export const CardGymPartner = (props: any) => {
  const {
    title,
    id,
    image,
    trainers,
  } = props;

  const [view, setView] = useState("myGyms");

  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
  return <>
    {view !== "editMyGyms" ? (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.containerCardGymPartner}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.headerGymPartner}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <img
            src={image[0]}
            alt="imagen gimnasio"
            style={{ width: "160px", height: "120px", borderRadius: ".6rem" }}
          />
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.mainGymPartner}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.mainHeaderPartner}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <h2>{title}</h2>
            {/* <span
              className={styles.btnEditarGym}
              onClick={() => setView("editMyGyms")}
            >
              Editar gimnasio
            </span> */}
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.bodyInfoGym}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div
              style={{ display: "flex", alignItems: "center", gap: ".4rem" }}
            >
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <span>Entrenadores:</span>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <ul className={styles.listTrainers}>
                {trainers &&
                  trainers.map((x: any, y: any) => (
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <li key={y}>
                      {y + 1}. {x}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    ) : (
      // </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <EditMyGyms idGym={id} />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button
          onClick={() => setView("myGyms")}
          className={styles.btnVolverForGym}
        >
          Volver
        </button>
      </>
    )}
  </>;
};
