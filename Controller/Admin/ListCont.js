import React, { Component, useEffect,useState } from 'react';
import {ScrollView} from 'react-native';
import axios from 'axios';
import ListView from '../../View/Admin/ListView';
import ipCode from './ipcode';


const ListCont = ({navigation,route}) => {
	const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetchData().then(data=>getData(data));
	},[fetchData]);

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			fetchData().then(() => {
				setRefreshing(false);
			});
		}, 2000);
	};

	const fetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		setData(data);
		return data
	};

	const getData = (data) => {
		const { destination } = route.params;
		const list = [];
		var index = 0;

		for (var i = 0; i < data.length; i++) {
			console.log(data[i])
			if (data[i].건물명 === destination) {
				list[index] = data[i];
				index++;
			}
		}
		setList(list);
	}
	
	return (
		<ScrollView style={{ backgroundColor: '#c2e8ff' }}>
			<ListView data={list} navigation={navigation} onRefresh={onRefresh} />
		</ScrollView>
	);
};

export default ListCont;

