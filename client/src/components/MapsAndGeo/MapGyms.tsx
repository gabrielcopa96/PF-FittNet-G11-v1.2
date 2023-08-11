import React, { useMemo, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setGymsGeo } from "../../redux/actions";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SweetAlrtTem } from "../../asets/helpers/sweetalert";
import {ButtonSimple} from "../../helpers/Buttons/Buttons.jsx";
// @ts-expect-error TS(2307): Cannot find module './styles/mapGyms.module.css' o... Remove this comment to see the full error message
import styles from './styles/mapGyms.module.css';

export default function MapGyms() {

  const dispatch = useDispatch();

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    // @ts-expect-error TS(2304): Cannot find name 'navigator'.
    navigator.geolocation.getCurrentPosition(
        function (position: any) {          
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)          
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


  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
          setLat(marker.getLatLng().lat);
          // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
          setLng(marker.getLatLng().lng)
        }
      },
    }),
    []
    );

    function handleOnClick(e: any) {
      e.preventDefault();
      dispatch(
        // @ts-expect-error TS(2345): Argument of type '(dispatch: any) => Promise<void>... Remove this comment to see the full error message
        setGymsGeo({
          latitude: lat,
          longitude: lng,
        })
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
          // @ts-expect-error TS(2322): Type '{ children: Element[]; center: never[]; zoom... Remove this comment to see the full error message
          center={[lat, lng]}
          zoom={15}
        >
          <TileLayer
            // @ts-expect-error TS(2322): Type '{ attribution: string; url: string; }' is no... Remove this comment to see the full error message
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
          // @ts-expect-error TS(2322): Type '{ children: Element; draggable: boolean; eve... Remove this comment to see the full error message
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