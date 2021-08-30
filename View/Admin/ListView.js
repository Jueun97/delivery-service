import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Condition from '../../controllers/admin/condition';
import Notification from '../../controllers/admin/notification';
class ListView extends Component {
	state = {
		data : []
	};

	doneHandler = async (UserID, Token, Name) => {
		Alert.alert('배송상태', '완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					Condition(UserID, '완료', '배송완료'), Notification(UserID, Token, Name, '배송완료'), this.props.onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	doneAllHandler = async (building) => {
		Alert.alert('배송상태', '전체완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					Condition(0, building, '배송완료'),
						Notification(0, this.props.data, '', '배송완료'),
						this.props.onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	cancelAllHandler = async (building) => {
		Alert.alert(
			'배송상태',
			'전체취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						Condition(0, building, '배송취소'),
							Notification(0, this.props.data, '', '배송취소'),
							this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	cancelHandler = async (UserID, Token, Name) => {
		Alert.alert(
			'배송상태',
			'취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						Condition(UserID, '취소', '배송취소'),
							Notification(UserID, Token, Name, '배송취소'),
							this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};

	render() {
		const condition = {
			배송완료  : {
				okColor : 'red',
				noColor : 'grey'
			},
			배송취소  : {
				okColor : 'grey',
				noColor : 'red'
			},
			배송중   : {
				okColor : 'black',
				noColor : 'black'
			},
			배송준비중 : {
				okColor : 'black',
				noColor : 'black'
			}
		};
		const { data, navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.headerSub}>
						<View style={styles.headerView}>
							<Text style={styles.headerText}>이름</Text>
						</View>
						<View style={styles.headerView}>
							<Text style={styles.headerText}>주문번호</Text>
						</View>
						<View
							style={{
								flex           : 1,
								flexDirection  : 'row',
								justifyContent : 'center'
							}}
						>
							<View style={styles.headerButton}>
								<Text style={styles.headerText} onPress={() => this.doneAllHandler(data[0].건물명)}>
									전체완료
								</Text>
							</View>
							<View style={styles.headerButton}>
								<Text style={styles.headerText} onPress={() => this.cancelAllHandler(data[0].건물명)}>
									전체취소
								</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.context}>
					<ScrollView>
						<View style={{ backgroundColor: '#74b9f' }}>
							{data.map((item, key) => (
								<View key={key} style={styles.list}>
									<View style={styles.listContext}>
										<TouchableOpacity
											onPress={() =>
												navigation.navigate('Details', {
													detailsList : item
												})}
										>
											<View style={styles.listContextView}>
												<View style={styles.listContexViewSub}>
													<Text style={{ fontSize: 20 }}>{item.이름}</Text>
												</View>
												<View style={styles.listContexViewSub}>
													<Text style={{ fontSize: 20 }}>{item.주문자번호}</Text>
												</View>
											</View>
										</TouchableOpacity>
									</View>
									<View style={styles.listButton}>
										<View>
											<Text
												style={{ fontSize: 20, color: condition[item.배송현황].okColor }}
												onPress={() => this.doneHandler(item.주문자번호, item.알림코드, item.이름)}
											>
												완료
											</Text>
										</View>
										<View>
											<Text
												style={{ fontSize: 20, color: condition[item.배송현황].noColor }}
												s
												onPress={() => this.cancelHandler(item.주문자번호, item.알림코드, item.이름)}
											>
												취소
											</Text>
										</View>
									</View>
								</View>
							))}
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}
export default ListView;

const styles = StyleSheet.create({
	container         : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	header            : {
		flex            : 1,
		justifyContent  : 'center',
		/* 		backgroundColor : '#EFF8FB', */
		paddingVertical : 20
	},
	headerSub         : {
		flexDirection   : 'row',
		backgroundColor : '#ffffff'

		/* 	backgroundColor   : '#EFF8FB' */
	},
	headerView        : {
		flexDirection  : 'row',
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	headerButton      : {
		width      : 51,
		alignItems : 'center'
	},

	headerText        : {
		fontSize       : 20,
		alignItems     : 'center',
		justifyContent : 'center'
	},
	context           : {
		flex              : 6,
		borderTopWidth    : 1,
		borderBottomWidth : 1,
		borderTopColor    : '#ffffff',
		borderBottomColor : '#ffffff'
		//justifyContent  : 'center',
	},
	list              : {
		paddingVertical   : 30,
		flexDirection     : 'row',
		borderBottomWidth : 1,
		borderBottomColor : '#ffffff',
		justifyContent    : 'space-between'
	},
	listButton        : {
		flex           : 1,
		flexDirection  : 'row',
		justifyContent : 'space-evenly'
	},
	listContext       : {
		flex : 2
	},

	listContextView   : {
		flexDirection  : 'row',
		justifyContent : 'center'
	},
	listContexViewSub : {
		flex       : 1,
		alignItems : 'center'
	}
});
