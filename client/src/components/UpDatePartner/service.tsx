import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './style/client.module.css' or ... Remove this comment to see the full error message
import styles from "./style/client.module.css";
import {
  serviceValidate,
  serviceValidateEdit,
} from "./controlers/validaciones";
import { useSelector } from "react-redux";
import { getMyGyms, getUser } from "../../redux/actions"; // --------------LA ACTION
import { useDispatch } from "react-redux";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { createOneService, editOneService } from "./controlers/Functions";
import { useEffect } from "react";

export default function Services() {
  const dispatch = useDispatch();
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const dataPartner = useSelector((state) => state.myGyms);
  let myGyms = dataPartner.gyms ? dataPartner.gyms : [];

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const userInfo = useSelector((state) => state.partnerDetails);
  let userPlan = userInfo.planType ? userInfo.planType : false;
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log(userPlan, "el plan del usuario partner");

  let filterServices = [];
  let dataEditService;

  const [myServices, setMyServices] = useState([]);
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const userId = localStorage.getItem("userId");

  const [typeAction, setTypeAcyion] = useState("create");
  // const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [gymId, setGymId] = useState("");
  const [serviceId, setServiceId] = useState("");

  const [newService, setNewService] = useState({
    name: "", // string requerido
    description: "", // string requerido
    duration: "", // numero en minutos
    price: "", // numero requerido
    photo: [], // Array de strings
    profileCategory: [],
  });

  const [editService, setEditService] = useState({
    name: "", // string requerido
    description: "", // string requerido
    duration: "", // numero en minutos
    price: "", // numero requerido
    photo: [], // Array de strings
    profileCategory: [],
  });

  const [error, setError] = useState({});

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
    setEditService({
      name: "", // string requerido
      description: "", // string requerido
      duration: "", // numero en minutos
      price: "", // numero requerido
      photo: [], // Array de strings
      profileCategory: [],
    });
    setNewService({
      name: "", // string requerido
      description: "", // string requerido
      duration: "", // numero en minutos
      price: "", // numero requerido
      photo: [], // Array de strings
      profileCategory: [],
    });
    setError({});
  }

  function validatePlanServices(userPlan: any, partnerGym: any) {
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(
      userPlan,
      partnerGym,
      "el plan del partner contra los servicios"
    );
    // // userPlan es un string o un booleano-> false || "Premium" ||
    // // "Estandar" || "Golden"
    // // parnerGmy -> Es un arreglo con un objeto, con una propiedad services
    // // que es un array donde cada elemento es un servicio (un elemento por cada servicio)

    let planType;
    let maxService;
    let services;
    if (userPlan === false) {
      // si el usuario no tiene plan
      return `La cuenta no tiene asignado un plan, no puede crear un gimnasios`;
    }
    planType = userPlan.planName; // tipo de plan
    maxService = userPlan.servicePerGym; // cantidad de servicios máximos por gym
    services = partnerGym[0].services; // cantidad de servicios que tiene el gym (es un array)

    // console.log(planType, 'tipo de plan', maxService, 'cantidad de servicios máximos', services, 'servicios',)

    // if (planType === "Estandar" && partnerGym.length === 1 ) { // Máximo un gym, nada más
    if (planType === "Standar" && services.length === Number(maxService)) {
      // De pruebaa, el que vale es el que sigue
      return `La cuenta Estandar solo permite crear hasta cinco servicios por cada gimnasio,
      si desea crear más servicios debería cambiar de plan.`;
    }
    if (planType === "Premium" && services.length === Number(maxService)) {
      return `La cuenta Premium solo permite crear hasta diez servicios por cada gimnasio,
      si desea crear más gimnasios debería cambiar de plan.`;
    }
    if (planType === "Golden" && services.length === Number(maxService)) {
      return `La cuenta Golden le permite crear hasta cien servicios por cada gimnasio,
      no es posible crear más servicios.`;
    }

    return true;
  }

  //----------------------------------------------------------------------------
  // Esta función sirve para crear un gym
  //----------------------------------------------------------------------------
  async function onClickCreateService() {
    let validateS = await validatePlanServices(userPlan, myServices);
    // userPlan es un objeto que tiene info del plan del user
    // myService es un array (un gym) de objetos(servicios de ese gym),
    // donde cada objeto es un servicio asociado a ese gym en particular

    if (typeof validateS === "string") {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      return SweetAlrt(validateS);
    }

    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    if (error.name || error.description || error.price) {
      return SweetAlrtTem("Los valores ingresados son incorrectos", "warning");
    } else if (
      !newService.name ||
      !newService.description ||
      !newService.price ||
      !gymId
    ) {
      return SweetAlrtTem("Completa los campos  minimo requeridos", "warning");
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      SweetAlrt("Estamos procesando su solicitud!");

      let dataForNewService = {
        gymId: { gymId: gymId },
        dataNewService: newService,
      };

      // gymId: el id del gym que crea el servicio
      // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("recibe el click y crea un service");
      let newOnService = await createOneService(dataForNewService);

      if (newOnService) {
        SweetAlrt("Exito", "Servicio creado", "success");
        // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
        dispatch(getMyGyms(userId));
      } else {
        // @ts-expect-error TS(2554): Expected 3 arguments, but got 2.
        SweetAlrt("Ocurrió un error y el servicio no fue creado", "error");
      }
      setNewService({
        name: "", // string requerido
        description: "", // string requerido
        duration: "", // numero en minutos
        price: "", // numero requerido
        photo: [], // Array de strings
        profileCategory: [],
      });
      return newOnService;
    }
  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym
  //----------------------------------------------------------------------------

  async function onClickEditService() {
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    if (error.name || error.description || error.price) {
      return SweetAlrtTem("Los valores ingresados son incorrectos", "warning");
    } else if (
      !editService.name &&
      !editService.description &&
      !editService.price
    ) {
      return SweetAlrtTem("Completa los datos minimos requeridos", "warning");
    } else {
      // @ts-expect-error TS(2554): Expected 3 arguments, but got 1.
      SweetAlrt("Estamos procesando su solicitud!");
      let dataForEditService = {
        serviceId: { serviceId: serviceId },
        newDataService: editService,
      };

      // serviceId: el id del service a editar
      // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("recibe el click y edita un gym");
      let editOnService = await editOneService(dataForEditService);
      SweetAlrt("Exito", "Servicio editado", "success");
      setEditService({
        name: "", // string requerido
        description: "", // string requerido
        duration: "", // numero en minutos
        price: "", // numero requerido
        photo: [], // Array de strings
        profileCategory: [],
      });
      return editOnService;
    }
  }

  //----------------HANDLECHANGE----------------------------------------------
  function handleChange(e: any) {
    if (typeAction === "create") {
      setNewService(() => {
        const newInput = {
          ...newService,
          [e.target.name]: e.target.value,
        };
        const errors = serviceValidate(newInput);
        setError(errors);
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(newInput);
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(errors);
        return newInput;
      });
    }

    if (typeAction === "edit") {
      setEditService(() => {
        const newInput = {
          ...editService,
          [e.target.name]: e.target.value,
        };
        const errors = serviceValidateEdit(newInput);
        setError(errors);
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(newInput);
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(errors);
        return newInput;
      });
    }
  }

  function handleChangeGyms(e: any) {
    if (e.target.value !== "...") {
      e.preventDefault();
      let value = e.target.value;
      //
      // let myGyms = dataPartner.gyms ? dataPartner.gyms : [];
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(myGyms);

      filterServices = myGyms.length && myGyms.filter((e: any) => e._id === value);

      setMyServices(filterServices);

      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(filterServices, " los servicios del gym");

      // Seteamos el id del servicio
      setGymId(e.target.value);
      // console.log(e.target.value, ' Service select dentro del if')
    } else {
      setGymId("");
    }
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(e.target.value, " Service select");
  }

  function handleChangeService(e: any) {
    if (e.target.value !== "...") {
      e.preventDefault();
      // Seteamos el id del servicio
      setServiceId(e.target.value);
      // console.log(e.target.value, ' Service update select dentro del if ')
      dataEditService = myServices;
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(dataEditService, "luego de seleccionar un sevice");
    } else {
      setServiceId("");
    }
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(e.target.value, " Service update en el select");
  }

  function addPhoto(e: any) {
    e.preventDefault();

    if (photo && typeAction === "create") {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!newService.photo.includes(photo)) {
        // console.log('entra');
        let newState = [...newService.photo];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(photo);

        setNewService({
          ...newService,
          photo: newState,
        });
      }
    }
    if (photo && typeAction === "edit") {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!editService.photo.includes(photo)) {
        let newState = [...editService.photo];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newState.push(photo);

        setEditService({
          ...editService,
          photo: newState,
        });
      }
    }
    // console.log(editGym.image)
    // console.log(newGym.image)
    setPhoto("");
  }

  //----------------------- delete photo --------------------------------------
  function handleDeletePhoto(e: any) {
    e.preventDefault();

    if (typeAction === "create") {
      setNewService({
        ...newService,
        photo: newService.photo.filter((el) => el !== e.target.value),
      });
    }

    if (typeAction === "edit") {
      setEditService({
        ...editService,
        photo: editService.photo.filter((el) => el !== e.target.value),
      });
    }
  }

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.editPartnerMainContainer}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h3>
        FORMULARIO DE {typeAction === "create" ? "CREACIÓN" : "EDICIÓN"} DE
        PRODUCTO O SERVICIO
      </h3>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{display: "flex", alignItems: "center", gap: ".8rem", justifyContent: "center", margin: "1rem auto"}}>
          {typeAction === "edit" ? (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <button
              className={styles.btnCreateEditGym}
              onClick={() => {
                setTypeAcyion("create");
              }}
            >
              Ir a crear Servicio
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
              Ir a editar Servicio
            </button>
          )}

          {/* {typeAction ? typeAction : null} */}

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button
            className={styles.btnCreateEditGym}
            onClick={(e) => refreshState(e)}
          >
            Recargar
          </button>
        </div>

        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <form
          action=""
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
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
            {/* {gymId ? gymId : null} */}
          </div>

          {typeAction === "edit" ? (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <div>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <label>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <strong>*</strong>Servicio:{" "}
              </label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <select onChange={(e) => handleChangeService(e)}>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <option key="id2">...</option>
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                {myServices.length > 0 && myServices[0].services.length > 0
                  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                  ? myServices[0].services.map((s: any) => <option key={s._id} value={s._id}>
                  {s.name}
                </option>)
                  : null}
              </select>
              {/* {serviceId ? serviceId : null} */}
            </div>
          ) : null}

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <strong>*</strong>Nombre:{" "}
            </label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              className={
                // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                error.name ? styles.inputdanger : styles.inputImageLogo
              }
              type="text"
              name="name"
              value={
                typeAction === "create" ? newService.name : editService.name
              }
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Nombre del servicio..."
            />
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            {error.name && <p className={styles.danger}>{error.name}</p>}
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <strong>*</strong>Descripcion:{" "}
            </label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              className={
                // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
                error.description ? styles.inputdanger : styles.inputImageLogo
              }
              onChange={(e) => handleChange(e)}
              value={
                typeAction === "create"
                  ? newService.description
                  : editService.description
              }
              type="text"
              name="description"
              placeholder="Una breve descripcion..."
            />{" "}
            // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
            {error.description && (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <p className={styles.danger}>{error.description}</p>
            )}
            {typeAction === "create" ? (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <p>{newService.description}</p>
            ) : (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <p>{editService.description}</p>
            )}
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <strong>*</strong>Precio:{" "}
            </label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              className={
                // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
                error.name ? styles.inputdanger : styles.inputImageLogo
              }
              type="number"
              name="price"
              value={
                typeAction === "create" ? newService.price : editService.price
              }
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="$..."
            />
            // @ts-expect-error TS(2339): Property 'price' does not exist on type '{}'.
            {error.price && <p className={styles.danger}>{error.price}</p>}
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <strong>*</strong>Fotos:{" "}
            </label>

            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              type="text"
              name="photo"
              id="image"
              multiple
              className={styles.inputImageLogo}
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
              <li>
                {newService.photo.length && typeAction === "create"
                  ? newService.photo.map((e) => (
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <div key={e}>
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <button
                          className={styles.btnFotosGym}
                          value={e}
                          onClick={(e) => handleDeletePhoto(e)}
                        >
                          x
                        </button>
                      </div>
                    ))
                  : null}

                {editService.photo.length && typeAction === "edit"
                  ? editService.photo.map((e) => (
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <div key={e}>
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <img
                          className={styles.photoform}
                          src={e}
                          key={e}
                          alt="No Found"
                        />
                        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                        <button value={e} onClick={(e) => handleDeletePhoto(e)}>
                          x
                        </button>{" "}
                      </div>
                    ))
                  : null}
              </li>
            </ul>
          </div>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <label>Duracion:</label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <input
              className={styles.inputImageLogo}
              type="range"
              name="duration"
              min="1"
              max="90"
              step="1"
              value={
                typeAction === "create"
                  ? newService.duration
                  : editService.duration
              }
              // onClick={(e) => validateSubmit(e)}
              onChange={(e) => handleChange(e)}
            />
            {typeAction === "create" && newService.duration
              ? `${newService.duration} minutos`
              : null}
            {typeAction === "edit" && editService.duration
              ? `${editService.duration} minutos`
              : null}

            // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
            {error.duration && (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <p className={styles.danger}>{error.duration}</p>
            )}
          </div>
        </form>
      </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <p></p>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div style={{ marginTop: "1rem" }}>
        {typeAction === "create" && (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button
            className={styles.btnCreateEditGym}
            onClick={(e) => {
              // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
              onClickCreateService(e);
            }}
          >
            Crear servicio
          </button>
        )}
        {typeAction === "edit" && (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button
            className={styles.btnCreateEditGym}
            onClick={(e) => {
              // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
              onClickEditService(e);
            }}
          >
            {" "}
            Editar servicio
          </button>
        )}
      </div>
    </div>
  );
}
