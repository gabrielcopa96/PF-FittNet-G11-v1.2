import React from "react";
import { useState, useEffect } from "react";

import validate from "./validation";
// @ts-expect-error TS(2307): Cannot find module './styles/form.module.css' or i... Remove this comment to see the full error message
import styles from "./styles/form.module.css";
import { updateUserInfo } from "../../redux/actions/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapUser from "../MapsAndGeo/MapUser";
import { getAttributeDesease } from "../../redux/actions/index";
import { InputPrimaryFormUsers } from "../../helpers/Inputs/Inputs.jsx";
import { ButtonSecondaryDeslice } from "../../helpers/Buttons/Buttons.jsx";
import { SweetAlrtTem } from "../../asets/helpers/sweetalert";

export default function FormUser() {
  const navigate = useNavigate();

  const { userId } = useParams();

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const name = localStorage.getItem("name");
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const deseaseAttribute = useSelector((state) => state.deseaseAttribute);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const user = useSelector((state) => state.user);
  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log("user", user);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<any>'... Remove this comment to see the full error message
    dispatch(getAttributeDesease());
  }, []);

  const [dese, setDese] = useState({
    desease: [],
    trainlimits: "",
    considerations: "",
  });
  const [input, setInput] = useState({
    avatar: avatar,
    lastname: user.info?.lastName ? user.info.lastName : "",
    phone: user.info?.phone ? user.info.phone : "",
    birthday: user.info?.birthday ? user.info.birthday : "",
    gender: user.info?.gender ? user.info.gender : "",
    photo: user.info?.photo ? user.info.photo : "",
    address: user.info?.address?.address ? user.info.address.address : "",
    apartment: user.info?.address?.apartment ? user.info.address.apartment : "",
    neighborhood: user.info?.address?.neighborhood
      ? user.info.address.neighborhood
      : "",
    city: user.info?.address?.city ? user.info.address.city : "",
    country: user.info?.address?.country ? user.info.address.country : "",
    zipCode: user.info?.address?.zipCode ? user.info.address.zipCode : "",
    desease:
      /* user.info?.diseases.desease ? user.info.diseases.desease : */ [],
    trainlimits:
      /* user.info?.diseases.considerations ? user.info.diseases.considerations : */ "",
    considerations:
      /* user.info?.diseases.trainlimits ? user.info.diseases.trainlimits :  */ "",
  });

  // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.log(deseaseAttribute);
  const [error, setError] = useState({});

  function handleOnChange(e: any) {
    const filtro = input.desease.filter(
      // @ts-expect-error TS(2339): Property 'toLowerCase' does not exist on type 'nev... Remove this comment to see the full error message
      (d) => d.toLowerCase() === e.target.value.toLowerCase()
    );
    if (e.target.name == "selDesease") {
      if (filtro.length) {
        SweetAlrtTem("deberias agregar una enfermedad diferente", "info");
      } else {
        setInput({
          ...input,
          // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
          desease: [...input.desease, e.target.value],
        });
        setError(
          validate({
            ...input,
            desease: [...input.desease, e.target.value],
          })
        );
      }
    } else if (e.target.name !== "inpDesease" && e.target.name !== "but") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("input", input);
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("error", error);
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("e", e);
  }

  async function handleOnChange2(e: any) {
    // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
    const preview = document.querySelector("img");
    // @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];
    // @ts-expect-error TS(2304): Cannot find name 'FileReader'.
    const reader = await new FileReader();
    reader.addEventListener(
      "load",
      async function () {
        preview.src = await reader.result;
        setInput({
          ...input,
          photo: preview.src,
        });
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("input", input);
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("error", error);
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("e", e);
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log("deseaseAttr", deseaseAttribute);
  }

  function handleSelect(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  /* function handleOnChange(e) {
    if (e.target.name !== "inpDesease" && e.target.name !== "but") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  
    
  */
  function handleDeleteDse(e: any) {
    /* if(input.desease.length === 1 && (!input.trainlimits && !input.considerations)) */
    if (input.desease.length === 1) {
      if (input.trainlimits || input.considerations) {
        setError({
          ...error,
          desease:
            "debes seleccionar las enfermedades que se relacionen con tu condicion",
        });
      }
      setInput({
        ...input,
        desease: input.desease.filter((c) => c !== e),
      });
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("e", e);
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("error", error);
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("input", input);
    }
    setInput({
      ...input,
      desease: input.desease.filter((c) => c !== e),
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(updateUserInfo(userId, input));
    navigate(`/home/${type}/${name}/${userId}/${avatar}`);
  }

  function handleDelete(e: any) {
    setInput({
      ...input,
      photo: "",
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <form className={styles.containerFormUser}>
        <div className={styles.containerUser}>
          <h2>Datos del Usuario</h2>
          <p>
            Aqui puedes completar los datos de tu información personal, esta
            información es muy importante para nosotros
            <br />
            tanto como lo es para tí, es por eso que la tratarémos con la mayor
            confidencialidad y discreción,
            <br />
            puedes consultar nuestro anuncio de privacidad aqui
          </p>
        </div>
        <div className={styles.formUserOne}>
          <div>
            <label style={{ fontWeight: "700" }}>Avatar: </label>
            <select
              // @ts-expect-error TS(2339): Property 'avatar' does not exist on type '{}'.
              className={error.avatar ? styles.inputError : styles.input}
              name="avatar"
              onChange={(e) => handleSelect(e)}
            >
              <option id="pok">--</option>
              <option>Solitario </option>
              <option>Agudo </option>
              <option>Sensitivo</option>
              <option>Estructurado</option>
              <option>Energetico</option>
            </select>
            // @ts-expect-error TS(2339): Property 'avatar' does not exist on type '{}'.
            {error.avatar && <p className={styles.parrafo}>{error.avatar}</p>}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <label style={{ fontWeight: "700" }}>Apellido: </label>
              <InputPrimaryFormUsers
                type="text"
                placeholder={user.info?.lastName}
                name="lastname"
                onChange={(e: any) => handleOnChange(e)}
              />
            </div>
            // @ts-expect-error TS(2339): Property 'lastname' does not exist on type '{}'.
            {error.lastname && (
              // @ts-expect-error TS(2339): Property 'lastname' does not exist on type '{}'.
              <p className={styles.parrafo}>{error.lastname}</p>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
              <label style={{ fontWeight: "700" }}>Telefono: </label>
              <InputPrimaryFormUsers
                type="text"
                placeholder="telefono"
                name="phone"
                onChange={(e: any) => handleOnChange(e)}
              />
            </div>
            // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
            {error.phone && <p className={styles.parrafo}>{error.phone}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
            <label style={{ fontWeight: "700" }}>Fecha Nacimiento: </label>
            <InputPrimaryFormUsers
              type="date"
              placeholder="DD/MM/AAAA"
              name="birthday"
              onChange={(e: any) => handleOnChange(e)}
            />
            // @ts-expect-error TS(2339): Property 'birthday' does not exist on type '{}'.
            {error.birthday && (
              // @ts-expect-error TS(2339): Property 'birthday' does not exist on type '{}'.
              <p className={styles.parrafo}>{error.birthday}</p>
            )}
          </div>
          <div>
            <label style={{ fontWeight: "700" }}>Genero: </label>
            <select
              // @ts-expect-error TS(2339): Property 'gender' does not exist on type '{}'.
              className={error.gender ? styles.inputError : styles.input}
              name="gender"
              onChange={(e) => handleSelect(e)}
            >
              <option id="GEN">--</option>
              <option value="femenine">femenino</option>
              <option value="male">masculino</option>
            </select>
          </div>
        </div>
        <div className={styles.containerImageUser}>
          <div style={{ height: "180px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".8rem",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
              }}
            >
              <label style={{ fontWeight: "700" }}>Foto Perfil </label>
              <div className={styles.inputFileContainer}>
                <label htmlFor="image" className={styles.formLabel}>
                  <input
                    type="file"
                    name="photo"
                    id="image"
                    className={styles.inputFile}
                    onChange={(e) => handleOnChange2(e)}
                  />
                  <span className={styles.formText}>Adjunta imagen</span>
                </label>
              </div>
            </div>
            // @ts-expect-error TS(2339): Property 'photo' does not exist on type '{}'.
            {error.photo && <p className={styles.parrafo}>{error.photo}</p>}
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
          >
            {!input.photo ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqh5pmaPkqtRlk67znEF2s4NADR2URCfOlOQ&usqp=CAU"
                alt="avatar"
                style={{ borderRadius: ".6rem" }}
              />
            ) : (
              <img
                src={input.photo}
                alt="tu foto"
                style={{ borderRadius: ".6rem", width: "200px" }}
              />
            )}
            {input.photo && (
              <button
                className={styles.btnQuitarFoto}
                type="button"
                // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
                onClick={() => handleDelete()}
              >
                Quitar foto
              </button>
            )}
          </div>
        </div>

        <div className={styles.containerDiseases}>
          <h2 style={{ color: "#fff" }}>Enfermedades</h2>

          <div className={styles.boxContainerDes}>
            <div className={styles.boxDiseases}>
              <select
                name="selDesease"
                onChange={(e) => handleOnChange(e)}
                className={styles.input}
              >
                <option id="des" disabled>
                  Desease...
                </option>
                {deseaseAttribute.map((e: any) => {
                  return (
                    <option value={e.deseaseName} key={e._id}>
                      {e.deseaseName}{" "}
                    </option>
                  );
                })}
              </select>
              <textarea
                // @ts-expect-error TS(2339): Property 'trainlimits' does not exist on type '{}'... Remove this comment to see the full error message
                className={error.trainlimits ? styles.inputError : styles.input}
                // @ts-expect-error TS(2322): Type '{ className: any; type: string; placeholder:... Remove this comment to see the full error message
                type="text"
                placeholder="limtitaciones"
                name="trainlimits"
                onChange={(e) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'trainlimits' does not exist on type '{}'... Remove this comment to see the full error message
              {error.trainlimits && (
                // @ts-expect-error TS(2339): Property 'trainlimits' does not exist on type '{}'... Remove this comment to see the full error message
                <p className={styles.parrafo}>{error.trainlimits}</p>
              )}
              <textarea
                className={
                  // @ts-expect-error TS(2339): Property 'considerations' does not exist on type '... Remove this comment to see the full error message
                  error.considerations ? styles.inputError : styles.input
                }
                // @ts-expect-error TS(2322): Type '{ className: any; type: string; placeholder:... Remove this comment to see the full error message
                type="text"
                placeholder="consideraciones"
                name="considerations"
                onChange={(e) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'considerations' does not exist on type '... Remove this comment to see the full error message
              {error.considerations && (
                // @ts-expect-error TS(2339): Property 'considerations' does not exist on type '... Remove this comment to see the full error message
                <p className={styles.parrafo}>{error.considerations}</p>
              )}
            </div>
            {/* <div className={styles.listDesease}> */}
            <div className={styles.contDesBenef}>
              <div className={styles.containerElecciones}>
                {input.desease.map((e) => (
                  <div className={styles.deseaseNameWithTip} key={e}>
                    <p>{e}</p>
                    <div
                      className={styles.btn}
                      // @ts-expect-error TS(2322): Type '{ children: string; className: any; type: st... Remove this comment to see the full error message
                      type="button"
                      onClick={() => handleDeleteDse(e)}
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
              {input.desease.length > 0 &&
                deseaseAttribute.map((e: any) => {
                  return (
                    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                    input.desease.includes(e.deseaseName) && (
                      <div key={e._id} className={styles.deseaseBeneficts}>
                        <p
                          style={{
                            color: "var(--color-primD1)",
                            fontSize: "800",
                            textTransform: "uppercase",
                          }}
                        >
                          {e.deseaseName}
                        </p>
                        <li>{e.benefits}</li>
                      </div>
                    )
                  );
                })}
              // @ts-expect-error TS(2339): Property 'desease' does not exist on type '{}'.
              {error.desease && (
                // @ts-expect-error TS(2339): Property 'desease' does not exist on type '{}'.
                <p className={styles.parrafo}>{error.desease}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <section>
            <MapUser />
          </section>
        </div>
        <div className={styles.containerDirection}>
          <div>
            <label style={{ fontWeight: "700", fontSize: "1.4rem" }}>
              DIRECCION
            </label>
          </div>

          <div className={styles.boxInputDirection}>
            <div>
              <InputPrimaryFormUsers
                type="number"
                placeholder="street"
                name="street"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'street' does not exist on type '{}'.
              {error.street && <p className={styles.parrafo}>{error.street}</p>}

              <InputPrimaryFormUsers
                type="number"
                placeholder="floor"
                name="floor"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'floor' does not exist on type '{}'.
              {error.floor && <p className={styles.parrafo}>{error.floor}</p>}
              <InputPrimaryFormUsers
                type="text"
                placeholder="address"
                name="address"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
              {error.address && (
                // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
                <p className={styles.parrafo}>{error.address}</p>
              )}
              <InputPrimaryFormUsers
                type="number"
                placeholder="apartment"
                name="apartment"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'apartment' does not exist on type '{}'.
              {error.apartment && (
                // @ts-expect-error TS(2339): Property 'apartment' does not exist on type '{}'.
                <p className={styles.parrafo}>{error.apartment}</p>
              )}
            </div>
            <div>
              <InputPrimaryFormUsers
                type="text"
                placeholder="neighborhood"
                name="neighborhood"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'neighborhood' does not exist on type '{}... Remove this comment to see the full error message
              {error.neighborhood && (
                // @ts-expect-error TS(2339): Property 'neighborhood' does not exist on type '{}... Remove this comment to see the full error message
                <p className={styles.parrafo}>{error.neighborhood}</p>
              )}
              <InputPrimaryFormUsers
                type="text"
                placeholder="city"
                name="city"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'city' does not exist on type '{}'.
              {error.city && <p className={styles.parrafo}>{error.city}</p>}
              <InputPrimaryFormUsers
                type="text"
                placeholder="country"
                name="country"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
              {error.country && (
                // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
                <p className={styles.parrafo}>{error.country}</p>
              )}
              <InputPrimaryFormUsers
                type="number"
                placeholder="zipCode"
                name="zipCode"
                onChange={(e: any) => handleOnChange(e)}
              />
              // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
              {error.zipCode && (
                // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
                <p className={styles.parrafo}>{error.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          // @ts-expect-error TS(2339): Property 'lastname' does not exist on type '{}'.
          {error.lastname ||
          // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
          error.phone ||
          // @ts-expect-error TS(2339): Property 'birthday' does not exist on type '{}'.
          error.birthday ||
          // @ts-expect-error TS(2339): Property 'gender' does not exist on type '{}'.
          error.gender ||
          // @ts-expect-error TS(2339): Property 'photo' does not exist on type '{}'.
          error.photo ||
          // @ts-expect-error TS(2339): Property 'street' does not exist on type '{}'.
          error.street ||
          // @ts-expect-error TS(2339): Property 'floor' does not exist on type '{}'.
          error.floor ||
          // @ts-expect-error TS(2339): Property 'address' does not exist on type '{}'.
          error.address ||
          // @ts-expect-error TS(2339): Property 'apartment' does not exist on type '{}'.
          error.apartment ||
          // @ts-expect-error TS(2339): Property 'neighborhood' does not exist on type '{}... Remove this comment to see the full error message
          error.neighborhood ||
          // @ts-expect-error TS(2339): Property 'city' does not exist on type '{}'.
          error.city ||
          // @ts-expect-error TS(2339): Property 'country' does not exist on type '{}'.
          error.country ||
          // @ts-expect-error TS(2339): Property 'desease' does not exist on type '{}'.
          error.desease ||
          // @ts-expect-error TS(2339): Property 'trainlimits' does not exist on type '{}'... Remove this comment to see the full error message
          error.trainlimits ||
          // @ts-expect-error TS(2339): Property 'considerations' does not exist on type '... Remove this comment to see the full error message
          error.considerations ||
          // @ts-expect-error TS(2339): Property 'zipCode' does not exist on type '{}'.
          error.zipCode ? (
            <div style={{ width: "100%", margin: "0 auto" }}>
              <ButtonSecondaryDeslice
                type="submit"
                title="GUARDAR CAMBIOS"
                disabled
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonSecondaryDeslice
                className={styles.btn}
                type="submit"
                title="GUARDAR CAMBIOS"
                padding="1rem 1rem"
                onClick={(e: any) => handleSubmit(e)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
