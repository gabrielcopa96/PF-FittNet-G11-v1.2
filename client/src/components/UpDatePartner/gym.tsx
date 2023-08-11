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

export default function UpdateGym(props: any) {
  const dispatch = useDispatch();

  const { idGym } = props;

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gymGeo = useSelector((state) => state.gymsGeo);

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userInfo = useSelector((state) => state.partnerDetails);
  let userPlan = userInfo.planType ? userInfo.planType : false;

  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log(userPlan, " el plan del partner"); // false si no tiene plan

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const userId = localStorage.getItem("userId");

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const dataPartner = useSelector((state) => state.myGyms);
  let myGyms = dataPartner.gyms ? dataPartner.gyms : [];

  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMyGyms(userId));
  }, [userId]);

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMyGyms(userId));
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getUser(userId));
  }, [userId]);

  function refreshState(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMyGyms(userId));
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
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
    
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    if (error.name || error.logo || error.price || error.phone || error.email) {
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
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("recibe el click y crea un gym");
      let newOnGym = await createOneGym(dataForNewGym);

      if (newOnGym) {
        SweetAlrt("Exito", "Gimnasio creado", "success");
        // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
        dispatch(getMyGyms(userId));
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
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    if (error.name || error.logo || error.price || error.phone || error.email) {
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
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(errors);
        return newInput;
      });
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!newGym.trainers.includes(name)) {
        // console.log('entra');
        let newState = [...newGym.trainers];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(name);

        setNewGym({
          ...newGym,
          trainers: newState,
        });
      }
    }
    if (name && typeAction === "edit") {
      // console.log('entra');
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!editGym.trainers.includes(name)) {
        let newState = [...editGym.trainers];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(name);

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
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!newGym.image.includes(photo)) {
        // console.log('entra');
        let newState = [...newGym.image];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(photo);

        setNewGym({
          ...newGym,
          image: newState,
        });
      }
    }
    if (photo && typeAction === "edit") {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!editGym.image.includes(photo)) {
        let newState = [...editGym.image];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(photo);

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
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(e.target.value, " Service select");
  }

  //-----------------------------------------------------------------------------
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.editPartnerMainContainer}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h3>
        FORMULARIO DE {typeAction === "create" ? "CREACIÓN" : "EDICIÓN"} DE GYM
      </h3>
      {/* <div>latNew{newGym.latitude}, LonNew{newGym.longitude}</div>
      <div>latEdit{editGym.latitude}, LonEdit{editGym.longitude}</div> */}
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.headerFormPartnerGym}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button
            className={styles.btnCreateEditGym}
            onClick={(e) => refreshState(e)}
          >
            Recargar
          </button>

          {typeAction === "edit" ? (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <button
              className={styles.btnCreateEditGym}
              onClick={() => {
                setTypeAcyion("edit");
              }}
            >
              Ir a editar Gym
            </button>
          )}

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <p></p>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <p></p>
        </div>
        {/* {typeAction ? typeAction : null} */}

        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <form action="" className={styles.formCrEdGyms}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.formLogo}>
            {newGym.logo && (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <img
                className={styles.imageform}
                src={newGym.logo}
                alt="Image not found"
              />
            )}
            {editGym.logo && (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <img
                className={styles.imageform}
                src={editGym.logo}
                alt="Image not found"
              />
            )}
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <strong>*</strong>Logo:
              </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <div>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <label>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <strong>*</strong>Gimnasio:{" "}
                </label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <select onChange={(e) => handleChangeGyms(e)}>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <option key="id1">...</option>
                  {myGyms.length > 0
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    ? myGyms.map((g: any) => <option key={g._id} value={g._id}>
                    {g.name}
                  </option>)
                    : null}
                </select>
              </div>
            )}

            {gymId ? gymId : null}
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.mainInfoForm}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <strong>*</strong>Nombre:{" "}
              </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
              {error.name && <p className={styles.danger}>{error.name}</p>}
            </div>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <strong>*</strong>Mensualidad:{" "}
              </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
              {error.price && <p className={styles.danger}>{error.price}</p>}
            </div>
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={styles.mainInfoForm}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <strong>*</strong>Telefono:{" "}
              </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
              {error.phone && <p className={styles.danger}>{error.phone}</p>}
            </div>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>Email: </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
              {error.email && <p className={styles.danger}>{error.email}</p>}
            </div>
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>Entrenadores: </label>

              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <input
                // className={error.name && styles.inputdanger}
                className={styles.inputImageLogo}
                type="text"
                name="names"
                value={name}
                onChange={(e) => {
                  // @ts-expect-error TS(2812): Property 'value' does not exist on type 'EventTarg... Remove this comment to see the full error message
                  setName(e.target.value);
                }}
                placeholder="nombre del entrenador"
              />

              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <button
                className={styles.btnAgregarFotos}
                onClick={(e) => {
                  addTrainer(e);
                }}
              >
                +{" "}
              </button>

              {/* {error.email && <p className={styles.danger}>{error.email}</p>} */}

              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <ul>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <li>
                  {newGym.trainers.length && typeAction === "create"
                    ? newGym.trainers.map((e) => (
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <div key={e} className={styles.listTrainGym}>
                          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                          <div className={styles.trainersStyle}>
                            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                            <p>{e} </p>
                            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                            <button value={e} onClick={(e) => handleDeleteT(e)}>
                              x
                            </button>{" "}
                          </div>
                        </div>
                      ))
                    : null}

                  {editGym.trainers.length && typeAction === "edit"
                    ? editGym.trainers.map((e) => (
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <div key={e} className={styles.listTrainGym}>
                          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                          <div className={styles.trainersStyle}>
                            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                            <p style={{ marginTop: ".35rem" }}>{e} </p>
                            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>Fotos: </label>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              type="text"
              className={styles.inputImageLogo}
              name="photo"
              id="image"
              multiple
              value={photo}
              onChange={(e) => {
                // @ts-expect-error TS(2812): Property 'value' does not exist on type 'EventTarg... Remove this comment to see the full error message
                setPhoto(e.target.value);
              }}
              placeholder="https://foto-del-gym.jpg"
            />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <button
              className={styles.btnAgregarFotos}
              onClick={(e) => {
                addPhoto(e);
              }}
            >
              +{" "}
            </button>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <ul>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: ".3rem",
                }}
              >
                {newGym.image.length && typeAction === "create"
                  ? newGym.image.map((e) => (
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <div key={e} className={styles.listfotosGym}>
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <div key={e} lassName={styles.listfotosGym}>
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{ marginTop: "1rem" }}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <MapGyms />
        </div>
      </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <p></p>
      {typeAction === "create" && (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button
          className={styles.btnCreateEditGym}
          onClick={(e) => {
            // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
            onClickCreateGym(e);
          }}
        >
          Crear Gym
        </button>
      )}
      {typeAction === "edit" && (
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button
          className={styles.btnCreateEditGym}
          onClick={(e) => {
            // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
            onClickEditGym(e);
          }}
        >
          {" "}
          Editar Gym
        </button>
      )}
    </div>
  );
}
