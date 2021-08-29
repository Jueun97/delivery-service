import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';

export default class UpdateView extends Component {
	render() {
		const { list } = this.props;
		return (
			<View style={styles.container}>
				<View style={{ flex: 6 }}>
					<View
						style={{
							flex           : 1,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<View
							style={{
								flex           : 1,
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>이름</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ flex: 1 }} />
							<View style={styles.inputView}>
								<TextInput
									style={styles.input}
									placeholder="이름을 입력하세요."
									onChangeText={(text) => {
										this.Name = text;
									}}
									defaultValue={list.이름}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					</View>
					<View
						style={{
							flex           : 1,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<View
							style={{
								flex           : 1,
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>전화번호</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ flex: 1 }} />
							<View style={styles.inputView}>
								<TextInput
									style={styles.input}
									placeholder="전화번호를 입력하세요."
									onChangeText={(text) => {
										this.Phone = text;
									}}
									defaultValue={list.전화번호}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					</View>
					<View
						style={{
							flex           : 1,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<View
							style={{
								flex           : 1,
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>최종목적지</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ flex: 1 }} />
							<View style={styles.inputView}>
								<TextInput
									style={styles.input}
									placeholder="최종목적지를 입력하세요."
									onChangeText={(text) => {
										this.desti_1 = text;
									}}
									defaultValue={list.배송지}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					</View>
					<View
						style={{
							flex           : 1,
							justifyContent : 'center',
							alignItems     : 'center'
						}}
					>
						<View
							style={{
								flex           : 1,
								justifyContent : 'center'
							}}
						>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>서류수량</Text>
						</View>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<View style={{ flex: 1 }} />
							<View style={styles.inputView}>
								<TextInput
									style={styles.input}
									placeholder= "전화번호입력"
									onChangeText={(text) => {
										this.doc = text;
									}}
									defaultValue={list.서류수량.toString()}
									underlineColorAndroid="transparent"
								/>
							</View>
							<View style={{ flex: 1 }} />
						</View>
					</View>
				</View>
				<View style={styles.center}>
					<TouchableHighlight
						style={styles.button}
						onPress={() => this.props.saveButton(list, this.Name, this.Phone, this.desti_1, this.doc)}
					>
						<Text style={styles.textStyle}>확인</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container        : {
		flex            : 1,
		backgroundColor : '#c2e8ff'
	},
	Phone            : {
		marginTop  : 5,
		alignItems : 'center'
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
	input            : {
		borderWidth     : 2,
		backgroundColor : 'white',
		textAlign       : 'center',
		height          : 40,
		fontSize        : 14,
		borderTopWidth  : 1,
		borderColor     : 'black',
		borderRadius    : 5
	},
	inputView        : {
		flex : 6
	},
	button           : {
		padding         : 10,
		borderRadius    : 9,
		marginBottom    : 3,
		borderWidth     : 1,
		backgroundColor : '#c2e8ff'
	},
	textStyle        : {
		color     : 'black',
		fontSize  : 20,
		textAlign : 'center'
	},
	center           : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center'
	}
});
