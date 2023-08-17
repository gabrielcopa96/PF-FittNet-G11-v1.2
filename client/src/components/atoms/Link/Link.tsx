import { useNavigate } from "react-router-dom";
import type { LinkProps } from "./interface/link.interface";
import stylesScss from "./link.module.scss";

const Link = ({ children, onNavigate, size = "md" }: LinkProps): JSX.Element => {

    const navigate = useNavigate()

    return (
        <div
            className={`${stylesScss.link} ${size && stylesScss[size]}`}
            onClick={() => navigate(onNavigate ? onNavigate : "/test/atoms", { replace: true })}
        >
            {children}
        </div>
    )
}

export default Link;