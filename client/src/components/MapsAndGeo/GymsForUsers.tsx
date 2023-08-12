import { useMemo, useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import styles from "./styles/mapGyms.module.css";
import CalcDist from "./controlers/calcDist";

export default function GymsForUsersMap(): JSX.Element {

  const gymsState = useSelector((state: any) => state.gyms);
  const geoState = useSelector((state: any) => state.currentGeo);


  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
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
          setLat((marker as any).getLatLng().lat);
          setLng((marker as any).getLatLng().lng);
        }
      },
    }), // eslint-disable-next-line
    []
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h3>Nuestros Gimnasios mas cercanos</h3>
        <p>
          Aqui usted encontrara marcados los gimnasios que se encuentran mas
          cercanos a su ubicación, <br />
          de clink en el marcador para ver el nombre y distancia aproximada
        </p>
      </div>
      <div className={styles.mapContainer} id="map">
        {centerCoords.lat === null || centerCoords.lng === null ? (
          <div>Loading...</div>
        ) : (
          // @ts-ignore
          <MapContainer center={[centerCoords.lat, centerCoords.lng]} zoom={15}>
            <TileLayer
              //@ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              //@ts-ignore
              draggable={true}
              eventHandlers={eventHandlers}
              position={[lat, lng]}
              ref={markerRef}
            >
              <Popup>
                Esta es <br /> tu ubicacion.
              </Popup>
            </Marker>
            {(gymsToShow as any).map((gym: any) => {
              return (
                <Marker
                  //@ts-ignore  
                  draggable={false}
                  position={[gym.lat, gym.lng]}
                >
                  <Popup>
                    {gym.name}
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
      <div style={{ marginTop: "1rem", fontSize: "1rem" }}>
        La ubicacion actual es: Latitud: <span style={{ color: "var(--color-prim" }}>{lat}</span>, Longitud: <span style={{ color: "var(--color-prim" }}>{lng}</span>
      </div>
    </div>
  );
}
