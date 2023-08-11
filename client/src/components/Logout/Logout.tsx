import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {

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
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(res.data)
      if (res) {
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(res.data, "-> respuesta del post de logout");
        // localStorage.removeItem("token");
        // localStorage.removeItem('userId');
        // localStorage.removeItem('name');
        // localStorage.removeItem('type');
        // localStorage.removeItem('avatar');
        // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
        localStorage.clear();
        navigate('/')
        // return (window.location = "http://localhost:3000/");
      }
    })
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    .catch((error) => console.log(error));
  }

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
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
    </div>
  );
}
