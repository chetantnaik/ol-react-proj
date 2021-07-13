import './App.css';
import VectorLoad from './components/Animations/VectorLoad';
import Map from './components/Map/Map';
import Layers from './components/Layers/Layers';
import { Tile, Vector } from './components/Layers';
import { Style, Stroke, Fill } from 'ol/style';
import { OSM, VectorSrc } from './components/Source';
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import Controls from './components/Controls/Controls';
import { ZoomControl, ScaleControl, AttributionControl, LayerListControl, SearchFeatureControl } from './components/Controls';
import Overlays from './components/Overlays/Overlays';
import { Popup } from './components/Overlays';


//Create the WFS source object so that it can be passed to VectorSrc as an argument - start

const TOWNS_POLY = {
  format: new GeoJSON(),
  attributions: "| ol-ext &copy; <a href='https://github.com/Viglino/ol-ext/blob/master/LICENSE.md' target='_blank'>2016-2018 - Jean-Marc Viglino, IGN-France</a><br>&copy; <a href='https://www.mass.gov/service-details/about-massgis' target='_blank'>MassGIS (Bureau of Geographic Information), Commonwealth of Massachusetts EOTSS</a>",

  loader: function (extent, resolution, projection) {
    var proj = projection.getCode();
    var url = 'https://giswebservices.massgis.state.ma.us/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=massgis:GISDATA.TOWNS_POLY&' +
      'outputFormat=application/json&srsname=' + proj + '&' +
      'bbox=' + extent.join(',') + ',' + proj;
    /*var url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
      'outputFormat=application/json&srsname=' + proj + '&' +
      'bbox=' + extent.join(',') + ',' + proj;*/
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    var onError = function () {
      Towns.removeLoadedExtent(extent);
      alert("One or more layers failed to load");
    }
    xhr.onerror = onError;
    xhr.onload = function () {
      if (xhr.status == 200) {
        Towns.addFeatures(
          Towns.getFormat().readFeatures(xhr.responseText));
      } else {
        onError();
      }
    }
    xhr.send();
  },
  strategy: bboxStrategy,
}

const Towns = VectorSrc(TOWNS_POLY)
//Create the WFS source object so that it can be passed to VectorSrc as an argument - end

//Style
const stroke = new Stroke({
  color: "rgb(255,0,0,0.7)"
});
const fill = new Fill({
  color: "rgb(255,128,0,0.5)"
});
const style = new Style({
  stroke: stroke,
  fill: fill
});


//Set the center and zoom - start
const center = [-7992101.288526376, 5197692.384102746];
const zoom = 9;
const extent = [-15506166.91707234, 1514039.116983532, -478035.6599804098, 8881345.65122196];
//Set the center and zoom - end

function App() {
  return (
    <>
      <Map center={center} zoom={zoom} extent={extent}>
        <Layers>
          <Tile source={OSM()} />
          <Vector title="TOWNS" source={Towns} visible={true} style={style} />
        </Layers>
        <Controls>
          <ZoomControl />
          <ScaleControl />
          <AttributionControl />
          <LayerListControl />
          <SearchFeatureControl vectorSource={Towns} searchField={"town"} />
        </Controls>
        <Overlays>
          <Popup />
        </Overlays>
        <VectorLoad />
      </Map>
    </>
  );
}

export default App;
