import axios from "axios";
import { setUserGeo } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { regexEmail, regexName } from "../../../../utils/regexValidators";
import { SweetAlrt, SweetAlrtTem } from "../../../../utils/sweetalert";

export const useHandleRegister = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState<string>("");
    const [geoloc, setGeoloc] = useState({
        lat: 0,
        lng: 0,
    });
    const [error, setError] = useState("");

    const geolocation = useSelector(
        (state: any) => state.currentUserDetails.currentGeo
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position: any) {
                const payload = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                dispatch((setUserGeo(payload) as any));
                setGeoloc({
                    lat: position.coords.latitude
                        ? position.coords.latitude
                        : geolocation.latitude,
                    lng: position.coords.longitude
                        ? position.coords.longitude
                        : geolocation.longitude,
                });
            },
            function (error: any) {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);

    function onSubmit() {
        let userCreate;

        //---------------------------------------------------------------------
        // La validación de los campos la hace la función validadora
        // llamada desde cada input. Luego si tengo todos los campos completos
        // y no tengo errores(seteados por la función validadora), entonces
        // creo el objeto y hago el post al back.
        //--------------------------------------------------------------------
        if (error === "" && name && email && password && type) {
            userCreate = {
                name: name,
                username: email,
                password: password,
                latitude: geoloc.lat,
                longitude: geoloc.lng,
                type: type,
            };

            SweetAlrt("Estamos procesando su solicitud!", "success");

            axios
                .post("/api/service/register", userCreate)
                .then((res) => {
                    if (res.data.created === true) {
                        setName("");
                        setPassword("");
                        setError("");
                        setEmail("");
                        SweetAlrt("Exito!", res.data.message, "success");
                        navigate('/login');
                    }
                    if (res.data.created === false) {
                        SweetAlrt("Atencion!", res.data.message, "warning");
                        setName("");
                        setPassword("");
                        setError("");
                        setEmail("");
                    }
                    if (typeof res.data === "string") {
                        SweetAlrt(res.data, "warning");
                    }
                })
                .catch((error) => console.log(error));
        }
        if (!name || !email || !password || !type) {
            SweetAlrtTem("Por favor complete todos los campos", "warning");
        }
    }

    function onChangeName(value: string) {
        setName(value);
        if (name.length < 3) {
            setError("El nombre es requerido");
        } else if (!regexName.test(name)) {
            setError("El nombre debe contener letras");
        } else {
            setError("");
        }
    }

    function onChangeEmail(value: string) {
        setEmail(value);
        if (email.length < 3) {
            setError("El Email es requerido");
        } else if (!regexEmail.test(email)) {
            setError("Email invalido");
        } else {
            setError("");
        }
    }

    function onChangePassword(value: string) {
        setPassword(value);
        if (password.length < 2) {
            setError("Necesita introducir una contraseña");
        } else if (password.length < 3) {
            setError("La constraseña debe tener un mínimo de tres caracteres");
        } else {
            setError("Recuerde seleccionar el tipo de usuario");
        }
    }

    return {
        handleRegister: onSubmit,
        name: {
            get: name,
            set: onChangeName,
        },
        email: {
            get: email,
            set: onChangeEmail
        },
        password: {
            get: password,
            set: onChangePassword,
        },
        type: {
            get: type,
            set: setType
        },
        error
    }
}