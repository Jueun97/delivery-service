import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { TextInput, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Notifications } from 'expo';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import ipCode from '../Admin/ipcode';
import axios from 'axios';
import UpdateView from '../../View/User/UpdateView';
export default class Update extends Component {
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
		this.setState({ data });
	};
	checkPaper(building, prevPaper, doc) {
		var checking;
		const data = this.state.data;
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) {
				checking = parseInt(doc) + parseInt(data[i].서류현황) - parseInt(prevPaper);
				console.log(prevPaper);
			}
		}
		if (doc <= 50 && checking <= 100) {
			return checking;
		} else {
			return 0;
		}
	}
	saveButton = async (list, name, phone, desti_1, doc) => {
		this.getData();
		this.setState({ check: false });
		if (name == null) name = list.이름;
		if (phone == null) phone = list.전화번호;
		if (desti_1 == null) desti_1 = list.배송지;
		if (doc == null) doc = list.서류수량;

		var UserID = list.주문자번호;
		var building = list.건물명;
		var prevPaper = list.서류수량;
		var ip = ipCode();
		var checking = this.checkPaper(building, prevPaper, doc);
		if (checking != 0) {
			fetch(`http://${ip}:3000/update`, {
				method  : 'POST',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify({
					UserID   : UserID,
					Name     : name,
					Phone    : phone,
					desti_1  : desti_1,
					doc      : doc,
					finalDoc : checking,
					building : building
				})
			});
			Alert.alert(
				'예약정보수정',
				'완료되었습니다',
				[
					{
						text    : 'OK',
						onPress : () => {
							list.이름 = null;
							this.props.navigation.navigate('ShowInfo', {
								name       : name,
								phone      : phone,
								desti      : desti_1,
								doc        : doc,
								navigation : 'Mypage'
							});
						}
					}
				],
				{ cancelable: false }
			);
		} else {
			Alert.alert('서류수량초과', '예약가능한 서류수량 초과하였습니다.', [
				{
					text    : 'OK',
					onPress : () => {}
				}
			]);
		}
	};
	componentDidMount() {}
	render() {
		const { list } = this.props.route.params;
		return (
			<UpdateView list={list}  navigation={this.props.navigation} saveButton={this.saveButton} />
		);
	}
}
