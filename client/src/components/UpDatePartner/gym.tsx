import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './style/client.module.css' or ... Remove this comment to see the full error message
import styles from "./style/client.module.css";
import { gymValidate, gymValidateEdit } from "./controlers/validaciones";

import { getMyGyms } from "../../redux/actions"; // --------------LA ACTION
import { useDispatch } from "react-redux";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { createOneGym, editOneGym } from "./controlers/Functions";
import MapGyms from "../MapsAndGeo/MapGyms";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/actions";

export default function UpdateGym(props: any): JSX.Element {
  const dispatch = useDispatch();

  const { idGym } = props;

  const gymGeo = useSelector((state: any) => state.gymsGeo);

  const userInfo = useSelector((state: any) => state.partnerDetails);
  let userPlan = userInfo.planType ? userInfo.planType : false;

  console.log(userPlan, " el plan del partner"); // false si no tiene plan

  const userId = localStorage.getItem("userId");

  const dataPartner = useSelector((state: any) => state.myGyms);
  let myGyms = dataPartner.gyms ? dataPartner.gyms : [];

  console.log(myGyms, " los gyms del partner"); // false si no tiene plan

  const [typeAction, setTypeAcyion] = useState("create");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [gymId, setGymId] = useState(""); //------------------------- El Id

  const [error, setError] = useState({});
  const [newGym, setNewGym] = useState({
    name: "", //string y es obligatorio - sale del form
    price: "", // numero entero o decimal y no es obligatorio - sale del form
    image: [], // es un array de imágenes y se inicia en vacio o con elementos
    latitude: "", // numero entero o decimal y no es obligatorio
    longitude: "", // numero entero o decimal y no es obligatorio
    trainers: [], // lo puedo tocar aunque no es obligatorio. Es un array de strings
    // que va a guardar los nombres de los instructores.
    logo: "", // es un string que guarda el enlace a una imagen
    phone: "", // es un conjunto de numeros enteros y es un campo obligatorio
    email: "", // es un string que guarda el email del gym
    gymActive: true,
    favourite: 0, // es un numero entero y se inicia  en cero
  });

  // Campos obligatorios - Esto campos tiene que estar o se cae el back
  // 1 name
  // 2 price
  // 3 logo
  // 4 phone
  useEffect(() => {
    dispatch((getMyGyms(userId) as any));
  }, [userId]);

  useEffect(() => {
    dispatch((getMyGyms(userId) as any));
    dispatch((getUser(userId) as any));
  }, [userId]);

  function refreshState(e: any) {
    e.preventDefault();
    dispatch((getMyGyms(userId) as any));
    setNewGym({
      name: "",
      price: "",
      image: [],
      latitude: "",
      longitude: "",
      trainers: [],
      logo: "",
      phone: "",
      email: "",
      gymActive: true,
      favourite: 0,
    });
    setEditGym({
      name: "",
      price: "",
      image: [],
      latitude: "",
      longitude: "",
      trainers: [],
      logo: "",
      phone: "",
      email: "",
      // @ts-expect-error TS(2345): Argument of type '{ name: string; price: string; i... Remove this comment to see the full error message
      gymActive: true,
      favourite: 0,
    });
    setError({});
  }

  // Campos del formulario
  //----------------------------------------------------------------------
  // 1 Nombre del Gym *
  // un campo para el nomre

  // 2 Precio por mes *
  // un campo para el precio

  // 3 Fotos del gimnasio
  // esto es un array urls de fotos que se cargan como strings
  // cccc más botón de quitar o limpiar

  // 4 Entrenadores
  // esto es un array nombres de entrenadores que se cargan como strings
  // renderizar cada nombre más botón de quitar o limpiar

  // 5 Logo del gym *
  // un campo para el string de la dirección url de la imagen
  // renderizar la img cargada en 200x200px

  // 6 Teléfono *
  // un campo para los números

  // 7 Email
  // un campo para el correo

  //----------------------------------------------------------------------
  // Si edito un Gym cargo la info en este otro objeto
  const [editGym, setEditGym] = useState({
    name: "",
    price: "",
    image: [],
    latitude: "",
    longitude: "",
    trainers: [],
    logo: "",
    phone: "",
    email: "",
  });
  // Campos obligatorios - Esto campos tiene que estar o se cae el back
  // 1 name
  // 2 price
  // 3 logo
  // 4 phone

  useEffect(() => {
    setNewGym((prevState) => {
      return {
        ...prevState,
        latitude: gymGeo.latitude,
        longitude: gymGeo.longitude,
      };
    });
    setEditGym((prevState) => {
      return {
        ...prevState,
        latitude: gymGeo.latitude,
        longitude: gymGeo.longitude,
      };
    });
  }, [gymGeo]);
  //----------------------------------------------------------------------------
  // Faltaría tener un select o un switch para saber si se está creando o editando,
  // pero de todas formas usamos el mismo form para las dos cosas (crear y editar)
  //----------------------------------------------------------------------------

  function validatePlanGyms(userPlan: any, partnerGyms: any) {
    // userPlan es un string o un objeto -> false || { } ||
    // Si es objeto trae info del plan y la cantidad de gyms
    // parnerGys -> Es un arreglo de objetos (un objeto por cada gym)
    console.log(userPlan, partnerGyms, 'plan del user y cantidad de gyms')

    let planType;
    let maxGyms;
    if (userPlan === false) {
      // si el usuario no tiene plan
      return `La cuenta no tiene asignado un plan, no puede crear gimnasios`;
    }
    planType = userPlan.planName;
    maxGyms = userPlan.gymsPermited;
    // console.log(planType, maxGyms, 'plan del user y cantidad de gyms')

    // if (planType === "Estandar" && partnerGyms.length === 1 ) { // Máximo un gym, nada más
    if (planType === "Standar" && partnerGyms.length === Number(maxGyms)) {
      // De pruebaa, el que vale es el que sigue
      return `La cuenta Estandar solo permite crear un gimnasio,
      si desea crear más de un gimnasio debería cambiar de plan.`;
    }
    if (planType === "Premium" && partnerGyms.length === Number(maxGyms)) {
      return `La cuenta Premium solo permite crear hasta cinco gimnasio,
      si desea crear más gimnasios debería cambiar de plan.`;
    }
    if (planType === "Golden" && partnerGyms.length === Number(maxGyms)) {
      return `La cuenta Golden le permite crear un máximo de cincuenta gimnasios,
      no es posible crear más gimnasios.`;
    }

    return true;
  }

  //----------------------------------------------------------------------------
  // Esta función sirve para crear un gym
  //----------------------------------------------------------------------------
  async function onClickCreateGym() {
    // Acá debe estar la validación de catidad de gyms =)
    let validate = await validatePlanGyms(userPlan, myGyms); // Lla a la función validadora de plan y gyms

    if (typeof validate === "string") {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      return SweetAlrt(validate);
    }

    if ((error as any).name || (error as any).logo || (error as any).price || (error as any).phone || (error as any).email) {
      return SweetAlrtTem("Los valores que ingreso son incorrectos", "warning");
    } else if (!newGym.name || !newGym.logo || !newGym.phone) {
      return SweetAlrtTem("Completa los campos requeridos", "warning");
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      SweetAlrt("Estamos procesando su solicitud!")
      let dataForNewGym = {
        userId: { userId: userId },
        dataNewGym: newGym,
        // dataNewGym: { prop1: "data1", prop2: 2, prop3: [], prop4: {} }
      };
      // userId: el id del usuario partner que crea el gym
      // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
      console.log("recibe el click y crea un gym");
      let newOnGym = await createOneGym(dataForNewGym);

      if (newOnGym) {
        SweetAlrt("Exito", "Gimnasio creado", "success");
        dispatch((getMyGyms(userId) as any));
      } else {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        SweetAlrt("Ocurrió un error y el gimnasio no fue creado", "error");
      }

      setNewGym({
        name: "",
        price: "",
        image: [],
        latitude: "",
        longitude: "",
        trainers: [],
        logo: "",
        phone: "",
        email: "",
        gymActive: true,
        favourite: 0,
      });

      return newOnGym;
    }
  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym
  //----------------------------------------------------------------------------

  async function onClickEditGym() {
    if ((error as any).name || (error as any).logo || (error as any).price || (error as any).phone || (error as any).email) {
      return SweetAlrtTem("Los valores que ingreso son incorrectos", "warning");
    } else if ((!editGym.name && !editGym.phone && !editGym.price) || !gymId) {
      return SweetAlrtTem("Completa los datos  requeridos", "warning");
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      SweetAlrt("Estamos procesando su solicitud!")
      let dataForEditGym = {
        //userId: { userId: "userId" },
        gymId: { gymId: gymId || idGym },
        newDataGym: editGym,
        // newDataGym: { prop1: "data2", prop2: 3, prop3: ["algo"], prop4: {} }
      };
      // gymId: el id del gym a editar
      // dataNewGym: en este objeto va todo lo que obtienen del formulario (el input de arriba)
      console.log("recibe el click y edita un gym");
      let editOnGym = await editOneGym(dataForEditGym);
      SweetAlrt("Exito", "Gym editado!", "success");
      setEditGym({
        name: "",
        price: "",
        image: [],
        latitude: "",
        longitude: "",
        trainers: [],
        logo: "",
        phone: "",
        email: "",
        // @ts-expect-error TS(2345): Argument of type '{ name: string; price: string; i... Remove this comment to see the full error message
        gymActive: true,
        favourite: 0,
      });
      return editOnGym;
    }
  }
  //----------------HANDLECHANGE----------------------------------------------
  function handleChange(e: any) {
    if (typeAction === "create") {
      setNewGym(() => {
        const newInput = {
          ...newGym,
          [e.target.name]: e.target.value,
          latitude: gymGeo.latitude,
          longitude: gymGeo.longitude,
        };
        const errors = gymValidate(newInput);
        setError(errors);
        console.log(errors);
        return newInput;
      });
      console.log(newGym);
    }
    // console.log(error);

    if (typeAction === "edit") {
      setEditGym(() => {
        const newInput = {
          ...editGym,
          [e.target.name]: e.target.value,
          latitude: gymGeo.latitude,
          longitude: gymGeo.longitude,
        };
        // newInput.phone ? newInput.phone : newInput.phone=myGyms.phone;
        const errors = gymValidateEdit(newInput);
        setError(errors);
        return newInput;
      });
      console.log(editGym);
    }
  }

  // -----------------------delete Trainer-------------------------------------
  function handleDeleteT(e: any) {
    e.preventDefault();
    if (typeAction === "create") {
      setNewGym({
        ...newGym,
        trainers: newGym.trainers.filter((el) => el !== e.target.value),
      });
    }
    if (typeAction === "edit") {
      setEditGym({
        ...editGym,
        trainers: editGym.trainers.filter((el) => el !== e.target.value),
      });
    }
  }
  //------------------------------- Add photo -------------------------------
  function addTrainer(e: any) {
    e.preventDefault();

    if (name && typeAction === "create") {
      if (!(newGym as any).trainers.includes(name)) {
        // console.log('entra');
        let newState = [...newGym.trainers];
        (newState as any).push(name);

        setNewGym({
          ...newGym,
          trainers: newState,
        });
      }
    }
    if (name && typeAction === "edit") {
      // console.log('entra');
      if (!(editGym as any).trainers.includes(name)) {
        let newState = [...editGym.trainers];
        (newState as any).push(name);

        setEditGym({
          ...editGym,
          trainers: newState,
        });
      }
    }
    setName("");
    // console.log(editGym.trainers)
    // console.log(newGym.trainers)
  }

  //----------------------- delete photo --------------------------------------
  function handleDeletePhoto(e: any) {
    e.preventDefault();

    if (typeAction === "create") {
      setNewGym({
        ...newGym,
        image: newGym.image.filter((el) => el !== e.target.value),
      });
    }

    if (typeAction === "edit") {
      setEditGym({
        ...editGym,
        image: editGym.image.filter((el) => el !== e.target.value),
      });
    }
  }

  //----------------------- add photo -----------------------------------------

  function addPhoto(e: any) {
    e.preventDefault();

    if (photo && typeAction === "create") {
      if (!(newGym as any).image.includes(photo)) {
        // console.log('entra');
        let newState = [...newGym.image];
        (newState as any).push(photo);

        setNewGym({
          ...newGym,
          image: newState,
        });
      }
    }
    if (photo && typeAction === "edit") {
      if (!(editGym as any).image.includes(photo)) {
        let newState = [...editGym.image];
        (newState as any).push(photo);

        setEditGym({
          ...editGym,
          image: newState,
        });
      }
    }
    // console.log(editGym.image)
    // console.log(newGym.image)
    setPhoto("");
  }
  //------------------ Select Gimnasio ------------------------------------------
  function handleChangeGyms(e: any) {
    if (e.target.value !== "...") {
      e.preventDefault();
      //
      // let myGyms = dataPartner.gyms ? dataPartner.gyms : [];

      // filterServices = myGyms.length && myGyms.filter(e => e._id === value);

      //setMyServices(filterServices);

      // console.log(filterServices, ' los servicios del gym');

      // Seteamos el id del servicio
      setGymId(e.target.value);
      // console.log(e.target.value, ' Service select dentro del if')
    } else {
      setGymId("");
    }
    console.log(e.target.value, " Service select");
  }

  //-----------------------------------------------------------------------------
  return (
    <div className={styles.editPartnerMainContainer}>
      <h3>
        FORMULARIO DE {typeAction === "create" ? "CREACIÓN" : "EDICIÓN"} DE GYM
      </h3>
      {/* <div>latNew{newGym.latitude}, LonNew{newGym.longitude}</div>
      <div>latEdit{editGym.latitude}, LonEdit{editGym.longitude}</div> */}
      <div>
        <div className={styles.headerFormPartnerGym}>
          <button
            className={styles.btnCreateEditGym}
            onClick={(e) => refreshState(e)}
          >
            Recargar
          </button>

          {typeAction === "edit" ? (
            <button
              className={styles.btnCreateEditGym}
              onClick={() => {
                setTypeAcyion("create");
              }}
            >
              Ir a crear Gym
            </button>
          ) : null}

          {typeAction === "edit" ? null : (
            <button
              className={styles.btnCreateEditGym}
              onClick={() => {
                setTypeAcyion("edit");
              }}
            >
              Ir a editar Gym
            </button>
          )}

          <p></p>

          <p></p>
        </div>
        {/* {typeAction ? typeAction : null} */}

        <form action="" className={styles.formCrEdGyms}>
          <div className={styles.formLogo}>
            {newGym.logo && (
              <img
                className={styles.imageform}
                src={newGym.logo}
                alt="Image not found"
              />
            )}
            {editGym.logo && (
              <img
                className={styles.imageform}
                src={editGym.logo}
                alt="Image not found"
              />
            )}
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <label>
                <strong>*</strong>Logo:
              </label>
              <input
                type="text"
                className={styles.inputImageLogo}
                value={typeAction === "create" ? newGym.logo : editGym.logo}
                name="logo"
                onChange={(e) => handleChange(e)}
                placeholder="https://logo-gym.jpg"
              />
            </div>

            {typeAction === "create" ? newGym.price : editGym.price}

            {typeAction === "create" ? null : (
              <div>
                <label>
                  <strong>*</strong>Gimnasio:{" "}
                </label>
                <select onChange={(e) => handleChangeGyms(e)}>
                  <option key="id1">...</option>
                  {myGyms.length > 0
                    ? myGyms.map((g: any) => <option key={g._id} value={g._id}>
                      {g.name}
                    </option>)
                    : null}
                </select>
              </div>
            )}

            {gymId ? gymId : null}
          </div>
          <div className={styles.mainInfoForm}>
            <div>
              <label>
                <strong>*</strong>Nombre:{" "}
              </label>
              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="text"
                name="name"
                value={typeAction === "create" ? newGym.name : editGym.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Nombre..."
              />
              {(error as any).name && <p className={styles.danger}>{(error as any).name}</p>}
            </div>

            <div>
              <label>
                <strong>*</strong>Mensualidad:{" "}
              </label>
              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="number"
                name="price"
                min="1"
                value={typeAction === "create" ? newGym.price : editGym.price}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="$..."
              />
              {(error as any).price && <p className={styles.danger}>{(error as any).price}</p>}
            </div>
          </div>
          <div className={styles.mainInfoForm}>
            <div>
              <label>
                <strong>*</strong>Telefono:{" "}
              </label>
              <input
                // className={error.phone && styles.inputdanger}
                className={styles.inputImageLogo}
                type="number"
                name="phone"
                min="0"
                value={typeAction === "create" ? newGym.phone : editGym.phone}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="+549......"
              />
              {(error as any).phone && <p className={styles.danger}>{(error as any).phone}</p>}
            </div>

            <div>
              <label>Email: </label>
              <input
                // className={error.email && styles.inputdanger}
                className={styles.inputImageLogo}
                type="email"
                name="email"
                value={typeAction === "create" ? newGym.email : editGym.email}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="correo@ejemplo.com"
              />
              {(error as any).email && <p className={styles.danger}>{(error as any).email}</p>}
            </div>
          </div>
          <div>
            <div>
              <label>Entrenadores: </label>

              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="text"
                name="names"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="nombre del entrenador"
              />

              <button
                className={styles.btnAgregarFotos}
                onClick={(e) => {
                  addTrainer(e);
                }}
              >
                +{" "}
              </button>

              <ul>
                <li>
                  {newGym.trainers.length && typeAction === "create"
                    ? newGym.trainers.map((e) => (
                      <div key={e} className={styles.listTrainGym}>
                        <div className={styles.trainersStyle}>
                          <p>{e} </p>
                          <button value={e} onClick={(e) => handleDeleteT(e)}>
                            x
                          </button>{" "}
                        </div>
                      </div>
                    ))
                    : null}

                  {editGym.trainers.length && typeAction === "edit"
                    ? editGym.trainers.map((e) => (
                      <div key={e} className={styles.listTrainGym}>
                        <div className={styles.trainersStyle}>
                          <p style={{ marginTop: ".35rem" }}>{e} </p>
                          <button value={e} onClick={(e) => handleDeleteT(e)}>
                            x
                          </button>
                        </div>
                      </div>
                    ))
                    : null}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <label>Fotos: </label>

            <input
              type="text"
              className={styles.inputImageLogo}
              name="photo"
              id="image"
              multiple
              value={photo}
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
              placeholder="https://foto-del-gym.jpg"
            />
            <button
              className={styles.btnAgregarFotos}
              onClick={(e) => {
                addPhoto(e);
              }}
            >
              +{" "}
            </button>

            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: ".3rem",
                }}
              >
                {newGym.image.length && typeAction === "create"
                  ? newGym.image.map((e) => (
                    <div key={e} className={styles.listfotosGym}>
                      <img
                        className={styles.photoform}
                        src={e}
                        key={e}
                        alt="No Found"
                      />
                      <button
                        value={e}
                        className={styles.btnFotosGym}
                        onClick={(e) => handleDeletePhoto(e)}
                      >
                        x
                      </button>{" "}
                    </div>
                  ))
                  : null}

                {editGym.image.length && typeAction === "edit"
                  ? editGym.image.map((e) => (
                    <div key={e} className={styles.listfotosGym}>
                      <img
                        className={styles.photoform}
                        src={e}
                        key={e}
                        alt="No Found"
                      />
                      <button
                        value={e}
                        className={styles.btnFotosGym}
                        onClick={(e) => handleDeletePhoto(e)}
                      >
                        x
                      </button>{" "}
                    </div>
                  ))
                  : null}
              </li>
            </ul>
          </div>
        </form>
        <div style={{ marginTop: "1rem" }}>
          <MapGyms />
        </div>
      </div>
      <p></p>
      {typeAction === "create" && (
        <button
          className={styles.btnCreateEditGym}
          onClick={() => {
            onClickCreateGym();
          }}
        >
          Crear Gym
        </button>
      )}
      {typeAction === "edit" && (
        <button
          className={styles.btnCreateEditGym}
          onClick={(e) => {
            onClickEditGym();
          }}
        >
          {" "}
          Editar Gym
        </button>
      )}
    </div>
  );
}
