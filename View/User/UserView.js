import React from 'react';
import axios from 'axios';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import ipCode from '../../Controller/Admin/ipcode';

class UserView extends React.Component {
	Item = ({ item }) => {
		var disable, color;
		if (item.서류현황 == 100) {
			disable = true;
		}
		var hours = new Date().getHours();
		var min = new Date().getMinutes();
		var hoursU = parseInt(item.배송시간[0]) * 10 + parseInt(item.배송시간[1]);
		var minU = parseInt(item.배송시간[3]) * 10 + parseInt(item.배송시간[4]);

		if (minU == 0) {
			if (hours >= hoursU) {
				disable = false;
				color = '#bdc3c7';
			} else if (hours == hoursU - 1 && min >= 50) {
				disable = false;
				color = '#bdc3c7';
			}
		} else {
			if (hours > hoursU || (hours == hoursU && min >= 20)) {
				disable = false;
				color = '#bdc3c7';
			}
		}

		return (
			<TouchableOpacity
				style={{
					flex              : 1,
					flexDirection     : 'row',
					paddingVertical   : 20,
					borderBottomWidth : 1,
					borderBottomColor : '#ffffff',
					backgroundColor   : color
				}}
				onPress={() => {
					this.props.navigation.navigate('QRCode', { building: item.건물명 });
				}}
				disabled={disable}
			>
				<View style={styles.name}>
					<Text style={styles.contentText}>
						{item.건물명}({item.예약수}건)
					</Text>
				</View>
				<View style={styles.time}>
					<Text style={styles.contentText}>{item.배송시간}</Text>
				</View>
				<View style={styles.paper}>
					<Text style={styles.contentText}>{100-item.서류현황}/100</Text>
				</View>
			</TouchableOpacity>
		);
	};
	render() {
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
						<View style={styles.paper}>
							<Text style={styles.barText}>가능수량</Text>
						</View>
					</View>
					<View style={styles.Bottombar} />
				</View>
				<View style={styles.content}>
					<FlatList data={this.props.info} renderItem={this.Item} keyExtractor={(item) => item.건물명} />
				</View>
			</View>
		);
	}
}

export default UserView;

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
	Topbar      : {
		flex : 1
	},
	Bottombar   : {
		flex              : 1,
		borderBottomWidth : 1,
		borderColor       : '#ffffff'
	},
	barText     : {
		fontSize : 20
	},
	contentText : {
		fontSize : 20
	},
	content     : {
		flex : 6
	},
	touch       : {
		flex              : 1,
		flexDirection     : 'row',
		paddingVertical   : 20,
		borderBottomWidth : 1,
		borderBottomColor : '#ffffff'
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
	paper       : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	}
});
