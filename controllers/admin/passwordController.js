import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Alert } from 'react-native';
import ipCode from './ipcode';
import PasswordView from '../../view/passwordView';

const PasswordController = (props) => {
	const [code, setCode] = useState('');
	const [adminData, setAdminData] = useState([]);
	const [userData, setUserData] = useState([]);
	const { status } = props.route.params;
	const ip = ipCode();

	useEffect(() => {
		if (status === 'admin')
			fetchAminData();
		else
			fetchUserData();
	},[])

	const fetchAminData = async () => {
		const { data } = await axios.get(`http://${ip}:3000/admin`);
		setAdminData(data);
	};
	const fetchUserData = async () => {
		const { data } = await axios.get(`http://${ip}:3000/User`);
		setUserData(data);
	};

	const handlePassword = (text) => {
		setCode(text);
	};

	const adminLogin = () => {
		let check = 0;
		for (var i = 0; i < adminData.length; i++) {
			if (code == 2020000) {
				props.navigation.navigate('Status', { adminKey: adminData[i].건물명, status: 'status' });
				check = 1;
			} else if (code == adminData[i].관리자번호) {
				check = 1;
				props.navigation.navigate('Situation', { adminKey: adminData[i].건물명, status: 'situation' });
			}
		}
		if (check == 0) Alert.alert('잘못된 코드번호 입니다.');
	};
	const userLogin = () => {
		let check = 0;
		for (var i = 0; i < userData.length; i++) {
			if (code == userData[i].전화번호) {
				props.navigation.navigate('Mypage', { adminKey: userData[i].전화번호 });
				check = 1;
			}
		}
		if (check == 0) Alert.alert('잘못된 전화번호 입니다.');
	};
	return (
		<>
			{status === 'admin' ? <PasswordView type={"코드번호"} handlePassword={handlePassword} login={adminLogin}></PasswordView> :
					<PasswordView type={"전화번호"} handlePassword={handlePassword} login={userLogin} />}
		
		</>

	);
	
};

export default PasswordController;