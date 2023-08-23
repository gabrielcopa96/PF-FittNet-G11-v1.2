import { PropsWithChildren } from "react";
import stylesScss from "./cards.module.scss";

const Cards = ({ children }: PropsWithChildren ): JSX.Element => {
  return (
    <div className={stylesScss.cards}>
        { children }
    </div>
  )
}

export default Cards;