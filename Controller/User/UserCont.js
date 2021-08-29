import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import ipCode from '../Admin/ipcode';
import UserView from '../../View/User/UserView';

const User = (props) => {
	const [info, setInfo] = useState('');

	useEffect(() => {
		fetchData();
	})

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		setInfo(data);
	};

	return (
		<UserView info={info} navigation={props.navigation} />
	);

};

export default User;
