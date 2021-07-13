import { useState, useRef, useEffect } from 'react';
import MapContext from './MapWrapper';
import OlMap from 'ol/Map';
import View from 'ol/View';
import './Map.css';


const Map = ({ children, center, zoom }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    //On component mount
    useEffect(() => {
        let initMap = new OlMap({
            target: mapRef.current,
            view: new View({
                center: center,
                zoom: zoom
            }),
            layers: [],
            controls: []

        })

        setMap(initMap);

    }, [])

    //Temporary useEffect to get the map coordinates on click event - start

    const captureCoord = (evt) => {
        console.log(evt.coordinate);
    }
    useEffect(() => {
        if (map) {
            map.addEventListener("click", captureCoord);

            return () => {
                map.removeEventListener("click", captureCoord); //cleanup
            }
        };



    }, [map])

    //Temporary useEffect to get the map coordinates on click event - end

    return (
        <MapContext.Provider value={map}>
            <div ref={mapRef} className="ol-map">{children}</div>
        </MapContext.Provider>
    )
}

export default Map;