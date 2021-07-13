import { useContext, useEffect } from 'react';
import Zoom from 'ol/control/Zoom';
import MapContext from '../Map/MapWrapper';
import 'ol/ol.css';
import './Controls.css';

const ZoomControl = () => {
    const map = useContext(MapContext);
    useEffect(() => {
        let zoom = new Zoom();
        if (map) {
            map.controls.push(zoom);

            return () => {
                map.controls.remove(zoom);
            }
        }

    })

    return null;

}

export default ZoomControl;