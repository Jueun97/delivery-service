import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ipCode from './admin/ipcode';
import MypageView from '../view/userMypageView';

const UserMypageController = (props) => {
	const [info, setInfo] = useState('');
	const { adminKey } = props.route.params;

	useEffect(() => {
		fetchData();
	});

	fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		setInfo(data);
	};

	return (
		<MypageView info={info} adminKey={adminKey} navigation={props.navigation} />
	)
};

export default UserMypageController;

