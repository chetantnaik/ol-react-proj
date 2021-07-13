import { useContext, useRef, useEffect, useState } from 'react';
import './Animations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapContext from '../Map/MapWrapper';

const VectorLoad = () => {

    const map = useContext(MapContext);
    const vectorLoadRef = useRef();
    const [loadClass, setLoadClass] = useState("loading");

    const stopLoading = () => {
        //vectorLoadRef.current.className = "loading-stop";
        setLoadClass("loading-stop");
    }

    const startLoading = () => {
        //vectorLoadRef.current.className = "loading";
        setLoadClass("loading");
    }

    useEffect(() => {
        if (map) {
            map.addEventListener("rendercomplete", stopLoading);
            map.addEventListener("precompose", startLoading);

            return () => {
                map.removeEventListener("rendercomplete", stopLoading);
                map.removeEventListener("precompose", startLoading);
            }
        }
    }, [map])


    return (

        <div ref={vectorLoadRef} className={loadClass}>
            <div className="spinner-border text-primary" role="status">
            </div>
        </div>
    )
}

export default VectorLoad;