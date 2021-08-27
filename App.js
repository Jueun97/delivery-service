import { StatusBar } from 'expo-status-bar';
import React, { Component,useState,useEffect } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import Loading from './Loading';
import Code from './Controller/Admin/CodeCont';
import User from './Controller/User/UserCont';
import home from './home';
import Situation from './Controller/Admin/SituationCont';
import List from './Controller/Admin/ListCont';
import Details from './Controller/Admin/DetailsCont';
import Booking from './Controller/User/BookingCont';
import Mypage from './Controller/User/MypageCont';
import Entry from './Controller/User/EntryCont';
import userDetails from './Controller/User/userDetailsCont';
import Update from './Controller/User/UpdateCont';
import Map from './Controller/Admin/mapCont';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRCode from './Controller/User/QRCode';
import ShowInfo from './View/User/ShowInfo';
import Status from './Controller/Admin/StatusCont';
import setHeader from './Controller/setHeader';
import { Entypo,FontAwesome } from '@expo/vector-icons';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const Stack = createStackNavigator();
	useEffect(() => {
		changeLoading();
		registerForPushNotificationsAsync();
	})
	const registerForPushNotificationsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); //접근허용묻는 함수
		if (status !== 'granted') {
			Alert.alert('not granted! you should change the mood');
			return;
		}
	};
	const createStack = ()=> {
		return (
		<Stack.Navigator>
			<Stack.Screen name="home" component={home} key={home} options={{ headerShown: false }} />
			<Stack.Screen
				name="User"
				component={User}
				options={({ navigation }) => setHeader(navigation,'예약현황',FontAwesome,'user')}
			/>
			<Stack.Screen
				name="Booking"
				component={Booking}
				options={({ navigation }) => setHeader(navigation,'예약하기',Entypo)}
			/>
			<Stack.Screen
				name="Mypage"
				component={Mypage}
				options={({ navigation }) => setHeader(navigation,'마이페이지',Entypo)}
			/>
			<Stack.Screen
				name="Entry"
				component={Entry}
				options={({ navigation }) => setHeader(navigation,'전화번호입력',Entypo)}
			/>
			<Stack.Screen
				name="userDetails"
				component={userDetails}
				options={({ navigation }) => setHeader(navigation,'예약자 정보',Entypo)}
			/>
			<Stack.Screen
				name="Update"
				component={Update}
				options={({ navigation }) => setHeader(navigation,'예약수정',Entypo)}
			/>
			<Stack.Screen
				name="ShowInfo"
				component={ShowInfo}
				options={{
					title: '마이페이지',
					headerStyle: {},
					headerTitleStyle: {
						fontSize: 20
					},
					headerTitleAlign: 'center',
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name="Map"
				component={Map}
				options={{
					title: '배송추적',
					headerStyle: {},
					headerTitleStyle: {
						fontSize: 20
					},
					headerTitleAlign: 'center',
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name="QRCode"
				component={QRCode}
				options={({ navigation }) => setHeader(navigation,'qrCode',Entypo)}
			/>
			<Stack.Screen
				name="Code"
				component={Code}
				options={({ navigation }) => setHeader(navigation,'패스워드',Entypo)}
			/>
			<Stack.Screen
				name="Situation"
				component={Situation}
				options={({ navigation }) => setHeader(navigation,'예약현황',Entypo)}
			/>
			<Stack.Screen
				name="List"
				component={List}
				options={({ navigation }) => setHeader(navigation,'예약자 리스트',Entypo)}
			/>
			<Stack.Screen
				name="Details"
				component={Details}
				options={({ navigation }) => setHeader(navigation,'상세정보',Entypo)}
			/>
			<Stack.Screen
				name="Status"
				component={Status}
				options={({ navigation }) => setHeader(navigation,'예약 상태 변경',Entypo)}
			/>
		</Stack.Navigator>
		)};

	const changeLoading = async () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	return isLoading  ? <Loading /> : <NavigationContainer>{createStack()}</NavigationContainer>;
	
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
