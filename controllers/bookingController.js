import React, { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import ipCode from './admin/ipcode';
import axios from 'axios';
import BookingFormView from '../view/bookingFormView';

const BookingController = (props) => {
	const [data, setData] = useState([]);
	const [paper, setPaper] = useState('')
	const { building,list,status } = props.route.params;
	console.log("status", status, building, list);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		getPaperInfo();
		setData(data);
	};
	const getPaperInfo = () => {
		let paper;
		for (let i = 0; i < data.length; i++) {
			if (data[i].건물명 == building)
				paper = data[i].서류현황
		}
		paper = `${100 - paper}/100`;
		setPaper(paper);
		
	}
	const checkPaper = (building, doc,prevPaper) => {
		let checking;
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) {
				checking = parseInt(doc) + parseInt(data[i].서류현황) - parseInt(prevPaper?prevPaper:0);
				break;
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
	const update = async (name, phone, desti_1, doc) => {
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

	const upload = async (name, phone, desti_1, doc) => {
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
		<>
			{status === "upload" ? <BookingFormView saveButton={upload} paper={paper} /> :
				<BookingFormView saveButton={update} list={list} />}
		</>
	);
};

export default BookingController;