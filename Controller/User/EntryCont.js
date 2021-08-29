import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import ipCode from '../Admin/ipcode';
import EntryView from '../../View/User/EntryView';

const MyCode = (props) => {
	const [code, setCode] = useState('');
	const [num, setNum] = useState('');

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	
	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		setNum(data);
	};

	const handleLogin = (text) => {
		setCode(text);
	};

	const login = () => {
		let check = 0;
		for (var i = 0; i < num.length; i++) {
			if (code == num[i].전화번호) {
				props.navigation.navigate('Mypage', { adminKey: num[i].전화번호 });
				check = 1;
			}
		}
		if (check == 0) Alert.alert('잘못된 전화번호 입니다.');
	};
	return (
		<EntryView handleLogin={handleLogin} login={login} />
	);
};

export default MyCode;

