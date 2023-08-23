import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserGoogleForToken, getMarketing } from "../../redux/actions/index";
import { CardsPlansPartner } from "../../helpers/Cards/Cards";
import { ButtonPrimary } from "../../helpers/Buttons/Buttons";
import styleScss from "../Landing/styles/Landing.module.scss";
import { InfoCards, InfoCardsOfficial } from "./utils/landing-info.util";
import { CardsPlansPartnerI } from "../../helpers/Cards/interfaces/cards.interface";
import { Hero } from "./components";
import Cards from "../organisms/Cards/Cards";
import { Card } from "../molecules";

const LandingInfo = (): JSX.Element => {
  const navigate = useNavigate();

  const divRef = useRef();

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch((getUserGoogleForToken(token) as any));
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch((getMarketing() as any)); // eslint-disable-next-line
  }, []);

  return (
    <section className={styleScss.container}>
      {/* PORTADA FITTNET OR HERO */}
      <Hero />
      {/* SECTION CARDS INFO PLANS */}
      <div ref={divRef as any} className={styleScss.contPlanPartner}>
        {/* {
          InfoCards.map((cardInfo: CardsPlansPartnerI, index: number) => (
            <CardsPlansPartner key={index} content={cardInfo} />
          ))
        } */}
        {
          InfoCardsOfficial.map((cardInfo: any, index: number) => (
              <Card key={index} title={cardInfo.title} pricing={cardInfo.pricing} items={cardInfo.items} />
          ))
        }
      </div>
    </section>
  );
}

export default LandingInfo;