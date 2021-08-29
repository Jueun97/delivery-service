import React, { useState } from 'react';
import { Alert } from 'react-native';
import ipCode from '../Admin/ipcode';
import axios from 'axios';
import UpdateView from '../../View/User/UpdateView';

const Update = (props) => {
	const [data, setData] = useState(data);
	const { list } = props.route.params;

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		setData(data);
	};
	const checkPaper = (building, prevPaper, doc) => {
		let checking;
		const tempData = [...data];
		for (var i = 0; i < tempData.length; i++) {
			if (tempData[i].건물명 == building) {
				checking = parseInt(doc) + parseInt(tempData[i].서류현황) - parseInt(prevPaper);
				console.log(prevPaper);
			}
		}
		if (doc <= 50 && checking <= 100) {
			return checking;
		} else {
			return 0;
		}
	}
	const saveButton = async (list, name, phone, desti_1, doc) => {
		fetchData();
		if (name == null) name = list.이름;
		if (phone == null) phone = list.전화번호;
		if (desti_1 == null) desti_1 = list.배송지;
		if (doc == null) doc = list.서류수량;

		var UserID = list.주문자번호;
		var building = list.건물명;
		var prevPaper = list.서류수량;
		var ip = ipCode();
		var checking = checkPaper(building, prevPaper, doc);
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
							props.navigation.navigate('ShowInfo', {
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

	return (
		<UpdateView list={list} navigation={props.navigation} saveButton={saveButton} />
	);
};

export default Update;
