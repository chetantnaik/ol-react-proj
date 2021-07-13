import VectorSource from "ol/source/Vector";

function VectorSrc(options) { //options is an object that has all the source properties. More info at https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html
    return new VectorSource(
        options
    )
};

export default VectorSrc;