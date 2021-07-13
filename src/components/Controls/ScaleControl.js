import { useContext, useEffect } from 'react';
import ScaleLine from 'ol/control/ScaleLine';
import MapContext from '../Map/MapWrapper';
import 'ol/ol.css';

const ScaleControl = () => {
    const map = useContext(MapContext);
    useEffect(() => {
        let scale = new ScaleLine();
        if (map) {
            map.controls.push(scale);

            return () => {
                map.controls.remove(scale);
            }
        }
    })

    return null;

}

export default ScaleControl;