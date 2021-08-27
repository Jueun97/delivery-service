import React, { Component } from 'react';
import axios from 'axios';
import ListView from '../../View/Admin/ListView';
import ipCode from './ipcode';
import { RefreshControl, View, ScrollView, Text, Alert } from 'react-native';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data       : [],
			list       : [],
			refreshing : false,
			counting   : 1
		};
	}
	onRefresh = () => {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.FetchData().then(() => {
				this.setState({ refreshing: false });
			});
		}, 2000);
	};
	FetchData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		this.setState({ data: data });

		this.getData();
	};
	getData() {
		const { route } = this.props;
		const { destination } = route.params;
		const { data } = this.state;
		const list = [];
		var index = 0;

		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 === destination) {
				list[index] = data[i];
				index++;
			}
		}
		this.setState({ list: list });
	}

	componentDidMount() {
		this.FetchData();
	}

	render() {
		const { list } = this.state;
		const { navigation } = this.props;

		return (
		
			(
				<ScrollView style={{ backgroundColor: '#c2e8ff' }}>
					<ListView data={list} navigation={navigation} onRefresh={this.onRefresh} />
				</ScrollView>
			)
		);
	}
}
export default List;
