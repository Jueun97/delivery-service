import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import ipCode from './ipcode';

const Code = (props) => {
	const [code, setCode] = useState('');
	const [num, setNum] = useState([]);

	useEffect(() => {
		getData();
	},[])
	const handlePassword = (text) => {
		setCode(text)
	};

	const getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/admin`);
		setNum(data);
	};

	const login = (pass) => {
		var check = 0;
		for (var i = 0; i < num.length; i++) {
			if (pass == num[i].관리자번호) {
				props.navigation.navigate('Situation', { adminKey: num[i].건물명 });
				check = 1;
			} else if (pass == 2020000) {
				props.navigation.navigate('Status', { adminKey: num[i].건물명 });
			}
		}
		if (check == 0) Alert.alert('잘못된 코드번호 입니다.');
	};
	return (
		//setHeaderOptions(props.navigation),
		(
			<View style={styles.container}>
				<View style={styles.harfcontainer}>
					<Text style={styles.text}>코드 번호를 입력해주세요.(숫자만입력)</Text>

					<TextInput
						style={styles.input}
						placeholder="code number"
						placeholderTextColor="#696969"
						autoCapitalize="none"
						onChangeText={handlePassword}
					/>
				</View>
				<View style={styles.container}>
					<TouchableOpacity style={styles.submitButton} onPress={() => login(code)}>
						<Text style={styles.submitButtonText}>확인</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
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
