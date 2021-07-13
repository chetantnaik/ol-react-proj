//Ol-Ext source: https://github.com/Viglino/ol-ext#:~:text=ol-ext%20is%20a%20set%20of%20extensions%2C%20controls%2C%20interactions%2C,wikipedia%20layer%2C%20legend%20control%2C%20search%2C%20animations%2C%20undo%2Fredo%20mechanisms

import { useContext, useEffect } from "react";
import Select from "ol/interaction/Select";
import SearchFeature from "ol-ext/control/SearchFeature";
import MapContext from "../../Map/MapWrapper";
import 'ol/ol.css';
import "ol-ext/dist/ol-ext.css";
import "ol-ext/control/Search.css";


const SearchFeatureControl = ({ vectorSource, searchField }) => {
	const map = useContext(MapContext);

	useEffect(() => {
		if (map) {
			// Control Select 
			var select = new Select({
			});
			map.addInteraction(select);

			let searchFeatureControl = new SearchFeature({
				source: vectorSource,
				property: searchField
			});

			map.controls.push(searchFeatureControl);

			// Select feature when click on the reference index
			searchFeatureControl.on('select', function (e) {
				select.getFeatures().clear();
				select.getFeatures().push(e.search);
				var p = e.search.getGeometry().getFirstCoordinate();
				map.getView().animate({
					center: p,
					zoom: 15
				});
			});

			return () => map.controls.remove(searchFeatureControl);
		}


	}, [map]);

	return null;
};

export default SearchFeatureControl;