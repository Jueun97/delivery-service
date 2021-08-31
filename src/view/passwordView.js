import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default class PasswordView extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.harfcontainer}>
                    <Text style={styles.text}>{this.props.type}를 입력하세요(숫자만 입력)</Text>
					<TextInput
						style={styles.input}
						placeholder="phone number"
						placeholderTextColor="gray"
						autoCapitalize="none"
						onChangeText={this.props.handlePassword}
					/>
				</View>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							this.props.login();
						}}
					>
						<Text style={styles.submitButtonText}>확인</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container        : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#c2e8ff'
	},
	harfcontainer    : {
		flex            : 2,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#c2e8ff'
	},
	text             : {
		fontSize     : 20,
		color        : 'black',
		paddingLeft  : 30,
		paddingRight: 30
	},
	input            : {
		margin      : 50,
		height      : 60,
		width: 250,
		borderRadius: 20,
		borderColor : 'black',
		borderWidth : 1,
		textAlign   : 'center'
	},
	submitButton     : {
		borderColor : 'black',
		borderWidth : 1,
		padding     : 10,
		margin      : 15,
		height: 40,
		borderRadius: 20,
	},
	submitButtonText : {
		color : 'black'
	}
});
