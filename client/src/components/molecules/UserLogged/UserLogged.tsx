import { useNavigate } from "react-router-dom";
import { Avatar, Text } from "../../atoms";
import stylesScss from './userLogged.module.scss';
import { useSelector } from "react-redux";

const UserLogged = (): JSX.Element => {

    const navigate = useNavigate();

    const user = useSelector((state: any) => state.user);

    const { info } = user;

    const name = localStorage.getItem("name");

    const type = localStorage.getItem("type");

    const idUser = localStorage.getItem("userId");

    return (
        <div className={stylesScss.userLogged} onClick={() => { navigate(`/home/${type}/${name}/${idUser}`) }}>
            <Avatar src={info?.photo} size="sm" />
            <Text size="sm">Gabriel Marcelo</Text>
        </div>
    )
}

export default UserLogged;