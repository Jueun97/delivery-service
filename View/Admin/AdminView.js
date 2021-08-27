import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


class AdminView extends Component {
	render() {
		return (
			<View>
				<Text>Password</Text>
				<Button title="확안" onPress={() => this.props.navigation.navigate('Situation')} />

				{/* <Button
            title = "Admin Mode"
            onPress={() => this.props.navigation.goBack()}
        /> */}
			</View>
		);
	}
}
export default AdminView;
