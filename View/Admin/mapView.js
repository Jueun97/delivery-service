import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet,View, Dimensions, Image} from 'react-native';

export default class Map extends React.Component {
	render() {
		const { lat, lon } = this.props;
		var Lat = parseFloat(lat);
		var Lon = parseFloat(lon);

		return (
			<View style={styles.container}>
				<MapView
					style={styles.mapStyle}
					provider="google"
					initialRegion={{
						latitude       : 36.690952,
						longitude      : 126.580483,
						latitudeDelta  : 0.005,
						longitudeDelta : 0.002
					}}
				>
					<Marker
						coordinate={{ latitude: Lat, longitude: Lon }}
						title={'his is a map'}
						description={'testing'}
					>
						<Image style={{ width: 40, height: 40 }} source={require('./드론.png')} />
					</Marker>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#fff',
		alignItems      : 'center',
		justifyContent  : 'center'
	},
	mapStyle  : {
		width  : Dimensions.get('window').width,
		height : Dimensions.get('window').height
	}
});
