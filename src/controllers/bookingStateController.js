import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import StateView from '../view/bookingStateView';
import StatusView from '../view/bookingStatusView';
import UserView from '../view/UserView';
import DataHandler from '../model/dataHandler';

const BookingStateController = ({navigation,route}) => {
	const [info, setInfo] = useState('');
	const adminKey = route.params.adminKey;
	const status = route.params.status;
	const dataHandler = new DataHandler();

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		const  data  = await dataHandler.getDeliveryInfo();
		setInfo(data);
	};
	const bookingStateHandler = (building) => {
		Alert.alert(building, '배송 시작하시겠습니까?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress: () => {
					Alert.alert('처리되었습니다.');
					dataHandler.updateAllBookingState(0, building, '배송중');
				}
			}
		]);
	}
	return (
		<>
			{status === 'situation' && <StateView data={info} adminKey={adminKey} navigation={navigation} />}
			{status === 'status' && <StatusView data={info} adminKey={adminKey} navigation={navigation} bookingStateHandler={bookingStateHandler} />}
			{status === 'user' && 	<UserView info={info} navigation={navigation} />}
		</>
	)

};

export default BookingStateController;