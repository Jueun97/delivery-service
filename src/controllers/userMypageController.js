import React, { useState,useEffect } from 'react';
import MypageView from '../view/userMypageView';
import DataHandler from '../model/dataHandler';

const UserMypageController = (props) => {
	const [info, setInfo] = useState('');
	const { adminKey } = props.route.params;

	useEffect(() => {
		fetchData();
	});

	fetchData = async () => {
		const dataHandler = new DataHandler();
		const data = await dataHandler.getUserInfo();
		setInfo(data);
	};

	return (
		<MypageView info={info} adminKey={adminKey} navigation={props.navigation} />
	)
};

export default UserMypageController;

