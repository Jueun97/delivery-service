import React, { Component } from 'react';
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

class bookingStateView extends Component {
	state = {
		userNo : ''
	};
	Item = ({ item }) => {
		const { adminKey }  = this.props.adminKey;
		return (
			<View style={styles.item}>
				<TouchableOpacity
					style={styles.touch}
					onPress={() => {
						if (item.건물명 == adminKey) {
							this.props.navigation.navigate('BookingList ', {
								destination : adminKey
							});
						} else alert('담당 건물이 아닙니다.');
					}}
				>
					<View style={styles.name}>
						<Text style={styles.contentText}>
							{item.건물명}({item.예약수}건)
						</Text>
					</View>
					<View style={styles.time}>
						<Text style={styles.contentText}>{item.배송시간}</Text>
					</View>
				</TouchableOpacity>
				<View
					style={{
						flex           : 1 / 4,
						alignItems     : 'center',
						justifyContent : 'center'
					}}
				>
					<Entypo name="location" size={25} onPress={() => this.props.navigation.navigate('Map')} />
				</View>
			</View>
		);
	};

	render() {
		const { data } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.barcontain}>
					<View style={styles.Topbar} />
					<View style={styles.bar}>
						<View style={styles.name}>
							<Text style={styles.barText}>목적지(예약수)</Text>
						</View>
						<View style={styles.time}>
							<Text style={styles.barText}>출발시간</Text>
						</View>
						<View style={styles.icon}>
							<Text style={styles.barText}>위치</Text>
						</View>
					</View>
					<View style={styles.Bottombar} />
				</View>
				<View style={styles.content}>
					<FlatList data={data} renderItem={this.Item} keyExtractor={(item) => item.건물명} />
				</View>
			</View>
		);
	}
}

export default bookingStateView;

const styles = StyleSheet.create({
	container   : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	barcontain  : {
		flex : 1
	},
	bar         : {
		flex            : 2,
		flexDirection   : 'row',
		backgroundColor : '#ffffff'
	},
	barText     : {
		fontSize : 20
	},
	Topbar      : {
		flex              : 1,
		borderBottomWidth : 1,
		borderBottomColor : '#ffffff'
	},
	Bottombar   : {
		flex              : 1,
		borderTopWidth    : 1,
		borderBottomWidth : 1,
		borderColor       : '#ffffff'
	},
	content     : {
		flex : 6
	},
	contentText : {
		fontSize : 20
	},
	item        : {
		flex              : 1,
		paddingVertical   : 20,
		flexDirection     : 'row',
		borderBottomWidth : 1,
		borderBottomColor : '#ffffff'
	},
	touch       : {
		flex          : 3 / 4,
		flexDirection : 'row'
	},
	name        : {
		flex           : 2,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	time        : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	icon        : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	}
});
