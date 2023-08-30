import axios from "axios";
import { getPartnerDetails } from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useHandleLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    async function onSubmit() {
        let userLogin = {};

        if (username && password) {
            userLogin = { username: username, password: password };
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

                    if (login.avatar) {
                        localStorage.setItem("userId", userId);
                        localStorage.setItem("name", name);
                        localStorage.setItem("type", type);
                        localStorage.setItem("avatar", avatar._id);
                        localStorage.setItem("latitude", latitude.$numberDecimal);
                        localStorage.setItem("longitude", longitude.$numberDecimal);

                        let avatarId = avatar._id;
                        navigate(`/home/${type}/${name}/${userId}/${avatarId}`);
                    }
                } else {
                    setError("Cuenta inactiva, verifiación de email pendiente");
                }
            }
            if (typeof login === "string") {
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


    return {
        handleLogin: onSubmit,
        username: {
            get: username,
            set: setUsername
        },
        password: {
            get: password,
            set: setPassword
        },
        error
    }
}