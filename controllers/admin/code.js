import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Alert } from 'react-native';
import ipCode from './ipcode';
import PasswordView from '../../view/passwordView';

const Code = (props) => {
	const [code, setCode] = useState('');
	const [num, setNum] = useState([]);

	useEffect(() => {
		fetchData();
	},[])
	const handlePassword = (text) => {
		setCode(text);
	};

	const fetchData = async () => {
		let ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/admin`);
		setNum(data);
	};

	const login = () => {
		let check = 0;
		for (var i = 0; i < num.length; i++) {
			if (code == 2020000) {
				props.navigation.navigate('Status', { adminKey: num[i].건물명, status: 'status' });
				check = 1;
			} else if (code == num[i].관리자번호) {
				check = 1;
				props.navigation.navigate('Situation', { adminKey: num[i].건물명, status: 'situation' });
			}
		}
		if (check == 0) Alert.alert('잘못된 코드번호 입니다.');
	};
	return (
		<PasswordView type={"관리자 코드번호"} handlePassword={handlePassword} login={login}></PasswordView>

	);
	
};

export default Code;

const styles = StyleSheet.create({
	container        : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#c2e8ff'
	},
	harfcontainer    : {
		flex            : 2,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#c2e8ff'
	},
	text             : {
		fontSize     : 20,
		color        : 'black',
		paddingLeft  : 30,
		paddingRight : 30
	},
	input            : {
		margin      : 50,
		height      : 60,
		width       : 250,
		borderColor : '#000000',
		borderWidth: 1,
		borderRadius: 20,
		textAlign: 'center'
	},
	submitButton     : {
		borderColor : '#000000',
		borderWidth : 1,
		padding     : 10,
		margin      : 15,
		height: 40,
		borderRadius: 20,
	},
	submitButtonText : {
		color : '#000000'
	}
});
