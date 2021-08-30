import React, { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import ipCode from '../admin/ipcode';
import axios from 'axios';
import BookingView from '../../view/user/BookingView';

const Book = (props) => {
	const [data, setData] = useState([]);
	const [paper, setPaper] = useState('')
	const building = props.route.params.building;

	useEffect(() => {
		getData();
	}, [getData]);

	const getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		getPaperInfo(data);
		setData(data);
	};
	const getPaperInfo = (data) => {
		let paper;
		for (let i = 0; i < data.length; i++) {
			if (data[i].건물명 == building)
				paper = data[i].서류현황
		}
		paper = `${100 - paper}/100`;
		setPaper(paper);
		
	}
	const checkPaper = (building, doc) => {
		console.log('checking', building, doc);
		var checking, paper;
		const totalPaper = [...data];
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
	const checkInfo = (name, phone, desti_1, doc) => {
		if (name != null && phone != null && desti_1 != null && doc != null) return true;
		else return false;
	}
	const saveButton = async (name, phone, desti_1, doc) => {
		//this.getData();
		console.log('saving..');
		var ip = ipCode();
		let token = await Notifications.getExpoPushTokenAsync();
		var checkInfoVAlue = checkInfo(name, phone, desti_1, doc);
		var check = checkPaper(building, doc);
		if (checkInfoVAlue) {
			if (check == 1) {
				fetch(`http://${ip}:3000/booking`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						Name: name,
						Phone: phone,
						desti_1: desti_1,
						doc: doc,
						building: building,
						expoPushToken: token
					})
				});
				Alert.alert(
					'예약진행',
					'완료되었습니다',
					[
						{
							text: 'OK',
							onPress: () => {
								props.navigation.navigate('ShowInfo', {
									name: name,
									phone: phone,
									desti: desti_1,
									doc: doc,
									navigation: 'User'
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
	return (
		<BookingView saveButton={saveButton} building={building} paper={paper}/>
	);
};

export default Book;