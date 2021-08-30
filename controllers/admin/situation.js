import React, { useEffect,useState } from 'react';
import axios from 'axios';
import SituationView from '../../view/admin/SituationView';
import StatusView from '../../view/admin/StatusView';
import ipCode from './ipcode';

const SituationCont = ({navigation,route}) => {
	const [info, setInfo] = useState('');
	const adminKey = route.params.adminKey;
	const status = route.params.status;
	console.log("status", status);
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		setInfo(data);
	};

	return (
		<>
			{status === 'situation' ? <SituationView data={info} adminKey={adminKey} navigation={navigation} />
			: <StatusView data={info} adminKey={adminKey} navigation={navigation} />}
		</>
	)

};

export default SituationCont;