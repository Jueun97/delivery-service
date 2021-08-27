import React, { Component } from 'react';
import axios from 'axios';
import Map from '../../View/Admin/mapView';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import ipCode from './ipcode';
export default class MapCont extends Component {
	state = {
		lat : 0,
		lon : 0
	};
	onRefresh = () => {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.getData().then(() => {
				this.setState({ refreshing: false });
			});
		}, 1000);
	};
	getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3001/`);

		this.setState({ lat: data[0].lat, lon: data[1].lon });
		var hour = new Date().getHours();
		var min = new Date().getMinutes();
		var sec = new Date().getSeconds();
		var mil = new Date().getMilliseconds();

		console.log('끝', hour + '시' + min + '분' + sec + '.' + mil + '초');
	};

	setHeaderOptions(navigation) {
		navigation.setOptions({
			headerLeft  : () => (
				<Entypo
					name="cw"
					size={40}
					color={'black'}
					onPress={() => this.onRefresh()}
					style={{ paddingLeft: 20 }}
				/>
			),
			headerRight : () => (
				<Entypo
					name="arrow-bold-left"
					size={40}
					color={'black'}
					onPress={() => this.props.navigation.goBack()}
					style={{ paddingRight: 20 }}
				/>
			)
		});
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		var hour = new Date().getHours();
		var min = new Date().getMinutes();
		var sec = new Date().getSeconds();
		var mil = new Date().getMilliseconds();
		console.log('시작', hour + '시' + min + '분' + sec + '.' + mil + '초');
		const { lat, lon } = this.state;
		return this.setHeaderOptions(this.props.navigation), <Map lat={lat} lon={lon} refresh={this.onRefresh} />;
	}
}
