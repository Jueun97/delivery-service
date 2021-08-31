import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

class AdminDetailsView extends Component {
	state = {
		expoPushToken : ''
	};
	render() {
		const { data } = this.props;
		return (
			<ImageBackground
				source={require('./backgroundLogo.jpg')}
				imageStyle={{
					opacity : 0.1
				}}
				style={styles.image}
			>
				<View style={styles.container}>
					{data.map((item, key) => (
						<View key={key} style={styles.context}>
							<View style={styles.contextView}>
								<View style={{ flex: 1 }} />
								<View style={styles.infoView}>
									<Text style={styles.infoTextTitle}>이름</Text>
									<Text style={styles.infoTextText}>{item.이름}</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
							<View style={styles.contextView}>
								<View style={{ flex: 1 }} />
								<View style={styles.infoView}>
									<Text style={styles.infoTextTitle}>전화번호</Text>
									<Text style={styles.infoTextText}>{item.전화번호}</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
							<View style={styles.contextView}>
								<View style={{ flex: 1 }} />
								<View style={styles.infoView}>
									<Text style={styles.infoTextTitle}>최종목적지</Text>
									<Text style={styles.infoTextText}>{item.배송지}</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
							<View style={styles.contextView}>
								<View style={{ flex: 1 }} />
								<View style={styles.infoView}>
									<Text style={styles.infoTextTitle}>서류수량</Text>
									<Text style={styles.infoTextText}>{item.서류수량}</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
							<View style={styles.contextView}>
								<View style={{ flex: 1 }} />
								<View style={styles.infoView}>
									<Text style={styles.infoTextTitle}>주문자번호</Text>
									<Text style={styles.infoTextText}>{item.주문자번호}</Text>
								</View>
								<View style={{ flex: 1 }} />
							</View>
						</View>
					))}
					<View style={styles.buttonView}>
						<Text>{this.state.expoPushToken}</Text>
						<Text
							style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
							onPress={() => this.props.navigation.navigate('List')}
						>
							확인
						</Text>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

export default AdminDetailsView;

const styles = StyleSheet.create({
	container     : {
		flex : 1
	},
	image         : {
		flex            : 1,
		backgroundColor : '#c2e8ff',
		resizeMode      : 'cover'
	},
	context       : {
		flex : 8
	},
	contextView   : {
		flex          : 1,
		flexDirection : 'row'
	},
	infoView      : {
		flex              : 3,
		justifyContent    : 'space-around',
		alignItems        : 'center',

		borderBottomWidth : 1
	},
	infoTextTitle : {
		fontSize   : 25,
		/* textDecorationLine : 'underline', */
		fontWeight : 'bold'
	},
	infoTextText  : {
		fontSize : 20
	},
	buttonView    : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	}
});
