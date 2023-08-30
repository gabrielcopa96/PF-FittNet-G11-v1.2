import styles from "./styles/LoginInit.module.css";
import {
  BackgroundOne,
} from "../../../helpers/Backround/Background";
import ScreenAuth from "./components/ScreenAuth/ScreenAuth";
import HeaderAuth from "./components/HeaderAuth/HeaderAuth";
import FormAuth from "./components/FormAuth/FormAuth";
import { useGeolocation } from "./hooks/useGeolocation";

export default function LoginInit(): JSX.Element {
  
  useGeolocation();

  return (
    <section className={styles.container}>
      <ScreenAuth>
        <HeaderAuth />
        <FormAuth />
      </ScreenAuth>
      <BackgroundOne />
    </section>
  );
}