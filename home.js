import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button } from 'react-native';

class Home extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.icon}>
					<Image style={{ width: 230, height: 230 }} source={require('./JUEUN.png')} />
				</View>
				<View style={styles.booking}>
					<TouchableOpacity activeOpacity={0.8} style={styles.button}>
						<Text style={styles.bookingfont} onPress={() => this.props.navigation.navigate('User')}>
							Booking
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.admin}>
					<Text
						style={styles.adminfont}
						onPress={() => this.props.navigation.navigate('Code', { name: 'yn' })}
					>
						Admin
					</Text>
				</View>
			</View>
		);
	}
}
export default Home;
const styles = StyleSheet.create({
	container   : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#87cefa'
	},
	icon        : {
		flex           : 2,
		justifyContent : 'center',
		alignItems     : 'center',
		fontSize       : 50
	},
	booking     : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	bookingfont : {
		fontSize : 30,
		color    : '#000000'
	},
	admin       : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	adminfont   : {
		fontSize : 18,
		color    : '#000000'
	}
});
