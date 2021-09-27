import React, { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import DetailsView from '../view/userDetailsView';
import DataHandler from '../model/dataHandler';

const UserDetailsController = (props) => {
	const [time, setTime] = useState('');
	const [disable, setDisable] = useState(false);
	const { list } = props.route.params;
	const dataHandler = new DataHandler();

	useEffect(() => {
		fetchData(list.건물명);
	}, [fetchData]);

	const fetchData = async (building) => {
		const data = await dataHandler.getDeliveryInfo();
		for (let i = 0; i < data.length; i++) {
			if (data[i].건물명 == building)
				setTime(data[i].배송시간)
		}
		checkTime();
	};
	const checkTime = () => {
		let hours = new Date().getHours();
		let min = new Date().getMinutes();
		let hoursU = parseInt(time[0]) * 10 + parseInt(time[1]);
		let minU = parseInt(time[3]) * 10 + parseInt(time[4]);
		if (minU == 0) {
			if (hours >= hoursU) {
				setDisable(true);
			} else if (hours == hoursU - 1 && min >= 50) {
				setDisable(true);
			}
		} else {
			if (hours > hoursU || (hours == hoursU && min >= 20)) {
				setDisable(true);
			}
		}
	}

	const handleDelete = (userId, document, building, navigation) => {
		Alert.alert('에약취소', '진행하시겠습니끼?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress: () => {
					dataHandler.deleteBooking(userId, document, building);
					Alert.alert('배송취소', '완료되었습니다', [
						{
							text    : 'OK',
							onPress : () => {
								navigation.navigate('User',{status:'user'});
							}
						}
					]);
				}
			}
		]);
	}
	return (
			<DetailsView
				list={list}
				time={time}
				disable={disable}
				navigation={props.navigation}
				handleDelete={handleDelete}
			/>
		);
};

export default UserDetailsController;
