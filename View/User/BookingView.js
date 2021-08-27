import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { TextInput, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import { Notifications } from 'expo';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import ipCode from '../../Controller/Admin/ipcode';
import axios from 'axios';

export default class BookView extends Component {

	render() {
		const { building, paper } = this.props;
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
									value={this.Name}
									maxLength={10}
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
									value={this.Phone}
									maxLength={11}
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
									value={this.desti_1}
									maxLength={30}
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
									placeholder= {paper}
									onChangeText={(text) => {
										this.doc = text;
									}}
									value={this.doc}
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
						onPress={() => {
							this.props.saveButton(this.Name, this.Phone, this.desti_1, this.doc);
						}}
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
		// justifyContent: "center",
		alignItems : 'center'
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
