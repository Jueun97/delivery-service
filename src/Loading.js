import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function() {
	return (
		<View style={styles.container}>
			<Image source={require('../assets/JUEUN.png')} style={{ width: 70, height: 70 }} />
		</View>
	);
	//로고 삽입
}
const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#87cefa',
		alignItems      : 'center',
		justifyContent  : 'center'
	}
});
