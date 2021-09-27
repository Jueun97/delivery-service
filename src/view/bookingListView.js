import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,Alert } from 'react-native';
class BookingListView extends Component {
	doneHandler = async (userId, token, name) => {
		Alert.alert('배송상태', '완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					this.props.bookingStateHandler(userId, '완료', '배송완료'),
						this.props.notification(userId, token, name, '배송완료'),
						this.props.onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	doneAllHandler = async (data) => {
		Alert.alert('배송상태', '전체완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress: () => {
					this.props.bookingStateHandler(0, data[0].건물명, '배송완료'),
					this.props.notification(0, data, '', '배송완료'),
					this.props.onRefresh();
				}
			}
		]);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	cancelAllHandler = async (data) => {
		Alert.alert(
			'배송상태',
			'전체취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						this.props.bookingStateHandler(0, data[0].건물명, '배송취소'),
							this.props.notification(0, data, '', '배송취소'),
							this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	cancelHandler = async (userId, token, name) => {
		Alert.alert(
			'배송상태',
			'취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						this.props.bookingStateHandler(userId, '취소', '배송취소'),
						this.props.notification(userId, token, name, '배송취소'),
						this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	render() {
		const state = {
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
			},
			null: {
				okColor : 'grey',
				noColor : 'grey'
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
								<Text style={styles.headerText} onPress={() => this.doneAllHandler(data)}>
									전체완료
								</Text>
							</View>
							<View style={styles.headerButton}>
								<Text style={styles.headerText} onPress={() => this.cancelAllHandler(data)}>
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
												style={{ fontSize: 20, color: state[item.배송현황].okColor }}
												onPress={() => this.doneHandler(item.주문자번호, item.알림코드, item.이름)}
											>
												완료
											</Text>
										</View>
										<View>
											<Text
												style={{ fontSize: 20, color: state[item.배송현황].noColor }}
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
export default BookingListView;

const styles = StyleSheet.create({
	container         : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	header            : {
		flex            : 1,
		justifyContent  : 'center',
		paddingVertical : 20
	},
	headerSub         : {
		flexDirection   : 'row',
		backgroundColor : '#ffffff'

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
