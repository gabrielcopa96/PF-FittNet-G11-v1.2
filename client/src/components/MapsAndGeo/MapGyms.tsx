import React, { useMemo, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setGymsGeo } from "../../redux/actions";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import { ButtonSimple } from "../../helpers/Buttons/Buttons";
import styles from './styles/mapGyms.module.css';

export default function MapGyms(): JSX.Element {

  const dispatch = useDispatch();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position: any) {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      },
      function (error: any) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    ); // eslint-disable-next-line
  }, [])


  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setLat((marker as any).getLatLng().lat);
          setLng((marker as any).getLatLng().lng)
        }
      },
    }),
    []
  );

  function handleOnClick(e: any) {
    e.preventDefault();
    dispatch(
      (setGymsGeo({
        latitude: lat,
        longitude: lng,
      }) as any)
    );
    SweetAlrtTem("Tu ubicacion ha sido enviada con exito", "success");
  }


  return (
    <div className={styles.mainContainerMapGyms}>
      <div className={styles.mainTitleMapGym}>
        <h3>Donde se encuentra su Gimnasio</h3>
        <p>Mueva el marcador azul hasta encontrar la ubicacion deseada y luego de click en el boton de envio</p>
      </div>
      <div className={styles.mapGymContainer} id="map">
        {lat === null || lng === null ? <div>Loading...</div>
          : <MapContainer
            // @ts-ignore
            center={[lat, lng]}
            zoom={15}
          >
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
          </MapContainer>}
      </div>
      <div>
        <ButtonSimple onClick={handleOnClick} padding=".1rem 1rem" title="Agregar Ubicacion" />
      </div>
      <div>La ubicacion actual es: Latitud: {lat}, Longitud: {lng}</div>
    </div>
  );
}