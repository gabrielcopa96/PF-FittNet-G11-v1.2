import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserGoogleForToken, getMarketing } from "../../redux/actions/index";
import { CardsPlansPartner } from "../../helpers/Cards/Cards";
import { ButtonPrimary } from "../../helpers/Buttons/Buttons.jsx";
import { PortadaFittnet, Hero } from "../Landing/componentsLanding/componentsLanding";
import { ScrollContainer, Animator, ScrollPage, Fade } from "react-scroll-motion";

// @ts-expect-error TS(2307): Cannot find module '../Landing/styles/Landing.modu... Remove this comment to see the full error message
import style from "../Landing/styles/Landing.module.css";

export default function LandingInfo() {
  const navigate = useNavigate();

  const divRef = useRef();

  const dispatch = useDispatch();

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const token = localStorage.getItem("token");

  const Scr = Fade();

  useEffect(() => {
    if (token) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getMarketing()); // eslint-disable-next-line
  }, []);

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={style.container}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <ScrollContainer>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <ScrollPage page={0}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Animator animation={Scr}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <PortadaFittnet />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div ref={divRef} className={style.contPlanPartner}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <CardsPlansPartner
            title="STANDARD"
            busqueda="10%"
            gym="Hasta 1 GYM"
            servicios="5 servicios por GYM"
            Size="2em"
          />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <CardsPlansPartner
            title="PREMIUM"
            busqueda="30%"
            gym="Hasta 5 GYM"
            servicios="10 servicios por GYM"
            Size="2em"
          />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <CardsPlansPartner
            title="GOLDEN"
            busqueda="50%"
            gym="Hasta 50 GYM"
            servicios="50 servicios en GYM"
            Size="2em"
          />
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.containerBtnPromos}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ButtonPrimary
            title="MAS INFO"
            padding="0 1rem"
            onClick={() => navigate("/legendCe")}
          />
        </div>
      </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <br />
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <Hero />
    </div>
  );
}
