import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { getUserGoogleForToken, getUser } from "../../redux/actions/index";
// @ts-expect-error TS(2307): Cannot find module './style/NavBarProfile.module.c... Remove this comment to see the full error message
import style from "./style/NavBarProfile.module.css";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export default function NavBarProfile() {

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const token = localStorage.getItem("token");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const name = localStorage.getItem("name");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const userId = localStorage.getItem("userId");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");
  
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatar = localStorage.getItem("avatar");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const instantCallback = useCallback(dispatch, [dispatch])

  useEffect(() => {
    if (!token) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getUser(userId));
    }
    if (token) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      instantCallback(getUserGoogleForToken(token));
    }
  }, [instantCallback, token, userId]);

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={style.boxNavBarProfile}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <nav className={style.navBarProfile}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.titleNavBar}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div onClick={() => navigate("/")}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <img
              src="https://res.cloudinary.com/salta/image/upload/v1654029469/logo-modo-BLANCO_smtgwu.png"
              alt="foto"
              style={{
                width: "155px",
                height: "75px",
                cursor: "pointer",
              }}
            />
          </div>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <h3>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            Bienvenido <span>{name} !</span>
          </h3>
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={style.boxListaNavBarProfile}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Link to={`/profile/${type}/${name}/${userId}`}>Mi perfil</Link>

          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Link to="/">Inicio</Link>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Link
            to={
              avatar
                ? `/home/${type}/${name}/${userId}/${avatar}`
                : `/home/${type}/${name}/${userId}`
            }
          >
            Home
          </Link>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div className={style.logoutNavBarProfile}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Logout />
          </div>
        </div>
      </nav>
    </div>
  );
}
