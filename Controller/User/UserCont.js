import React from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ipCode from '../Admin/ipcode';
import UserView from '../../View/User/UserView';
class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			info  : '',
			desti : ''
		};
	}
	FetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		this.setState({ info: data });
	};

	componentDidMount() {
		this.FetchData();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});
	}
	onRefresh = () => {
		this.setState({ refreshing: true });
		this.FetchData().then(() => {
			this.setState({ refreshing: false });
		});
	};
	componentWillUnmount() {
		this._unsubscribe();
	}
	render() {
		return (
			<UserView info={this.state.info} navigation={this.props.navigation} />
		);
	}
}
export default User;
