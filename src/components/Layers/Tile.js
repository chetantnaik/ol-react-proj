import { useContext, useEffect } from 'react';
import TileLayer from 'ol/layer/Tile';
import MapContext from '../Map/MapWrapper';


const Tile = ({ source }) => {
    const map = useContext(MapContext);


    useEffect(() => {
        const baseLyr = new TileLayer({
            source: source
        });
        if (map) {
            map.addLayer(baseLyr);

            return () => {
                map.removeLayer(baseLyr); //cleanup
            }
        }
    }, [map]);

    return null
}

export default Tile;