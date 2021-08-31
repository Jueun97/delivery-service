import React, {useEffect,useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import axios from 'axios';
import ListView from '../view/bookingListView';
import ipCode from './admin/ipcode';


const ListCont = ({navigation,route}) => {
	const [list, setList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const ip = ipCode();

	useEffect(() => {
		fetchData().then(data=>getData(data));
	},[fetchData]);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			fetchData().then(() => {
				setRefreshing(false);
			});
		}, 2000);
	};

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		return data
	};

	const getData = (data) => {
		const { destination } = route.params;
		const list = [];
		var index = 0;

		for (var i = 0; i < data.length; i++) {
			console.log(data[i])
			if (data[i].건물명 === destination) {
				list[index] = data[i];
				index++;
			}
		}
		setList(list);
	}
	const notification = (userId, token, name, state) => {
		if (userId === 0) {
			for (var i = 0; i < token.length; i++) {
				const message = {
					to: token[i].알림코드,
					sound: 'default',
					title: token[i].이름 + ' 님의 배송상태',
					body: state + ' 되었습니다',
					data: { data: 'goes here' },
					_displayInForeground: true
				};
				const response = await fetch('https://exp.host/--/api/v2/push/send', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Accept-encoding': 'gzip, deflate',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(message)
				});
			}
		} else {
			const message = {
				to: token,
				sound: 'default',
				title: name + ' 님의 배송상태',
				body: state + ' 되었습니다',
				data: { data: 'goes here' },
				_displayInForeground: true
			};
			const response = await fetch('https://exp.host/--/api/v2/push/send', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Accept-encoding': 'gzip, deflate',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(message)
			});
		}
	}
	const bookingStateHandler = (userId, building, state) => {
		if (userId === 0) {
			//전체 배송안료,취소
			Alert.alert('처리되었습니다.');
			await fetch(`http:/${ip}:3000/User`, {
				method  : 'POST',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify({
					userId    : userId.toString(),
					building  : building,
					bookingStateHandler : state
				})
			});
		} else {
			//개인 배송완료,취소
			await fetch(`http://${ip}:3000/User`, {
				method  : 'POST',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify({
					userId    : userId.toString(),
					bookingStateHandler : state
				})
			});
		}
	}
	const doneHandler = async (userId, token, name) => {
		Alert.alert('배송상태', '완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					bookingStateHandler(userId, '완료', '배송완료'), notification(userId, token, name, '배송완료'), onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	const doneAllHandler = async (building) => {
		Alert.alert('배송상태', '전체완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress: () => {
					bookingStateHandler(0, building, '배송완료'),
						notification(0, this.props.data, '', '배송완료'),
						onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	const cancelAllHandler = async (building) => {
		Alert.alert(
			'배송상태',
			'전체취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						bookingStateHandler(0, building, '배송취소'),
							notification(0, this.props.data, '', '배송취소'),
							onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	const cancelHandler = async (userId, token, name) => {
		Alert.alert(
			'배송상태',
			'취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						bookingStateHandler(userId, '취소', '배송취소'),
							notification(userId, token, name, '배송취소'),
							onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	return (
		<ScrollView style={{ backgroundColor: '#c2e8ff' }}>
			<ListView data={list} navigation={navigation} doneAllHandler={doneAllHandler} doneAllHandler={doneAllHandler} cancelHandler={cancelHandler} cancelAllHandler={cancelHandler} />
		</ScrollView>
	);
};

export default ListCont;

