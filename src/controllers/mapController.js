import React, {useEffect, useState } from 'react';
import Map from '../view/mapView';
import DataHandler from '../model/dataHandler';

const MapController = ({ navigation }) => {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const dataHandler = new DataHandler();

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const onRefresh = () => {
		setRefreshing(true);
		
		setTimeout(() => {
			fetchData().then(() => {
				setRefreshing(false)
			});
		}, 1000)
	};

	const fetchData = async () => {
		const data = await dataHandler.getLocation();
		setLat(data[0].lat);
		setLon(data[1].lon);
		
	};
	return ( < Map lat = { lat } lon = { lon } refresh = {onRefresh } />);

};

export default MapController;

