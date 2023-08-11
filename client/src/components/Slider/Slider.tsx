// @ts-expect-error TS(2307): Cannot find module '../Slider/styles/Slider.module... Remove this comment to see the full error message
import style from "../Slider/styles/Slider.module.css";

export default function Slider() {
  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={style.containP}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={style.wrapper}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <h1>BENEFICIOS</h1>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.timeline}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <dl className={style.timelineentry}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dt className={style.timelineentrytitle}>Contenido Publicitario</dt>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dd className={style.timelineentrydetail}>
              Podras otorgar visibilidad a tu marca, aumentando tus ventas y
              ganancias, tambien generaras nuevos clientes aprovechando la
              imagen positiva o apunta a consumidores especificos
            </dd>
          </dl>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <dl className={style.timelineentry}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dt className={style.timelineentrytitle}>Perfil actualizado</dt>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dd className={style.timelineentrydetail}>
              Mantendrás a los usuarios informados de tus promociones, novedades
              y productos ofrecidos!
            </dd>
          </dl>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <dl className={style.timelineentry}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dt className={style.timelineentrytitle}>Libertad financiera</dt>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dd className={style.timelineentrydetail}>
              Generarás ganancias que nunca imaginaste sin preocuparte por
              gestionar tus cobranzas!
            </dd>
          </dl>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <dl className={style.timelineentry}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dt className={style.timelineentrytitle}>Comunidad </dt>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dd className={style.timelineentrydetail}>
              Formaras parte de una comunidad destacada por su nivel de servicio
              , atención y calidad. muchos usuarios ya confían en nosotros!
            </dd>
          </dl>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <dl className={style.timelineentry}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dt className={style.timelineentrytitle}>Alcance</dt>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <dd className={style.timelineentrydetail}>
              Podras gestionar tus gimnasios y servicios que ofreces de manera facil y sencilla.
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
