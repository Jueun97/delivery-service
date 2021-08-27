import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import ipCode from '../Admin/ipcode';
import { Entypo } from '@expo/vector-icons';
import EntryView from '../../View/User/EntryView';

class MyCode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code : '',
			num  : ''
		};
	}

	handleLogin = (text) => {
		this.setState({ code: text });
	};

	FetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		this.setState({ num: data });
	};

	login = () => {
		var pass = this.state.code;
		var check = 0;
		for (var i = 0; i < this.state.num.length; i++) {
			if (pass == this.state.num[i].전화번호) {
				this.props.navigation.navigate('Mypage', { adminKey: this.state.num[i].전화번호 });
				check = 1;
			}
		}
		if (check == 0) Alert.alert('잘못된 전화번호 입니다.');
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
		return (
			<EntryView handleLogin={this.handleLogin} login={this.login} />
		);
	}
}
export default MyCode;
