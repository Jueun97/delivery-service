import React from 'react';
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import ipCode from './ipcode';
import SituationView from '../../View/Admin/SituationView';

class Situation extends React.Component {
	state = {
		info       : '',
		desti      : '',
		key        : '',
		refreshing : false
	};
	getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		this.setState({ info: data });
		const destination = [];
		for (var i = 0; i < data.length; i++) {
			destination[i] = this.state.info[i].건물명;
		}
		this.setState({ desti: destination });
	};
	onRefresh = () => {
		this.setState({ refreshing: true });
		this.getData().then(() => {
			this.setState({ refreshing: false });
		});
	};
	componentDidMount() {
		this.getData();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			console.log('hihi');
			this.onRefresh();
		});
	}
	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const { adminKey } = this.props.route.params;
		return (
			<SituationView data={this.state.info} adminKey={adminKey} navigation={this.props.navigation} />
		);
	}
}
export default Situation;
