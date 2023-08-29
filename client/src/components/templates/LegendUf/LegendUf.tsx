import img from "../../assets/images/benefits(uf).jpg";
import img2 from "../../assets/images/benefits(uf)2.jpg";
import img3 from "../../assets/images/benefits(uf)3.jpeg";
import style from "../LegendUf/style/LegendUf.module.css";
import { ButtonSecondaryDeslice } from "../../../helpers/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export default function LegendUf(): JSX.Element {
  
  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const type = localStorage.getItem("type");

  const idUser = localStorage.getItem("userId");

  const avatar = localStorage.getItem("avatar");

  return (
    <section>
      <div className={style.containerFullLegend}>
        <div className={style.img}>
          <img src={img} alt="" />
        </div>
        <div className={style.containerLegendText}>
          <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem" }}>
            Nuestro propósito es facilitar el acceso a la práctica de actividad
            física de alta calidad, al mismo tiempo brindarte una manera fácil y
            segura de organizar tu agenda de actividades y tus objetivos de manera
            personalizada!
            <br key="br1" />
            <br key="br2" />
            En un solo lugar, podrás ver todas las posibilidades y elegir el
            gimnasio que mejor se adapte a tu perfil deportivo y ubicación!
            <br key="br3" />
            <br key="br4" />
            Podrás elegir inscribirte de forma mensual o tambien optar por tomar
            clases individuales, abonando de forma segura y sin moverte de tu
            casa!
          </h3>
        </div>
      </div>
      <div className={style.containerFullLegend}>
        <div className={style.containerLegendText}>
          <h2>Beneficios del ejercicio Fisico</h2>
          <br key="br5" />
          <br key="br6" />
          <h3 style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "3rem" }}>
            La actividad física regular puede mejorar la fuerza muscular y aumentar la
            resistencia. El ejercicio suministra oxígeno y nutrientes a los tejidos y
            ayuda a que el sistema cardiovascular funcione de manera más eficiente.
            Y cuando tu salud cardíaca y pulmonar mejora, tienes más energía para
            hacer las tareas diarias.
          </h3>
        </div>
        <div className={style.img}>
          <img src={img2} alt="" />
        </div>

      </div>
      <div className={style.containerFullLegend}>
        <div className={style.containerLegendText}>
          <h2>
          </h2>
          <br key="br7" />
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Libera las hormonas de la felicidad</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Alivia y reduce el estrés</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Mejora las relaciones sociales</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta la autoestima</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Ralentiza y previene el deterioro cognitivo</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumento de la memoria</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Combate los trastornos del sueño: insomnio y somnolencia</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Ayuda a controlar las adicciones</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta de la capacidad cerebral</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta la productividad</li>
          <li style={{ color: "#e0e0e0", fontSize: "1.5rem", marginTop: "0.7rem" }}>Aumenta nuestra capacidad de concentración</li>
        </div>
        <div className={style.img}>
          <img src={img3} alt="" />
        </div>
      </div>
      <div>
        <h2 style={{ color: "var(--color-prim)", marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
          {!idUser
            ? "Que esperas para formar parte de la evolucion del mundo deportivo ?"
            : "Ya formas parte de la evolucion deportiva!"}
        </h2>
        <div style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}>
          {!idUser ? (
            <ButtonSecondaryDeslice
              title="Registrate"
              padding=".7rem 4rem"
              onClick={() => navigate("/register")}
            />
          ) : (
            <ButtonSecondaryDeslice
              title="Ir a Home"
              padding=".7rem 4rem"
              onClick={() =>
                navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
