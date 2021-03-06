import React, { Component } from 'react';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableHighlight, ImageBackground } from 'react-native';
class BookingInformationView extends Component {
	render() {
		const { name, phone, destination, document } = this.props.data;
		return (
			(
				<ImageBackground
					source={require('../../assets/backgroundLogo.jpg')}
					imageStyle={{
						opacity : 0.1
					}}
					style={styles.image}
				>
					<View style={styles.container}>
						<View style={styles.body}>
							<View style={styles.context}>
								<View style={{ flex: 1, justifyContent: 'flex-end' }}>
									<Text style={{ fontSize: 25, fontWeight: 'bold' }}>이름</Text>
								</View>
								<View
									style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}
								>
									<Text style={{ fontSize: 20, color: 'black' }}> {name}</Text>
									<View
										style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }}
									/>
								</View>
							</View>
							<View style={styles.context}>
								<View style={{ flex: 1, justifyContent: 'flex-end' }}>
									<Text style={{ fontSize: 25, fontWeight: 'bold' }}>전화번호</Text>
								</View>
								<View
									style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}
								>
									<Text style={{ fontSize: 20, color: 'black' }}>{phone}</Text>
									<View
										style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }}
									/>
								</View>
							</View>
							<View style={styles.context}>
								<View style={{ flex: 1, justifyContent: 'flex-end' }}>
									<Text style={{ fontSize: 25, fontWeight: 'bold' }}>최종목적지</Text>
								</View>
								<View
									style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}
								>
									<Text style={{ fontSize: 20, color: 'black' }}>{destination} </Text>
									<View
										style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }}
									/>
								</View>
							</View>
							<View style={styles.context}>
								<View style={{ flex: 1, justifyContent: 'flex-end' }}>
									<Text style={{ fontSize: 25, fontWeight: 'bold' }}>서류수량</Text>
								</View>
								<View
									style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}
								>
									<Text style={{ fontSize: 20, color: 'black' }}>{document}</Text>
									<View
										style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }}
									/>
								</View>
							</View>
						</View>
						<View style={styles.bottom}>
							<View style={styles.bottomView} />
							<View style={styles.center}>
								<TouchableHighlight
									style={styles.button}
									onPress={() => this.props.navigation.navigate('User',{status:'user'})}
								>
									<Text style={styles.textStyle}> 확인 </Text>
								</TouchableHighlight>
							</View>
							<View style={styles.bottomView} />
						</View>
					</View>
				</ImageBackground>
			)
		);
	}
};
export default BookingInformationView;

const styles = StyleSheet.create({
	container        : {
		flex : 1
	},
	image            : {
		flex            : 1,
		backgroundColor : '#c2e8ff',
		resizeMode      : 'cover'
	},
	body             : {
		flex : 5
	},
	context          : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	phone            : {
		marginTop  : 5,
		// justifyContent: "center",
		alignItems : 'center'
	},
	finaldestination : {
		marginTop  : 5,
		// justifyContent: "center",
		alignItems : 'center'
	},
	document         : {
		marginTop  : 5,
		// justifyContent: "center",
		alignItems : 'center'
	},
	button           : {
		paddingTop      : 5,
		paddingBottom   : 5,
		borderRadius    : 5,
		borderWidth     : 1,
		//width: '',
		backgroundColor : '#c2e8ff',
		justifyContent  : 'center',
		alignItems      : 'center'
	},
	textStyle        : {
		color      : 'black',
		fontSize   : 20,
		alignItems : 'center'
	},
	center           : {
		alignItems     : 'center',
		flexDirection  : 'row',
		justifyContent : 'center'
	},
	bottom           : {
		flex           : 1,
		flexDirection  : 'row',
		justifyContent : 'center'
	},
	bottomView       : {
		flex          : 1,
		flexDirection : 'row'
	},
	bottomViewCenter : {
		flex           : 2,
		flexDirection  : 'row',
		alignItems     : 'center',
		justifyContent : 'space-between'
	}
});
