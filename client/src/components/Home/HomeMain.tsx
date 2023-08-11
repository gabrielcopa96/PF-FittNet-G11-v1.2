import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SelecAvatar from "../SelectAvatar/SelectAvatar";
import GymCards from "../GymCards/GymCards";
import { getAllGyms, getUserGoogleForToken, setUserGeo } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ButtonBack } from "../../helpers/Buttons/Buttons.jsx";
// @ts-expect-error TS(2307): Cannot find module './styles/homeMain.module.css' ... Remove this comment to see the full error message
import styles from "./styles/homeMain.module.css";
import Sarch from "../Search/Search";
import OrderBy from "../OrderBy/OrderBy";
import HomeAdmin from "./HomeAdmin/HomeAdmin";
import { HomePartner } from "./HomePartner/HomePartner";
import GymsForUsersMap from "../MapsAndGeo/GymsForUsers";
import { getUser, sortByDistance } from "../../redux/actions";

// @ts-expect-error TS(7030): Not all code paths return a value.
export default function HomeMain() {
  let { userId } = useParams();

  const dispatch = useDispatch();

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const avatarLS = localStorage.getItem("avatar");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const token = localStorage.getItem("token");

  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  const type = localStorage.getItem("type");

  const navigate = useNavigate();

  useEffect(() => {
    // @ts-expect-error TS(2552): Cannot find name 'navigator'. Did you mean 'naviga... Remove this comment to see the full error message
    navigator.geolocation.getCurrentPosition(
        function (position: any) {          
            let geoPayload = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }          
            // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
            dispatch(setUserGeo(geoPayload))
        },
        function (error: any) {
          // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      ); // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getAllGyms());   
    dispatch(sortByDistance("menor"));    
    // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
    dispatch(getUser(userId));
    if (token) {
      // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
      dispatch(getUserGoogleForToken(token));
    } // eslint-disable-next-line
  }, [userId]);
  
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const partnerDetail = useSelector((state)=> state.partnerDetails);
  // @ts-expect-error TS(2304): Cannot find name 'localStorage'.
  partnerDetail && localStorage.setItem("partnerDetail", partnerDetail);
  
  //! Esto es una vista para un usuario sin avatar
  if (type === "user" && !avatarLS) {
    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.styleContWithOutAvatar}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <SelecAvatar />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div style={{ display: "grid", alignItems: "center" }} >
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <ButtonBack
            title="Volver"
            padding=".5rem 2rem"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  //! Esto es una vista para un usuario con avatar
  if (type === "user" && avatarLS) {
    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.cont}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <GymsForUsersMap />
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <div className={styles.styleContWithAvatar}>
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <Sarch />
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <OrderBy />
        </div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <GymCards />
      </div>
    );
  }

  //! Esto es una para cliente empresa
  if (type === "partner") {

    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <HomePartner />
      </div>
    );
  }

  //! Esto es una para un administrador de sitio
  if (type === "admin") {
    return (
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <HomeAdmin />
      </div>
    );
  }
}
