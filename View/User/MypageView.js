import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

export default class MypageView extends React.Component {
	mapAvailable(deliveryStatus) {
		if (deliveryStatus == '배송중') {
			this.props.navigation.navigate('Map');
		} else if (deliveryStatus == '배송완료') {
			Alert.alert('배송이 완료되었습니다.');
		} else if (deliveryStatus == '배송취소') {
			Alert.alert('배송이 취소되었습니다.');
		} else {
			Alert.alert('배송 준비중 입니다.');
		}
	}

	Item = ({ item }) => {
		const { adminKey } = this.props;
		if (adminKey == item.전화번호) {
			return (
				<View style={styles.item}>
					<TouchableOpacity
						style={styles.touch}
						onPress={() => {
							this.props.navigation.navigate('userDetails', {
								list : item
							});
						}}
					>
						<View style={styles.contentView}>
							<Text style={styles.contentText}>{item.건물명}</Text>
						</View>
						<View style={styles.contentView}>
							<Entypo
								style={styles.contentText}
								name="location"
								size={25}
								onPress={() => this.mapAvailable(item.배송현황)}
							/>
						</View>
						<View style={styles.contentView}>
							<Text style={styles.contentText}>{item.배송현황}</Text>
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.barcontain}>
					<View style={styles.topBar} />
					<View style={styles.bar}>
						<View style={styles.contentView}>
							<Text style={{ fontSize: 20 }}>배송지</Text>
						</View>
						<View style={styles.contentView}>
							<Text style={{ fontSize: 20 }}>배송현황</Text>
						</View>
						<View style={styles.contentView}>
							<Text style={{ fontSize: 20 }}>배송상태</Text>
						</View>
					</View>
					<View style={styles.bottomBar} />
				</View>
				<View style={styles.content}>
					<FlatList
						data={this.props.info}
						renderItem={this.Item}
						keyExtractor={(item) => item.주문자번호.toString()}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container   : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	barcontain  : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	bar         : {
		flex            : 2,
		flexDirection   : 'row',
		alignItems      : 'center',
		backgroundColor : '#ffffff'
	},
	topBar      : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	contentView : {
		flex       : 1,
		alignItems : 'center'
	},
	bottomBar   : {
		flex              : 1,
		borderBottomWidth : 1,
		backgroundColor   : '#c2e8ff',
		borderBottomColor : '#ffffff'
	},
	content     : {
		flex          : 6,
		flexDirection : 'row',
		alignItems    : 'flex-start'
	},
	item        : {
		flex              : 1,
		flexDirection     : 'row',
		borderBottomWidth : 1,
		borderBottomColor : 'white',
		justifyContent    : 'center',
		alignItems        : 'center'
	},
	touch       : {
		flex          : 4,
		flexDirection : 'row'
	},
	contentText : {
		fontSize   : 23,
		lineHeight : 65
	}
});
