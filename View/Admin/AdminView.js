import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';


class AdminView extends Component {
	render() {
		return (
			<View>
				<Text>Password</Text>
				<Button title="확안" onPress={() => this.props.navigation.navigate('Situation')} />
			</View>
		);
	}
}
export default AdminView;
