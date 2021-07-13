import { useContext, useEffect } from 'react';
import VectorLayer from 'ol/layer/Vector';
import MapContext from '../Map/MapWrapper';

const Vector = ({ title, source, visible, style }) => {
    const map = useContext(MapContext);


    useEffect(() => {
        const vectorLyr = new VectorLayer({
            title: title,
            source: source,
            visible: visible,
            style: style
        });

        if (map) {

            map.addLayer(vectorLyr);

            return () => {
                map.removeLayer(vectorLyr); //cleanup
            };
        }

    }, [map]);

    return null;
}

export default Vector;