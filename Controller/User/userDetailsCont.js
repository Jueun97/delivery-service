import React, { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import ipCode from '../Admin/ipcode';
import DetailsView from '../../View/User/userDetailsView';

const Detail = (props) => {
	const [time, setTime] = useState('');
	const [disable, setDisable] = useState(false);
	const {list} = props.route.params;

	useEffect(() => {
		fetchData(list.건물명);
	}, [fetchData]);

	const fetchData = async (building) => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/delivery`);
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building)
				setTime(data[i].배송시간)
		}
		checkTime();
	};
	const checkTime = () => {
		var { time } = state;
		var hours = new Date().getHours();
		var min = new Date().getMinutes();
		var hoursU = parseInt(time[0]) * 10 + parseInt(time[1]);
		var minU = parseInt(time[3]) * 10 + parseInt(time[4]);
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
	const setHeaderOptions = (navigation) => {
		var user = list.주문자번호;
		navigation.setOptions({
			title       : user,
			headerLeft  : () => (
				<Entypo
					name="home"
					size={40}
					color={'black'}
					onPress={() => navigation.navigate('home')}
					style={{ paddingLeft: 20 }}
				/>
			),
			headerRight : () => (
				<Entypo
					name="arrow-bold-left"
					size={40}
					color={'black'}
					onPress={() => navigation.goBack()}
					style={{ paddingRight: 20 }}
				/>
			)
		});
	}

	const handleDelete = (UserID, doc, building, navigation) => {
		var ip = ipCode();

		Alert.alert('에약취소', '진행하시겠습니끼?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress : () => {
					fetch(`http://${ip}:3000/delete`, {
						method  : 'POST',
						headers : {
							Accept         : 'application/json',
							'Content-Type' : 'application/json'
						},
						body    : JSON.stringify({
							UserID   : UserID,
							doc      : doc,
							building : building
						})
					});
					Alert.alert('배송취소', '완료되었습니다', [
						{
							text    : 'OK',
							onPress : () => {
								navigation.navigate('User');
							}
						}
					]);
				}
			}
		]);
	}
	return (
		setHeaderOptions(props.navigation),
		(
			<DetailsView
				list={list}
				time={time}
				disable={disable}
				navigation={props.navigation}
				handleDelete={handleDelete}
			/>
		)
	);
};

export default Detail;
