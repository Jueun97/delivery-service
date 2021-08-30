import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../../view/admin/mapView';
import { Entypo } from '@expo/vector-icons';
import ipCode from './ipcode';

const MapCont = ({ navigation }) => {
	const [lat, setLat] = useState(0);
	const [lon, setLon] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
    
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
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3001/`);
		setLat(data[0].lat);
		setLon(data[1].lon);
		
	};
	const setHeaderOptions = (navigation) => {
		navigation.setOptions({
			headerLeft: () => (
				<Entypo
					name="cw"
					size={40}
					color={'black'}
					onPress={() => this.onRefresh()}
					style={{ paddingLeft: 20 }}
				/>
			),
			headerRight: () => (
				<Entypo
					name="arrow-bold-left"
					size={40}
					color={'black'}
					onPress={() => this.props.navigation.goBack()}
					style={{ paddingRight: 20 }}
				/>
			)
		});
	};
	return (setHeaderOptions(navigation), < Map lat = { lat } lon = { lon } refresh = {onRefresh } />);

};

export default MapCont;

