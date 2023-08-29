import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPartnerDetails, getUser } from "../../../redux/actions/index";
import { setUserGeo } from '../../../services/servicesQuery';
import styles from "./styles/LoginInit.module.css";
import jwt_decode from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import {
  BackgroundTwo,
  BackgroundOne,
} from "../../../helpers/Backround/Background";
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { InputPrymary, InputSecond } from "../../../helpers/Inputs/Inputs";

export default function LoginInit(): JSX.Element {
  const dispatch = useDispatch();

  const [geo, setGeo] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position: any) {
        let geoPayload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch((setUserGeo(geoPayload) as any));
        setGeo({
          latitude: geoPayload.latitude,
          longitude: geoPayload.longitude,
        })
      },
      function (error: any) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, []);

  // @ts-ignore
  const { data: geoLocalizacion, isLoading: loadingGeo, isError: errorGeo } = useQuery("geolocalizacion", setUserGeo(geo))


  console.log(geoLocalizacion);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleCallbackGoogle = async (response: any) => {
    const userObject = jwt_decode(response.credential);
    if (!token || !userId) {
      const googleData = await axios.post(`/api/service/google/auth`, {
        tokenId: response.credential,
        data: userObject,
      });
      const finalizacionData = await googleData.data;
      dispatch((getUser(finalizacionData.usuario._id) as any));
      localStorage.setItem("token", response.credential);
      localStorage.setItem("userId", finalizacionData.user.userId);
      localStorage.setItem("type", finalizacionData.user.type);
      localStorage.setItem("avatar", finalizacionData.user.avatar);
      localStorage.setItem("name", finalizacionData.usuario.name);
      localStorage.setItem("email", finalizacionData.usuario.email);

      const { avatar } = finalizacionData.usuario;

      if (finalizacionData.usuario.type === "partner") {
        dispatch((getPartnerDetails(userId) as any));
      }

      if (!avatar) {
        navigate(
          `/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}`
        );
      } else {
        navigate(
          `/home/${finalizacionData.usuario.type}/${finalizacionData.usuario.name}/${finalizacionData.usuario._id}/${finalizacionData.usuario.avatar}`
        );
      }
    } else {
      navigate("/");
    }
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    let userLogin = {};

    if (username && password) {
      userLogin = { username: username, password: password };

      console.log("está saliendo el post ", userLogin);

      const login = await axios({
        method: "post",
        url: "/api/service/login",
        data: userLogin,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => console.log(error));

      if (login.login) {
        console.log(login, " lo que responde el back si se autentica el user");

        let { userId, name, type, avatar, active, latitude, longitude } = login;

        if (active === true) {
          // Si la cuenta está activa
          if (type === "partner") {
            dispatch((getPartnerDetails(userId)) as any);
          }
          if (!login.avatar) {
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", name);
            localStorage.setItem("type", type);
            localStorage.setItem("latitude", latitude.$numberDecimal);
            localStorage.setItem("longitude", longitude.$numberDecimal);

            navigate(`/home/${type}/${name}/${userId}`);
          }

          console.log(login.avatar);
          if (login.avatar) {
            console.log(login, " el user");

            localStorage.setItem("userId", userId);
            localStorage.setItem("name", name);
            localStorage.setItem("type", type);
            localStorage.setItem("avatar", avatar._id);
            localStorage.setItem("latitude", latitude.$numberDecimal);
            localStorage.setItem("longitude", longitude.$numberDecimal);

            let avatarId = avatar._id;
            navigate(`/home/${type}/${name}/${userId}/${avatarId}`);
          }
          // ya le paso info por params de quién estamos hablando
        } else {
          setError("Cuenta inactiva, verifiación de email pendiente");
        }
      }
      if (typeof login === "string") {
        console.log(login); // qué  me responde el back?
        setPassword("");
        setUsername("");
      }
    }
    if (!username && password) {
      setError("No olvide introducir su email");
    }
    if (username && !password) {
      setError("No olvide introducir su contraseña");
    }
  }

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse: any) => await handleCallbackGoogle(credentialResponse),
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.screenContent}>
          <div className={styles.sign}>
            <div className={styles.contentHeading}>
              <Link to="/">
                <div className={styles.containerBtn}>
                  <div className={styles.logoContainer}></div>
                </div>
              </Link>
              <div className={styles.containerReg}>
                <a href="/register" style={{ textDecoration: "none" }}>
                  Crear cuenta
                </a>
              </div>
            </div>
          </div>
          <form className={styles.login}>
            <InputPrymary
              type="email"
              value={username}
              name="email"
              placeholder="Email"
              required
              onChange={(e: any) => setUsername(e.target.value)}
            />

            <InputPrymary
              type="password"
              value={password}
              name="password"
              placeholder="Contraseña"
              required
              onChange={(e: any) => setPassword(e.target.value)}
            />

            <InputSecond
              type="submit"
              value="Ingresar"
              onClick={(e: any) => onSubmit(e)}
            />



            {/* <GoogleLogin
              onSuccess={async (credentialResponse: any) => await handleCallbackGoogle(credentialResponse)}
              onError={() => {
                console.log('Login Failed');
              }}
              theme="outline"
              shape="pill"
              useOneTap
            /> */}
            {/* <div id="signInDiv" style={{ paddingTop: "1.5rem" }}></div> */}
            <div className={styles.contraseña}>
              <a href="/resetpassword" style={{ color: "#111111" }}>
                Olvidé mi contraseña
              </a>
            </div>
            <p>
              {error === "" ? null : (
                <div className={styles.errors}>
                  <h3>{error}</h3>
                </div>
              )}
            </p>
          </form>
        </div>
        <BackgroundTwo />
      </div>
      <BackgroundOne />
    </div>
  );
}
