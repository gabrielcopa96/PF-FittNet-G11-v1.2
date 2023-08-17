import { Link, useNavigate } from "react-router-dom";
import { ButtonSecondaryDeslice } from "../../../helpers/Buttons/Buttons";
import stylesScss from "../styles/Landing.module.scss";
import { Button, Title } from "../../atoms";

const Hero = (): JSX.Element => {

    const navigate = useNavigate();

    const name = localStorage.getItem("name");

    const type = localStorage.getItem("type");

    const idUser = localStorage.getItem("userId");

    const avatar = localStorage.getItem("avatar");

    return (
        <section className={stylesScss.contPrim}>
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
                                variant="ghost"
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
                                variant="ghost"
                                onClick={() => navigate(`/home/${type}/${name}/${idUser}`)}
                            >
                                Ir a home
                            </Button>
                        )}
                    </div>
                    <div className={`${stylesScss.screenBackground}`}>
                        <span className={stylesScss.shapeTop1}></span>
                        <span className={stylesScss.shapeButtom1}></span>
                        <span className={stylesScss.shapeTop2}></span>
                        <span className={stylesScss.shapeButtom2}></span>
                        <span className={stylesScss.shapeTop3}></span>
                        <span className={stylesScss.shapeButtom3}></span>
                        <span className={stylesScss.shapeTop4}></span>
                        <span className={stylesScss.shapeButtom4}></span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;