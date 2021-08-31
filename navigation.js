import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AdminPassword from './controllers/admin/passwordController';
import User from './controllers/user/user';
import home from './home';
import BookingList from './controllers/admin/bookingListController';
import Details from './controllers/admin/details';
import Booking from './controllers/user/bookingController';
import Mypage from './controllers/user/mypage';
import UserPassword from './controllers/user/passwordController';
import userDetails from './controllers/user/userDetails';
import Update from './controllers/user/bookingController';
import Map from './controllers/admin/map';
import QRCode from './controllers/user/qrcode';
import ShowInfo from './view/user/ShowInfo';
import Status from './controllers/admin/bookingStateController';
import Situation from './controllers/admin/bookingStateController';
import setHeader from './controllers/setHeader';
import { Entypo, FontAwesome } from '@expo/vector-icons';

const Controller = () => {
    const Stack = createStackNavigator();
    return (
    <NavigationContainer>
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
            name="UserPassword"
            component={UserPassword}
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
            name="AdminPassword"
            component={AdminPassword}
            options={({ navigation }) => setHeader(navigation,'패스워드',Entypo)}
            />
        <Stack.Screen
            name="Status"
            component={Status}
            options={({ navigation }) => setHeader(navigation,'예약 상태 변경',Entypo)}
        />
        <Stack.Screen
            name="Situation"
            component={Situation}
            options={({ navigation }) => setHeader(navigation,'예약현황',Entypo)}
        />
        <Stack.Screen
            name="BookingList "
            component={BookingList }
            options={({ navigation }) => setHeader(navigation,'예약자 리스트',Entypo)}
        />
        <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation }) => setHeader(navigation,'상세정보',Entypo)}
        />
            </Stack.Navigator>
    </NavigationContainer>
    )
};
export default Controller;