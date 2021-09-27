import React, {useEffect,useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import ListView from '../view/bookingListView';
import DataHandler from '../model/dataHandler';

const BookingListCont = ({navigation,route}) => {
	const [list, setList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const dataHandler = new DataHandler();

	useEffect(() => {
		fetchData().then(data => getData(data));
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
		const data = await dataHandler.getUserInfo();
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
	const notification = async (userId, token, name, state) => {
		console.log("token", token);
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
				dataHandler.sendMessage(message);
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
			dataHandler.sendMessage(message);
		}
	};
	const bookingStateHandler = async (userId, building, state) => {
		if (userId === 0) {
			//전체 배송안료,취소
			Alert.alert('처리되었습니다.');
			dataHandler.updateAllBookingState(userId.toString(), building, state);
		} else {
			//개인 배송완료,취소
			dataHandler.updateBookingState(userId.toString(), state);
		}
	};
	return (
		<ScrollView style={{ backgroundColor: '#c2e8ff' }}>
			<ListView data={list} navigation={navigation} bookingStateHandler={bookingStateHandler} notification={notification} onRefresh={onRefresh} />
		</ScrollView>
	);
};

export default BookingListCont;

