import { BackgroundOne } from "../../../helpers/Backround/Background";
import ScreenAuth from "../Login/components/ScreenAuth/ScreenAuth";
import HeaderRegister from "./components/HeaderRegister/HeaderRegister";
import stylesScss from "./register.module.scss";

const Register = (): JSX.Element => {
    return (
        <section className={stylesScss.container}>
            <ScreenAuth>
                <HeaderRegister />
            </ScreenAuth>
            <BackgroundOne />
        </section>
    )
}

export default Register;