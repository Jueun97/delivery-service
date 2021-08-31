import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect } from 'react/cjs/react.development';

const QRCode = (props) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		getPermission();
	})
	const getPermission = async () => {
		try {
			await BarCodeScanner.requestPermissionsAsync();
			setHasPermission('granted');
		} catch (error) {
			Alert.alert('사용자 설정에서 허가를 확인해주세요.');
		}
	};
	const handleBarCodeScanned = ({ type, data }) => {
		const { building } = props.route.params;
		setScanned(true);
		if (data == 'https://qrco.de/bbVpz7') {
			props.navigation.navigate('Booking', { building: building,status:'upload' });
		} else alert('nono');
	};
	return (
		<View
			style={{
				flex           : 1,
				flexDirection  : 'column',
				justifyContent : 'flex-end'
			}}
		>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && (
				<Button title={'Tap to Scan Again'} onPress={() => setScanned(false) } />
			)}
		</View>
	);
};

export default QRCode;


