import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SituationView from '../../View/Admin/SituationView';
import ipCode from './ipcode';

const SituationCont = ({navigation,route}) => {
	const [info, setInfo] = useState('');
	const adminKey = route.params;

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		setInfo(data);
	};

	return (
			<SituationView data={info} adminKey={adminKey} navigation={navigation} />
		);
};

export default SituationCont;