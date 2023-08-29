import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPartnerDetails, getUser } from "../../../../redux/actions";

// class GoogleService {

//     private dispatch = useDispatch();
//     private token = localStorage.getItem("token");
//     private userId = localStorage.getItem("userId");

//     constructor() { }

//     async handleGoogleLogin(response_credential: any) {
//         const user = jwt_decode(response_credential.credential);

//         if (!this.token || !this.userId) {
//             const googleData = await axios.post(`/api/service/google/auth`, {
//                 tokenId: response_credential.credential,
//                 data: user,
//             });
//             const finalizacionData = await googleData.data;
//             this.dispatch((getUser(finalizacionData.usuario._id) as any));
//             localStorage.setItem("token", response_credential.credential);
//             localStorage.setItem("userId", finalizacionData.user.userId);
//             localStorage.setItem("type", finalizacionData.user.type);
//             localStorage.setItem("avatar", finalizacionData.user.avatar);
//             localStorage.setItem("name", finalizacionData.usuario.name);
//             localStorage.setItem("email", finalizacionData.usuario.email);

//             const { avatar } = finalizacionData.usuario;

//             if (finalizacionData.usuario.type === "partner") {
//                 this.dispatch((getPartnerDetails(this.userId) as any));
//             }

//             return {
//                 access: avatar,
//                 data: finalizacionData
//             }
//         } else {
//             throw new Error("Error login with google");
//         }
//     }
// }

// export default new GoogleService();