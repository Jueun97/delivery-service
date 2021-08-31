import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SituationView from '../../view/admin/SituationView';
import StatusView from '../../view/admin/StatusView';
import ipCode from './ipcode';

const BookingStateController = ({navigation,route}) => {
	const [info, setInfo] = useState('');
	const adminKey = route.params.adminKey;
	const status = route.params.status;

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		setInfo(data);
	};
	const bookingStateHandler = (building) => {
		Alert.alert(building, '배송 시작하시겠습니까?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress: () => {
					Alert.alert('처리되었습니다.');
					await fetch(`http:/${ip}:3000/User`, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							Building: building,
							Condition: '배송중'
						})
					});
				}
			}
		]);
	}
	return (
		<>
			{status === 'situation' ? <SituationView data={info} adminKey={adminKey} navigation={navigation} />
			: <StatusView data={info} adminKey={adminKey} navigation={navigation} bookingStateHandler={bookingStateHandler} />}
		</>
	)

};

export default BookingStateController;