import { useNavigate } from "react-router-dom";
import stylesScss from "../../styles/Landing.module.scss";
import imageHero from "../../../../assets/images/landing/hero-6.jpg";
import { Button, Title } from "../../../atoms";
import Shape from "../Shape/Shape";

const Hero = (): JSX.Element => {

    const navigate = useNavigate();

    const name = localStorage.getItem("name");

    const type = localStorage.getItem("type");

    const idUser = localStorage.getItem("userId");

    const avatar = localStorage.getItem("avatar");

    return (
        <section className={stylesScss.contPrim}>
            <img src={imageHero} alt="image-hero" />
            <div className={stylesScss.contElempadre}>
                <div className={stylesScss.contElem}>
                    <div className={stylesScss.contText}>
                        <Title>
                            La red de los mejores gimnasios acompañandote durante todo el
                            proceso de cambio
                        </Title>
                        {!idUser ? (
                            <Button
                                effect="slide"
                                size="lg"
                                onClick={() => navigate("/login", { replace: true })}
                            >
                                Empezá aquí
                            </Button>
                        ) : avatar ? (
                            <Button
                                effect="slide"
                                size="lg"
                                variant="solid"
                                onClick={() =>
                                    navigate(`/home/${type}/${name}/${idUser}/${avatar}}`)
                                }
                            >
                                Ir a home
                            </Button>
                        ) : (
                            <Button
                                effect="slide"
                                size="lg"
                                variant="solid"
                                onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
                            >
                                Ir a home
                            </Button>
                        )}
                    </div>
                    <Shape />
                </div>
            </div>
        </section>
    );
};

export default Hero;