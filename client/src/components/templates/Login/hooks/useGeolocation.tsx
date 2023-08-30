import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserGeo } from "../../../../redux/actions";

export const useGeolocation = () => {

    const dispatch = useDispatch();

    const [geo, setGeo] = useState({
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position: any) {
                let geoPayload = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                dispatch((setUserGeo(geoPayload) as any));
                setGeo({
                    latitude: geoPayload.latitude,
                    longitude: geoPayload.longitude,
                })
            },
            function (error: any) {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
            }
        ); // eslint-disable-next-line
    }, []);

}