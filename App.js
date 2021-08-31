import React, {useState,useEffect } from 'react';
import Loading from './src/Loading';
import Navigation from './src/navigation';

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		changeLoading();
		registerForPushNotificationsAsync();
	});

	const registerForPushNotificationsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); //접근허용묻는 함수
		if (status !== 'granted') {
			Alert.alert('not granted! you should change the mood');
			return;
		}
	};

	const changeLoading = async () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	return isLoading ? <Loading /> : <Navigation />;
	
}
