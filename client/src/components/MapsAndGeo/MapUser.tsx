import { useMemo, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setUserGeo } from "../../redux/actions/index";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import styles from "./styles/mapGyms.module.css";

export default function MapUser(): JSX.Element {
  const dispatch = useDispatch();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position: any) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      function (error: any) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, []);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLat((marker as any).getLatLng().lat);
          setLng((marker as any).getLatLng().lng);
        }
      },
    }),
    []
  );

  function handleOnClick(e: any) {
    e.preventDefault();
    dispatch(
      (setUserGeo({
        latitude: lat,
        longitude: lng,
      }) as any)
    );
    setMessage("Tu ubicacion ha sido registrada con exito");
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.mainTitle}>
          <h3>Indiquenos su ubicación</h3>
          <p>
            Mueva el marcador azul hasta encontrar la ubicacion deseada y luego
            de click en el boton de Agregar
            <br />
            Al hacer esto nos permite enviarle información de los servicios mas
            cercanos a usted
          </p>
        </div>
      </div>
      <div className={styles.mapContainer} id="map">
        {lat === null || lng === null ? (
          <div>Loading...</div>
        ) : (
          // @ts-ignore
          <MapContainer center={[lat, lng]} zoom={15}>
            <TileLayer
              // @ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              // @ts-ignore
              draggable={true}
              eventHandlers={eventHandlers}
              position={[lat, lng]}
              ref={markerRef}
            >
              <Popup>
                Coloque el marcador <br /> en la ubicación de su Gym.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
      <div>
        <ButtonSimple onClick={handleOnClick} padding=".1rem 1rem" title="Agregar Ubicacion" />
      </div>
      {/* <div>
        <button className={styles.btnMapSend} onClick={handleOnClick}>
          Agregar Ubicación
        </button>
      </div> */}
      <div className={styles.ubicationDiv}>
        La ubicacion actual es: Latitud:{" "}
        <span style={{ color: "var(--color-primD1)" }}>{lat} </span>, Longitud:{" "}
        <span style={{ color: "var(--color-primD1)" }}>{lng}</span>
      </div>
      <div className={message ? styles.ubicationDiv : ""}>
        {message ? message : null}
      </div>
    </div>
  );
}
