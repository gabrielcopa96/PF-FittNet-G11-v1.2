import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button";
import Text from "../../atoms/Text/Text";
import Title from "../../atoms/Title/Title";
import stylesScss from "./card.module.scss";
import { CardProps } from "./interface/card.interface";

const Card = ({ title, pricing, items }: CardProps): JSX.Element => {

    const navigate = useNavigate();

    return (
        <article className={`${stylesScss.card} ${stylesScss.plan}`}>
            <div className={stylesScss.inner}>
                <span className={stylesScss.pricing}>
                    <Text color="black" size="md" weight="bold">$ {pricing} / m</Text>
                </span>
                <div className={stylesScss.title}><Title size="sm">{title}</Title></div>
                <ul className={stylesScss.features}>
                    {
                        items.map((item, index) => (
                            <li key={index}>
                                <span className={stylesScss.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="currentColor" />
                                    </svg>
                                </span>
                                <Text size="sm">{item}</Text>
                            </li>
                        ))
                    }
                </ul>
                <Button type="primary" size="md" onClick={() => navigate("/legendCe", { replace: true })}>Leer más</Button>
            </div>
        </article>
    )
}

export default Card;