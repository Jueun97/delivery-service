import React from 'react';
import axios from 'axios';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ipCode from '../Admin/ipcode';
import MypageView from '../../View/User/MypageView';

export default class Mypage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info : ''
		};
	}
	FetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		this.setState({ info: data });
	};
	onRefresh = () => {
		this.setState({ refreshing: true });
		this.FetchData().then(() => {
			this.setState({ refreshing: false });
		});
	};
	componentDidMount() {
		this.FetchData();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});
	}
	componentWillUnmount() {
		this._unsubscribe();
	}
	render() {
		const { info } = this.state;
		const { adminKey } = this.props.route.params;
		return (
			<MypageView info={info} adminKey={adminKey} navigation={this.props.navigation} />
		);
	}
}
