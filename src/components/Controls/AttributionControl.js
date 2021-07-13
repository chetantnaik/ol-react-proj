import { useContext, useEffect } from 'react';
import Attribution from 'ol/control/Attribution';
import MapContext from '../Map/MapWrapper';
import 'ol/ol.css';

const AttributionControl = () => {
    const map = useContext(MapContext);
    useEffect(() => {
        let attribution = new Attribution();
        if (map) {
            map.controls.push(attribution);

            return () => {
                map.controls.remove(attribution);
            }
        }
    })

    return null;

}

export default AttributionControl;