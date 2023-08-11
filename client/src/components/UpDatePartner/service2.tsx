import { useState } from "react";
// @ts-expect-error TS(2307): Cannot find module './style/client.module.css' or ... Remove this comment to see the full error message
import styles from "./style/client.module.css";
import { serviceValidate } from "./controlers/validaciones";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createService } from "../../redux/actions";
import { SweetAlrt, SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { createOneService, editOneService } from "./controlers/Functions";

export default function Services2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "dfdf", // string requerido
    description: "", // string requerido
    duration: 0, //numero requerido
    price: 0, //numero requerido
    photo: [],
    profileCategory: [],
  });
  const [error, setError] = useState({});
  
  
  //----------------------------------------------------------------------------
  // Faltaría tener un select o un switch para saber si se está creando o editando,
  // pero de todas formas usamos el mismo form para las dos cosas (crear y editar)   
  //----------------------------------------------------------------------------


  //----------------------------------------------------------------------------
  // Esta función sirve para crear un gym           
  //----------------------------------------------------------------------------
  async function onClickCreateService () {
    let dataForNewService = { 
      gymId: { gymId: "gymId" },
      dataNewService: { prop1: "data1", prop2: 2, prop3: [], prop4: {} }
    };
    
    // gymId: el id del gym que crea el servicio
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log('recibe el click y crea un service')

    let newService = await createOneService (dataForNewService);

    return newService;

  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym       
  //----------------------------------------------------------------------------

  async function onClickEditService () {
    let dataForEditService = { 
      serviceId: { serviceId: "serviceId" },
      newDataService: { prop1: "data2", prop2: 3, prop3: ["algo"], prop4: {} }
    };

    // serviceId: el id del service a editar
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)
    
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log('recibe el click y edita un gym')

    let editOnService = await editOneService (dataForEditService);

    return editOnService;

  }

































  //!---------------handleCahnge---------------------
  function handleChange(e: any) {
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,
      };
      const errors = serviceValidate(newInput);
      setError(errors);
      return newInput;
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.table(input);
  }
  //!------------------photo---------------
  function handleChangephoto(e: any) {
    // @ts-expect-error TS(2345): Argument of type '() => { photo: any[]; name: stri... Remove this comment to see the full error message
    setInput(() => {
      const newphoto = {
        ...input,
        // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        photo: input.photo.includes(e.target.value)
          ? [...input.photo]
          : [...input.photo, e.target.value],
      };

      return newphoto;
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(input.photo);
  }
  //!deleted photo
  function handleDeleteI(e: any) {
    setInput({
      ...input,
      photo: input.photo.filter((el) => el !== e.target.value),
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("Trainers borrado:", e);
  }
  //!-----------------------GYMS----------------------
  function handleChangeGyms(e: any) {
    setInput(() => {
      const newGyms = {
        ...input,
        // @ts-expect-error TS(2339): Property 'gyms' does not exist on type '{ name: st... Remove this comment to see the full error message
        gyms: input.gyms.includes(e.target.value)
          // @ts-expect-error TS(2339): Property 'gyms' does not exist on type '{ name: st... Remove this comment to see the full error message
          ? [...input.gyms]
          // @ts-expect-error TS(2339): Property 'gyms' does not exist on type '{ name: st... Remove this comment to see the full error message
          : [...input.gyms, e.target.value],
      };
      return newGyms;
    });
  }

  //!deleted Gyms
  function handleDelete(e: any) {
    setInput({
      ...input,
      // @ts-expect-error TS(2345): Argument of type '{ gyms: any; name: string; descr... Remove this comment to see the full error message
      gyms: input.gyms.filter((el: any) => el !== e.target.value),
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("ESTO ES DELET", e);
  }
  //!------------------SUBMIT------------------------
  // @ts-expect-error TS(7030): Not all code paths return a value.
  function handleSubmit(e: any) {
    e.preventDefault();
    if (
      !input.name ||
      !input.duration ||
      !input.description ||
      // @ts-expect-error TS(2339): Property 'objTraining' does not exist on type '{ n... Remove this comment to see the full error message
      !input.objTraining
    ) {
      return SweetAlrt("Error","Todos los campos deben estar completos", "error")
      // return alert("Todos los campos deben estar completos!");
    } else {
      //dispatch(createService(input));
      SweetAlrtTem("Exito! servicio creado","success")
      // alert("Service creado!");
      setInput({
        ...input,
        name: "",
        description: "",
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
        duration: "",
        gyms: "",
        uEnd: "",
        photo: [],
        objTraining: "",
      });
      setError({});
      navigate("/profile/partner");
    }
  }
  const gimnasios = ["Pesao Gym", "Olimpo", "FittNet", "Gym Henrys"];

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.editPartnerMainContainer}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h1>FORMULARIO DE SERVICIOS</h1>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>

        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <p>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button onClick={(e)=>{onClickCreateService(e)}}>Crear service de prueba</button>
        </p>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <p>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button onClick={(e)=>{onClickEditService(e)}}> Editar service de prueba</button>
        </p>






      </div>

      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <form onSubmit={handleSubmit}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Nombre: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            className={error.name && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.name}
            type="text"
            name="name"
            placeholder="Nombre de la actividad o servicio..."
          />{" "}
          // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
          {error.name && <p className={styles.danger}>{error.name}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Descripcion: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
            className={error.description && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.description}
            type="text"
            name="description"
            placeholder="Una breve descripcion..."
          />{" "}
          // @ts-expect-error TS(2339): Property 'description' does not exist on type '{}'... Remove this comment to see the full error message
          {error.description && (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <p className={styles.danger}>{error.description}</p>
          )}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <text>{input.description}</text>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Duracion:</label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            type="checkbox"
            name="duration"
            value="1"
            onChange={(e) => handleChange(e)}
          />
          1 Hora
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            type="checkbox"
            name="duration"
            value="2"
            onChange={(e) => handleChange(e)}
          />
          2 Hora
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            type="checkbox"
            name="duration"
            value="3"
            onChange={(e) => handleChange(e)}
          />
          3 Hora
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            type="checkbox"
            name="duration"
            value="4"
            onChange={(e) => handleChange(e)}
          />
          4 Hora
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            type="checkbox"
            name="duration"
            value="5"
            onChange={(e) => handleChange(e)}
          />
          5 Hora
          // @ts-expect-error TS(2339): Property 'duration' does not exist on type '{}'.
          {error.duration && <p className={styles.danger}>{error.duration}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Gimnasios: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <select onChange={(e) => handleChangeGyms(e)}>
            {gimnasios.map((e) => (
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <option>{e}</option>
            ))}
          </select>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ul>
            {/* <li>
              {input.gyms.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <button value={e} onClick={(e) => handleDelete(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li> */}
          </ul>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Fotos: </label>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            value={input.photo}
            onChange={(e) => handleChangephoto(e)}
            type="file"
            name="photo"
            id="photo"
            multiple
          />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ul>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <li className={styles.input}>
              {input.photo.map((e) => (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <div key={e}>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <p>{e} </p>
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <img
                    // @ts-expect-error TS(2322): Type '{ e: never; }' is not assignable to type 'st... Remove this comment to see the full error message
                    src={{ e } || "https://via.placeholder.com/150 "}
                    key={e}
                    alt="No Found"
                  />
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <button value={e} onClick={(e) => handleDeleteI(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Objetivos del Entrenamiento</label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'objTraining' does not exist on type '{}'... Remove this comment to see the full error message
            className={error.objTraining && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            // @ts-expect-error TS(2339): Property 'objTraining' does not exist on type '{ n... Remove this comment to see the full error message
            value={input.objTraining}
            type="text"
            name="objTraining"
            placeholder="Objetivos..."
          />{" "}
          // @ts-expect-error TS(2339): Property 'objTraining' does not exist on type '{}'... Remove this comment to see the full error message
          {error.objTraining && (
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <p className={styles.danger}>{error.objTraining}</p>
          )}
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <text>{input.objTraining}</text>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}