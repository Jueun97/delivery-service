import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';
import AdminView from '../view/AdminView';

async function FetchData() {
	const { data } = await axios.get('http://192.168.0.19:3000/User');
	console.log('FetchData : ', data);

	const finalData = JSON.stringify(data);
	console.log(finalData);
	return data;
}

export default FetchData;
