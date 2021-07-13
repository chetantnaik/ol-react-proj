import { useContext, useState, useEffect, useRef } from 'react';
import WidBtn from './WidBtn';
import MapContext from '../../Map/MapWrapper';
import './CustomControl.css';

const LayerListControl = () => {
    const map = useContext(MapContext);
    const [visibility, setVisibility] = useState(false);
    const [panelClass, setPanelClass] = useState("panel-hide");
    const panelRef = useRef();

    const togglePanel = () => {
        setVisibility(!visibility);
    }

    const switchVisibility = (e) => {
        //get layers array from map object
        let lyrObj = map.getLayers();
        let lyrs = lyrObj.array_;
        //get checkbox value
        let lyr = e.target.value;
        //define index for layer
        let n;
        for (let l = 1; l < lyrs.length; l++) {
            if (lyrs[l].values_.title == lyr) {
                n = l;
            }
        }
        if (e.target.checked) {
            lyrs[n].setVisible(true);
        } else {
            lyrs[n].setVisible(false);

        }
    }

    useEffect(() => {
        if (map) {

            let lyrObj = map.getLayers();
            let lyrs = lyrObj.array_;
            let e = document.createElement("div");
            for (let i = lyrs.length - 1; i > 0; i--) {
                let lyrLbl = document.createElement("div");
                let chkBox = document.createElement("input");
                chkBox.type = "checkbox";
                if (lyrs[i].values_.title) {
                    chkBox.value = lyrs[i].values_.title;
                } else {
                    chkBox.value = `Layer {0}`.format(i.toString());
                }
                chkBox.classList.add("chkbox");
                let mapLyrVisibility = lyrs[i].getVisible();
                chkBox.defaultChecked = mapLyrVisibility;

                //add event listerner to layer
                chkBox.addEventListener("change", switchVisibility);

                //create layer label
                let elem = document.createElement("div");
                elem.classList.add("lyr");

                elem.innerHTML = lyrs[i].values_.title;
                //append checkbox and label
                lyrLbl.classList.add("layer-item");
                lyrLbl.appendChild(chkBox);
                lyrLbl.appendChild(elem);

                e.appendChild(lyrLbl);

            }

            panelRef.current.appendChild(e);


        }
    }, [map])

    useEffect(() => {
        if (visibility) {
            setPanelClass("panel-visible");
        } else {
            setPanelClass("panel-hide");
        }
    }, [visibility])

    return (
        <>
            <WidBtn toggle={togglePanel} iconTxt="L" />
            <div ref={panelRef} className={panelClass}></div>
        </>
    )
}

export default LayerListControl;