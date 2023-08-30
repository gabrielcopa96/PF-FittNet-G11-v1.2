import jwt_decode from "jwt-decode";
import { getPartnerDetails, getUser } from "../../../../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useHandleGoogle = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    return {
        handleGoogle: handleCallbackGoogle
    }


}
