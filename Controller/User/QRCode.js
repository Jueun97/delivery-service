import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

class QRCode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasPermission : null,
			scanned       : false
		};
	}
	getPermission = async () => {
		try {
			await BarCodeScanner.requestPermissionsAsync();
			this.setState({ hasPermission: 'granted' });
		} catch (error) {
			Alert.alert('사용자 설정에서 허가를 확인해주세요.');
		}
	};
	handleBarCodeScanned = ({ type, data }) => {
		const { building } = this.props.route.params;
		this.setState({ scanned: true });
		if (data == 'https://qrco.de/bbVpz7') {
			this.props.navigation.navigate('Booking', { building: building });
		} else alert('nono');
	};
	componentDidMount() {
		this.getPermission();
	}
	render() {
		return (
			<View
				style={{
					flex           : 1,
					flexDirection  : 'column',
					justifyContent : 'flex-end'
				}}
			>
				<BarCodeScanner
					onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>

				{this.state.scanned && (
					<Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
				)}
			</View>
		);
	}
}
export default QRCode;
