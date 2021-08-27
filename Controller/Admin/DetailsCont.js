import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import DetailsView from '../../View/Admin/DetailsView';

const DetailsCont = ({navigation,route}) => {
	const [userInform, setUserInform] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		const { detailsList } = route.params;
		const list = [];

		list[0] = detailsList;

		setUserInform(list);
	};

	return (
		<DetailsView data={userInform} navigation={navigation} />
	);
};

export default DetailsCont;