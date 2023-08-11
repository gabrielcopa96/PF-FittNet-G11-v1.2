import { useState, useEffect } from "react";
// @ts-expect-error TS(2307): Cannot find module './style/client.module.css' or ... Remove this comment to see the full error message
import styles from "./style/client.module.css";
import { partnerValidacion } from "./controlers/validaciones";
import { useDispatch, useSelector } from "react-redux";
import { updatePartnerData, getPartnerDetails } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { SweetAlrt } from "../../asets/helpers/sweetalert";

export default function UpdatePartner() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getPartnerDetails(userId)); // eslint-disable-next-line
  }, []);

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const partner = useSelector((state) => state.partnerDetails);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const usuario = useSelector((state) => state.user);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gym = useSelector((state) => state.gyms);

  const [stateForm, setStateForm] = useState({ form: "false" });

  const [name, setName] = useState("");
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    cbu: "",
    ciul: "",
    gyms: [],
    socialNetworks: [],

    id: "",
  });

  const [error, setError] = useState({});

  const ID = params.userId;

  const nameU = params.name;

  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("esto seria el ID", ID);
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("esto serian los gmy", gym);
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("Datos usuario", usuario);
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("Datos partner", partner);

  //!----------------HANDLECHANGE-----------------------
  function handleChange(e: any) {
    // @ts-expect-error TS(2345): Argument of type '() => { id: string | undefined; ... Remove this comment to see the full error message
    setInput(() => {
      const newInput = {
        ...input,
        [e.target.name]: e.target.value,

        id: ID,
      };
      const errors = partnerValidacion(newInput, e.target.name);
      setError(errors);
      return newInput;
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.table(input);
  }

  //!-------------------GYMS-----------------------------
  // function handleChangeGyms(e) {
  //   setInput(() => {
  //     const newGyms = {
  //       ...input,
  //       gyms: e.target.value,
  //     };
  //     return newGyms;
  //   });
  // }
  //!------------------socialNetworks---------------
  function addSocial(e: any) {
    e.preventDefault();
    if (name) {
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      if (!input.socialNetworks.includes(name)) {
        let newSocial = [...input.socialNetworks];
        // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        newSocial.push(name);

        setInput({
          ...input,
          socialNetworks: newSocial,
        });
      }
    }
    setName("");
  }

  // //!deleted socialNetworks
  function handleDeleteSocial(e: any) {
    setInput({
      ...input,
      socialNetworks: input.socialNetworks.filter(
        (el) => el !== e.target.value
      ),
    });
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("ESTO ES DELET", e);
  }

  //!------------------SUBMIT------------------------
  function handleSubmit(e: any) {
    e.preventDefault();

    if (stateForm) {
      if (stateForm.form === "true") {
        let payload = {
          id: userId,
          name: input.name === "" ? partner.name : input.name,
          lastName: input.lastName === "" ? partner.lastName : input.lastName,
          email: input.email === "" ? partner.email : input.email,
          phone: input.phone === "" ? partner.phone : input.phone,
          cbu: input.cbu === "" ? partner.cbu : input.cbu,
          // @ts-expect-error TS(2339): Property 'cuil' does not exist on type '{ name: st... Remove this comment to see the full error message
          ciul: input.cuil === "" ? partner.cuil : input.cuil,
          // socialNetworks: [],
        };
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(payload, "lo que se envia");
        // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<any>'... Remove this comment to see the full error message
        dispatch(updatePartnerData(payload));
        // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
        dispatch(getPartnerDetails(userId));
        SweetAlrt("Exito!", "Perfil Editado", "success");
        setInput({
          ...input,
          name: "",
          lastName: "",
          email: "",
          phone: "",
          cbu: "",
          ciul: "",
          gyms: [],
          socialNetworks: [],

          id: "",
        });
        setError({});
        navigate(`/profile/partner/${nameU}/${ID}`);
      } else {
        SweetAlrt(
          "Hace click en 'Confirmar Datos'",
          "Por seguridad confirma que los datos ingresados son correctos",
          "info"
        );
      }
    } else {
      SweetAlrt(
        "Hace click en 'Confirmar Datos'",
        "Por seguridad confirma que los datos ingresados son correctos",
        "info"
      );
    }
  }

  function handleButton(e: any) {
    return setStateForm({
      ...stateForm,
      [e.target.name]: e.target.value,
    });
  }
  // console.log(input.name);

  //!--------------------------------------------------

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.editPartnerMainContainer}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <h3>Mi Perfil</h3>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <br />
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <form onSubmit={handleSubmit}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Nombre: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
            className={(error.name && styles.inputdanger) || styles.input}
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.name ? partner.name : "Nombre prueba..."}
          />
          // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
          {error.name && <p className={styles.danger}>{error.name}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Apellido: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'lastName' does not exist on type '{}'.
            className={(error.lastName && styles.inputdanger) || styles.input}
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.lastName ? partner.lastName : "Apellido..."}
          />
          // @ts-expect-error TS(2339): Property 'lastName' does not exist on type '{}'.
          {error.lastName && <p className={styles.danger}>{error.lastName}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Email: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
            className={(error.email && styles.inputdanger) || styles.input}
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.email ? partner.email : "correo@ejemplo.com"}
          />
          // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
          {error.email && <p className={styles.danger}>{error.email}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Telefono: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
            className={(error.phone && styles.inputdanger) || styles.input}
            type="tel"
            name="phone"
            value={input.phone}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.phone ? partner.phone : "+549......"}
          />
          // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
          {error.phone && <p className={styles.danger}>{error.phone}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <strong>Cbu:</strong>{" "}
          </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'cbu' does not exist on type '{}'.
            className={(error.cbu && styles.inputdanger) || styles.input}
            type="number"
            name="cbu"
            value={input.cbu}
            onChange={(e) => {
              handleChange(e);
            }}
            max="99999999999999999"
            placeholder={partner.cbu ? partner.cbu : "2590046210320129"}
          />
          // @ts-expect-error TS(2339): Property 'cbu' does not exist on type '{}'.
          {error.cbu && <p className={styles.danger}>{error.cbu}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <strong>Cuil:</strong>{" "}
          </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            // @ts-expect-error TS(2339): Property 'ciul' does not exist on type '{}'.
            className={(error.ciul && styles.inputdanger) || styles.input}
            type="number"
            name="cuil"
            max="99999999999"
            // @ts-expect-error TS(2339): Property 'cuil' does not exist on type '{ name: st... Remove this comment to see the full error message
            value={input.cuil}
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder={partner.cuil ? partner.cuil : "12349876136"}
          />
          // @ts-expect-error TS(2339): Property 'cuil' does not exist on type '{}'.
          {error.cuil && <p className={styles.danger}>{error.cuil}</p>}
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>Redes Sociales: </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            className={styles.input}
            type="text"
            name="names"
            value={name}
            onChange={(e) => {
              // @ts-expect-error TS(2812): Property 'value' does not exist on type 'EventTarg... Remove this comment to see the full error message
              setName(e.target.value);
            }}
          />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <button onClick={(e) => addSocial(e)}>Agregar</button>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ul>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <li className={styles.inputLista}>
              {input.socialNetworks.length
                ? input.socialNetworks.map((e) => (
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <div key={e}>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <p>{e} </p>
                      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                      <button value={e} onClick={(e) => handleDeleteSocial(e)}>
                        x
                      </button>{" "}
                    </div>
                  ))
                : null}
            </li>
          </ul>
        </div>
        {/* <div>
          <label>Gimnasios: </label>
          <select
            className={styles.input}
            onChange={(e) => handleChangeGyms(e)}
          >
            {partner.gyms?.map((e) => (
              <option key={e._id} name={e.name} value="gyms">
                {e.name}
              </option>
            ))}
          </select>
          <ul>
            <li>
              {partner.gyms?.map((e) => (
                <div key={e._id}>
                  <p>{e.name} </p>
                  <button value={e._id} onClick={(e) => handleEditGyms(e)}>
                    Editar
                  </button>{" "}
                </div>
              ))}{" "}
            </li>
          </ul>
        </div> */}
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <br />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <br />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <label>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <strong>Confirmar Datos</strong>{" "}
          </label>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <input
            className={styles.inputLista}
            type="checkbox"
            onClick={(e) => handleButton(e)}
            name="form"
            value="true"
          />
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <br />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <br />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <button type="submit">Enviar Formulario</button>
      </form>
    </div>
  );
}
