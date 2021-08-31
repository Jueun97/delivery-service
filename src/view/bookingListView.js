import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
class BookingListView extends Component {

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
								<Text style={styles.headerText} onPress={() => this.props.doneAllHandler(data[0].건물명)}>
									전체완료
								</Text>
							</View>
							<View style={styles.headerButton}>
								<Text style={styles.headerText} onPress={() => this.props.cancelAllHandler(data[0].건물명)}>
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
												onPress={() => this.props.doneHandler(item.주문자번호, item.알림코드, item.이름)}
											>
												완료
											</Text>
										</View>
										<View>
											<Text
												style={{ fontSize: 20, color: state[item.배송현황].noColor }}
												s
												onPress={() => this.props.cancelHandler(item.주문자번호, item.알림코드, item.이름)}
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
