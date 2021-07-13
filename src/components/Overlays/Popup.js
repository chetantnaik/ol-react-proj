import { useContext, useEffect, useRef } from 'react';
import MapContext from '../Map/MapWrapper';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';
import './Overlays.css';

const Popup = () => {
  const map = useContext(MapContext);

  const popupRef = useRef();
  const pHeadRef = useRef();
  const pContentRef = useRef();
  const pCloserRef = useRef();

  const overlay = new Overlay({
    element: popupRef.current,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  const setOverlay = (evt) => {
    console.log(evt.coordinate);
    let pCount = 0;
    map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
      if (pCount == 0) {
        let pTitle = document.createElement("h9"); //popup title element
        pTitle.classList.add("popup-title");
        pTitle.innerHTML = layer.values_.title; //populate the popup title
        pHeadRef.current.innerHTML = "";
        pHeadRef.current.appendChild(pTitle);
        let pTable = document.createElement("table"); //create table to populate values
        let pBody = pTable.createTBody(); //popup table body
        let fObj = feature.getProperties(); //get the feature properties object
        let allVals = Object.keys(fObj); //list of object keys
        let vals = [];
        allVals.forEach(function (val) {
          if (val != "geometry") {
            vals.push(val);
          }
        });
        for (let v = 0; v < vals.length; v++) {
          let pRow = pTable.insertRow();
          //create td elements to accomodate the td
          let tdLeft = document.createElement("td");
          let tdCenter = document.createElement("td");
          tdCenter.style.width = "10px";
          let tdRight = document.createElement("td");

          //create text node
          let boldLeftText = document.createElement("strong");
          let textLeft = document.createTextNode(vals[v]);
          boldLeftText.appendChild(textLeft);
          let textCenter = document.createTextNode(":");
          let textRight = document.createTextNode(fObj[vals[v]]);

          //append all text nodes in their respective td elements
          tdLeft.appendChild(boldLeftText);
          tdCenter.appendChild(textCenter);
          tdRight.appendChild(textRight);

          //append all td elements inside the row
          pRow.appendChild(tdLeft);
          pRow.appendChild(tdCenter);
          pRow.appendChild(tdRight);

          //append row inside body element
          pBody.appendChild(pRow);
          pContentRef.current.innerHTML = "";
          pContentRef.current.appendChild(pTable);
        }
        pCount += 1;
      }
      overlay.setPosition(evt.coordinate);
      map.addOverlay(overlay);
    });

  }

  const closePopup = (evt) => {
    overlay.setPosition(undefined);
    pCloserRef.current.blur();
    return false;
  }


  useEffect(() => {
    if (map) {
      map.addEventListener('click', setOverlay);
      pCloserRef.current.addEventListener('click', closePopup);
      popupRef.current.className = "ol-popup";

      return () => {
        map.removeEventListener('click', setOverlay);
        pCloserRef.current.removeEventListener('click', closePopup);
        popupRef.current.className = "ol-popup-init";
      }
    }
  }, [map]);

  return (
    <div id="popup" ref={popupRef} className="ol-popup-init">
      <div ref={pHeadRef} className="popup-head"></div>
      <a href="#" id="popup-closer" ref={pCloserRef} className="ol-popup-closer"></a>
      <div className="popup-content" ref={pContentRef}></div>
    </div>
  );
}

export default Popup;