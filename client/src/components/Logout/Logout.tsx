import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout(): JSX.Element {

  const navigate = useNavigate();

  function onClick(e: any) {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/api/service/logout',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      // withCredentials: true
    })
    .then((res) => {
      if (res) {
        console.log(res.data, "-> respuesta del post de logout");
        localStorage.clear();
        navigate('/')
      }
    })
    .catch((error) => console.log(error));
  }

  return (
    <>
      <p
        onClick={(e) => onClick(e)}
        // style={{
        //   backgroundColor: "#f5978c",
        //   padding: ".8rem 2rem",
        //   cursor: "pointer",
        //   fontWeight: "700",
        // }}
      >
        Logout
      </p>
    </>
  );
}
