import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import ipCode from '../Admin/ipcode';
import DetailsView from '../../View/User/userDetailsView';

export default class Detail extends Component {
	state = { time: '', disable: false };
	getData = async (building) => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) this.setState({ time: data[i].배송시간 });
		}
		this.checkTime();
	};
	checkTime() {
		var { time } = this.state;
		var hours = new Date().getHours();
		var min = new Date().getMinutes();
		var hoursU = parseInt(time[0]) * 10 + parseInt(time[1]);
		var minU = parseInt(time[3]) * 10 + parseInt(time[4]);
		if (minU == 0) {
			if (hours >= hoursU) {
				this.setState({ disable: true });
			} else if (hours == hoursU - 1 && min >= 50) {
				this.setState({ disable: true });
			}
		} else {
			if (hours > hoursU || (hours == hoursU && min >= 20)) {
				this.setState({ disable: true });
			}
		}
	}
	setHeaderOptions(navigation) {
		const { list } = this.props.route.params;
		var user = list.주문자번호;
		navigation.setOptions({
			title       : user,
			headerLeft  : () => (
				<Entypo
					name="home"
					si	ze={40}
					color={'black'}
					onPress={() => navigation.navigate('home')}
					style={{ paddingLeft: 20 }}
				/>
			),
			headerRight : () => (
				<Entypo
					name="arrow-bold-left"
					size={40}
					color={'black'}
					onPress={() => navigation.goBack()}
					style={{ paddingRight: 20 }}
				/>
			)
		});
	}

	handleDelete(UserID, doc, building, navigation) {
		var check = 0;
		var ip = ipCode();

		Alert.alert('에약취소', '진행하시겠습니끼?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress : () => {
					fetch(`http://${ip}:3000/delete`, {
						method  : 'POST',
						headers : {
							Accept         : 'application/json',
							'Content-Type' : 'application/json'
						},
						body    : JSON.stringify({
							UserID   : UserID,
							doc      : doc,
							building : building
						})
					});
					Alert.alert('배송취소', '완료되었습니다', [
						{
							text    : 'OK',
							onPress : () => {
								navigation.navigate('User');
							}
						}
					]);
				}
			}
		]);
	}
	componentDidMount() {
		const { list } = this.props.route.params;
		this.getData(list.건물명);
	}
	render() {
		const { list } = this.props.route.params;
		return (
			this.setHeaderOptions(this.props.navigation),
			(
				<DetailsView
					list={list}
					time={this.state.time}
					disable={this.state.disable}
					navigation={this.props.navigation}
					handleDelete={this.handleDelete}
				/>
			)
		);
	}
}
