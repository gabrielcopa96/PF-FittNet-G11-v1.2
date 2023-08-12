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
  async function onClickCreateService() {
    let dataForNewService = {
      gymId: { gymId: "gymId" },
      dataNewService: { prop1: "data1", prop2: 2, prop3: [], prop4: {} }
    };

    // gymId: el id del gym que crea el servicio
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

    console.log('recibe el click y crea un service')

    let newService = await createOneService(dataForNewService);

    return newService;

  }

  //----------------------------------------------------------------------------
  // Esta función sirve para editar la info de un gym       
  //----------------------------------------------------------------------------

  async function onClickEditService() {
    let dataForEditService = {
      serviceId: { serviceId: "serviceId" },
      newDataService: { prop1: "data2", prop2: 3, prop3: ["algo"], prop4: {} }
    };

    // serviceId: el id del service a editar
    // dataNewService: en este objeto va todo lo que obtienen del formulario (el input de arriba)

    console.log('recibe el click y edita un gym')

    let editOnService = await editOneService(dataForEditService);

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
    console.table(input);
  }
  //!------------------photo---------------
  function handleChangephoto(e: any) {
    setInput((): any => {
      const newphoto = {
        ...input,
        photo: (input as any).photo.includes(e.target.value)
          ? [...input.photo]
          : [...input.photo, e.target.value],
      };

      return newphoto;
    });
    console.log(input.photo);
  }
  //!deleted photo
  function handleDeleteI(e: any) {
    setInput({
      ...input,
      photo: input.photo.filter((el) => el !== e.target.value),
    });
    console.log("Trainers borrado:", e);
  }
  //!-----------------------GYMS----------------------
  function handleChangeGyms(e: any) {
    setInput(() => {
      const newGyms = {
        ...input,
        gyms: (input as any).gyms.includes(e.target.value)
          ? [...(input as any).gyms]
          : [...(input as any).gyms, e.target.value],
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
    console.log("ESTO ES DELET", e);
  }
  //!------------------SUBMIT------------------------
  function handleSubmit(e: any) {
    e.preventDefault();
    if (
      !input.name ||
      !input.duration ||
      !input.description ||
      !(input as any).objTraining
    ) {
      return SweetAlrt("Error", "Todos los campos deben estar completos", "error")
      // return alert("Todos los campos deben estar completos!");
    } else {
      //dispatch(createService(input));
      SweetAlrtTem("Exito! servicio creado", "success")
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
    <div className={styles.editPartnerMainContainer}>
      <h1>FORMULARIO DE SERVICIOS</h1>
      <div>
        <p>
          <button onClick={() => { onClickCreateService() }}>Crear service de prueba</button>
        </p>
        <p>
          <button onClick={() => { onClickEditService() }}> Editar service de prueba</button>
        </p>






      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre: </label>
          <input
            className={(error as any).name && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.name}
            type="text"
            name="name"
            placeholder="Nombre de la actividad o servicio..."
          />{" "}
          {(error as any).name && <p className={styles.danger}>{(error as any).name}</p>}
        </div>
        <div>
          <label>Descripcion: </label>
          <input
            className={(error as any).description && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={input.description}
            type="text"
            name="description"
            placeholder="Una breve descripcion..."
          />{" "}
          {(error as any).description && (
            <p className={styles.danger}>{(error as any).description}</p>
          )}
          <text>{input.description}</text>
        </div>
        <div>
          <label>Duracion:</label>
          <input
            type="checkbox"
            name="duration"
            value="1"
            onChange={(e) => handleChange(e)}
          />
          1 Hora
          <input
            type="checkbox"
            name="duration"
            value="2"
            onChange={(e) => handleChange(e)}
          />
          2 Hora
          <input
            type="checkbox"
            name="duration"
            value="3"
            onChange={(e) => handleChange(e)}
          />
          3 Hora
          <input
            type="checkbox"
            name="duration"
            value="4"
            onChange={(e) => handleChange(e)}
          />
          4 Hora
          <input
            type="checkbox"
            name="duration"
            value="5"
            onChange={(e) => handleChange(e)}
          />
          5 Hora
          {(error as any).duration && <p className={styles.danger}>{(error as any).duration}</p>}
        </div>
        <div>
          <label>Gimnasios: </label>
          <select onChange={(e) => handleChangeGyms(e)}>
            {gimnasios.map((e) => (
              <option>{e}</option>
            ))}
          </select>
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
        <div>
          <label>Fotos: </label>

          <input
            value={input.photo}
            onChange={(e) => handleChangephoto(e)}
            type="file"
            name="photo"
            id="photo"
            multiple
          />
          <ul>
            <li className={styles.input}>
              {input.photo.map((e) => (
                <div key={e}>
                  <p>{e} </p>
                  <img
                    // @ts-expect-error TS(2322): Type '{ e: never; }' is not assignable to type 'st... Remove this comment to see the full error message
                    src={{ e } || "https://via.placeholder.com/150 "}
                    key={e}
                    alt="No Found"
                  />
                  <button value={e} onClick={(e) => handleDeleteI(e)}>
                    x
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div>
        <div>
          <label>Objetivos del Entrenamiento</label>
          <input
            className={(error as any).objTraining && styles.inputdanger}
            onChange={(e) => handleChange(e)}
            value={(input as any).objTraining}
            type="text"
            name="objTraining"
            placeholder="Objetivos..."
          />{" "}
          {(error as any).objTraining && (
            <p className={styles.danger}>{(error as any).objTraining}</p>
          )}
          <text>{(input as any).objTraining}</text>
        </div>
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}