import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { TextInput, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Notifications } from 'expo';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import ipCode from '../Admin/ipcode';
import axios from 'axios';
import BookingView from '../../View/User/BookingView';
export default class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			apiData       : [],
			expoPushToken : ''
		};
	}
	getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		this.getPaperInfo(data);
		this.setState({ data });
	};
	getPaperInfo(data) {
		const { building } = this.props.route.params;
		let paper;
		for (let i = 0; i < data.length; i++){
			if (data[i].건물명 == building)
				paper = data[i].서류현황
		}
		paper = `${100-paper}/100`;
		this.setState({ building,paper });
		
	}
	checkPaper(building, doc) {
		console.log('checking', building, doc);
		var checking,paper;
		const totalPaper = this.state.data;
		for (var i = 0; i < totalPaper.length; i++) {
			if (totalPaper[i].건물명 == building) {
				checking = parseInt(doc) + parseInt(totalPaper[i].서류현황);
				console.log('checking value', checking);
			}
		}
		if (doc <= 50 && checking <= 100) {
			return 1;
		} else {
			return 0;
		}
	}
	checkInfo(name, phone, desti_1, doc) {
		if (name != null && phone != null && desti_1 != null && doc != null) return true;
		else return false;
	}
	saveButton = async (name, phone, desti_1, doc) => {
		//this.getData();
		console.log('saving..');
		var ip = ipCode();
		const { building } = this.props.route.params;
		let token = await Notifications.getExpoPushTokenAsync();
		var checkInfo = this.checkInfo(name, phone, desti_1, doc);
		var check = this.checkPaper(building, doc);
		if (checkInfo) {
			if (check == 1) {
				fetch(`http://${ip}:3000/booking`, {
					method  : 'POST',
					headers : {
						Accept         : 'application/json',
						'Content-Type' : 'application/json'
					},
					body    : JSON.stringify({
						Name          : name,
						Phone         : phone,
						desti_1       : desti_1,
						doc           : doc,
						building      : building,
						expoPushToken : token
					})
				});
				Alert.alert(
					'예약진행',
					'완료되었습니다',
					[
						{
							text    : 'OK',
							onPress : () => {
								this.props.navigation.navigate('ShowInfo', {
									name       : name,
									phone      : phone,
									desti      : desti_1,
									doc        : doc,
									navigation : 'User'
								});
							}
						}
					],
					{ cancelable: false }
				);
			} else {
				Alert.alert('서류수량초과', '가능한 서류수량을 초과하였습니다. 확인 부탁드립니다.');
			}
		} else {
			Alert.alert('정보 입력 오류', '필수 정보를 모두 입력해주세요!');
		}
	};
	getNotifiCode = async () => {
		let token = await Notifications.getExpoPushTokenAsync(); //토큰 받아오는 함수
		this.setState({ expoPushToken: token });
		Alert.alert('toekn is', this.state.expoPushToken);
	};
	componentDidMount() {
		this.getData();
	}
	render() {
		const {building, paper } = this.state;
		return  <BookingView saveButton={this.saveButton} building={building} paper ={paper} />;
	}
}
