// @ts-expect-error TS(2307): Cannot find module './styles/LegendCe.module.css' ... Remove this comment to see the full error message
import style from "./styles/LegendCe.module.css";
import Slider from "../Slider/Slider";
import CardPlans from "../CardPlans/CardPlans";

export default function LegendCe() {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={style.container}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={style.contTitle}>
      Nuestro propósito es facilitar el acceso a la práctica de actividad
          física de alta calidad, al mismo tiempo brindar una manera fácil y
          segura de acercar la tecnología a los procesos administrativos.
          Generamos contenido publicitario exitoso, enfocado a las necesidades
          de los usuarios, de esta manera logramos expandir la cartera de
          nuestros clientes, multiplicando sus ingresos!
      </div>

      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={style.contInfo}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.legend}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.card}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <CardPlans />
          </div>
        </div>

        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.containerPack}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.sliderCard}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}
