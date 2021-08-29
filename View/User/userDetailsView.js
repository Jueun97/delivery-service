import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class DetailsView extends Component {
	checkIfAvailable(check, disable, list) {
		const navigation = this.props.navigation;
		console.log('>>>', disable);
		if (check == '수정') {
			if (disable) Alert.alert('예약수정', '수정 불가합니다.');
			else this.props.navigation.navigate('Update', { list: list });
		} else {
			if (disable) Alert.alert('예약취소', '취소 불가합니다.');
			else this.props.handleDelete(list.주문자번호, list.서류수량, list.건물명, navigation);
		}
	}
	render() {
		const { list, disable } = this.props;

		return (
			<ImageBackground
				source={require('./backgroundLogo.jpg')}
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
							<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Text style={{ fontSize: 20, color: 'black' }}> {list.이름}</Text>
								<View style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }} />
							</View>
						</View>
						<View style={styles.context}>
							<View style={{ flex: 1, justifyContent: 'flex-end' }}>
								<Text style={{ fontSize: 25, fontWeight: 'bold' }}>전화번호</Text>
							</View>
							<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Text style={{ fontSize: 20, color: 'black' }}>{list.전화번호}</Text>
								<View style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }} />
							</View>
						</View>
						<View style={styles.context}>
							<View style={{ flex: 1, justifyContent: 'flex-end' }}>
								<Text style={{ fontSize: 25, fontWeight: 'bold' }}>최종목적지</Text>
							</View>
							<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Text style={{ fontSize: 20, color: 'black' }}>{list.배송지} </Text>
								<View style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }} />
							</View>
						</View>
						<View style={styles.context}>
							<View style={{ flex: 1, justifyContent: 'flex-end' }}>
								<Text style={{ fontSize: 25, fontWeight: 'bold' }}>서류수량</Text>
							</View>
							<View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
								<Text style={{ fontSize: 20, color: 'black' }}>{list.서류수량}</Text>
								<View style={{ height: 1, backgroundColor: 'black', marginBottom: 10, width: '70%' }} />
							</View>
						</View>
					</View>
					<View style={styles.bottom}>
						<View style={styles.bottomView} />
						<View style={styles.bottomViewCenter}>
							<View style={styles.button}>
								<TouchableHighlight onPress={() => this.checkIfAvailable('수정', disable, list)}>
									<Text style={styles.textStyle}>예약수정</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.button}>
								<TouchableHighlight onPress={() => this.checkIfAvailable('취소', disable, list)}>
									<Text style={styles.textStyle}>예약취소</Text>
								</TouchableHighlight>
							</View>
						</View>
						<View style={styles.bottomView} />
					</View>
				</View>
			</ImageBackground>
		);
	}
}

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
		alignItems : 'center'
	},
	finaldestination : {
		marginTop  : 5,
		alignItems : 'center'
	},
	document         : {
		marginTop  : 5,
		alignItems : 'center'
	},
	button           : {
		paddingTop      : 5,
		paddingBottom   : 5,
		borderRadius    : 5,
		borderWidth     : 1,
		backgroundColor : '#c2e8ff',
		justifyContent  : 'center',
		alignItems: 'center',
		padding: 6
	},
	textStyle        : {
		color     : 'black',
		fontSize  : 20,
		textAlign : 'center'
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
