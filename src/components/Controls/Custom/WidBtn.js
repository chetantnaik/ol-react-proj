import React from 'react';
import Icon from 'ol/style/Icon';
import 'ol/ol.css';
import './CustomControl.css';
import logo from './layers.png';

const WidBtn = ({ toggle, iconTxt }) => {

    return (
        <div className="layer-list ol-unselectable ol-control">
            <button onClick={toggle}><img src={logo} height={21} width={21}></img></button>
        </div>
    )
}

export default WidBtn;
