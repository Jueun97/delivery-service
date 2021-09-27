import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PasswordView from '../view/passwordView';
import DataHandler from '../model/dataHandler';

const PasswordController = (props) => {
	const [code, setCode] = useState(0);
	const [adminData, setAdminData] = useState([]);
	const [userData, setUserData] = useState([]);
	const { status } = props.route.params;
	const dataHandler = new DataHandler();

	useEffect(() => {
		if (status === 'admin')
			fetchAdminData();
		else
			fetchUserData();
	},[fetchAdminData,fetchUserData])

	const fetchAdminData = async () => {
		const data = await dataHandler.getAdminInfo();
		setAdminData(data);
	};
	const fetchUserData = async () => {
		const data = await dataHandler.getUserInfo();
		setUserData(data);
	};

	const handlePassword = (text) => {
		text = parseInt(text);
		setCode(text);
	};

	const adminLogin = () => {
		let check = 0;
		for (var i = 0; i < adminData.length; i++) {
			if (code === 2020000) {
				props.navigation.navigate('Status', { adminKey: adminData[i].건물명, status: 'status' });
				check = 1;
			} else if (code === adminData[i].관리자번호) {
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
				props.navigation.navigate('UserMypage', { adminKey: userData[i].전화번호 });
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