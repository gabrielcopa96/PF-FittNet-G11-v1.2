import { PropsWithChildren } from "react";
import stylesScss from "./screenauth.module.scss";
import { BackgroundTwo } from "../../../../../helpers/Backround/Background";

const ScreenAuth = ({ children }: PropsWithChildren): JSX.Element => {

    return (
        <div className={stylesScss.screen}>
            <ScreenHeaderAuth>{children}</ScreenHeaderAuth>
            <BackgroundTwo />
        </div>
    )
}

const ScreenHeaderAuth = ({ children }: PropsWithChildren) => {

    return (
        <div className={stylesScss.screenContent}>{children}</div>
    )
}

export default ScreenAuth;