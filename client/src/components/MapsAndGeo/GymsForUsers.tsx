import { useMemo, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {  useSelector } from "react-redux";
// @ts-expect-error TS(2307): Cannot find module './styles/mapGyms.module.css' o... Remove this comment to see the full error message
import styles from "./styles/mapGyms.module.css";
import CalcDist from "./controlers/calcDist";

export default function GymsForUsersMap() {

  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const gymsState = useSelector((state) => state.gyms);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const geoState = useSelector((state) => state.currentGeo);
  
  
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  
  useEffect(() => {
    // @ts-expect-error TS(2304): Cannot find name 'navigator'.
    navigator.geolocation.getCurrentPosition(
      function (position: any) {          
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);         
        setCenterCoords({
          lat: position.coords.latitude ? position.coords.latitude : geoState.latitude,
          lng: position.coords.longitude ? position.coords.longitude : geoState.longitude
        })
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
    
    const [centerCoords, setCenterCoords] = useState({
      lat: lat,
      lng: lng,
    });
    
    const gymsToShow = Array.isArray(gymsState) && gymsState.map((g) => {
      const newMarker = {
        id: g._id,
        name: g.name,
        lat: g.latitude.$numberDecimal,
        lng: g.longitude.$numberDecimal
      }
      return newMarker
    }) 

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
          setLat(marker.getLatLng().lat);
          // @ts-expect-error TS(2339): Property 'getLatLng' does not exist on type 'never... Remove this comment to see the full error message
          setLng(marker.getLatLng().lng);
          // console.log(marker.getLatLng().lat, marker.getLatLng().lng)
          // setDist((CalcDist(gymsToShow[0].lat, gymsToShow[0].lng, marker.getLatLng().lat, marker.getLatLng().lng))*1000)
        }
      },
    }), // eslint-disable-next-line
    []
  );

  return (
    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
    <div className={styles.mainContainer}>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.titleContainer}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <h3>Nuestros Gimnasios mas cercanos</h3>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        <p>
          Aqui usted encontrara marcados los gimnasios que se encuentran mas
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          cercanos a su ubicación, <br />
          de clink en el marcador para ver el nombre y distancia aproximada
        </p>
      </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div className={styles.mapContainer} id="map">
        {centerCoords.lat === null || centerCoords.lng === null ? (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <div>Loading...</div>
        ) : (
          // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
          <MapContainer center={[centerCoords.lat, centerCoords.lng]} zoom={15}>
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <TileLayer
              // @ts-expect-error TS(2322): Type '{ attribution: string; url: string; }' is no... Remove this comment to see the full error message
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
            <Marker
              // @ts-expect-error TS(2322): Type '{ children: Element; draggable: boolean; eve... Remove this comment to see the full error message
              draggable={true}
              eventHandlers={eventHandlers}
              position={[lat, lng]}
              ref={markerRef}
            >
              // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
              <Popup>
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                Esta es <br /> tu ubicacion.
              </Popup>
            </Marker>
            // @ts-expect-error TS(2339): Property 'map' does not exist on type 'false | { i... Remove this comment to see the full error message
            {gymsToShow.map((gym: any) => {
              return (
                // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                <Marker
                  // @ts-expect-error TS(2322): Type '{ children: Element; draggable: boolean; pos... Remove this comment to see the full error message
                  draggable={false}
                  position={[gym.lat, gym.lng]}
                >
                  // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                  <Popup>
                    {gym.name}
                    // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
                    <br />A solo
                    {(
                      CalcDist(
                        gym.lat,
                        gym.lng,
                        centerCoords.lat,
                        centerCoords.lng
                      ) * 1000
                    ).toFixed(2)}{" "}
                    metros
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
      // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
      <div style={{marginTop: "1rem", fontSize: "1rem"}}>
        // @ts-expect-error TS(2686): 'React' refers to a UMD global, but the current fi... Remove this comment to see the full error message
        La ubicacion actual es: Latitud: <span style={{color: "var(--color-prim"}}>{lat}</span>, Longitud: <span style={{color: "var(--color-prim"}}>{lng}</span>
      </div>
    </div>
  );
}
