import React, { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import BookingFormView from '../view/bookingFormView';
import DataHandler from '../model/dataHandler';

const BookingController = (props) => {
	const [data, setData] = useState([]);
	const [paper, setPaper] = useState('')
	const { building, list, status } = props.route.params;
	const dataHandler = new DataHandler();

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const fetchData = async () => {
		const data = await dataHandler.getDeliveryInfo();
		getPaperInfo();
		setData(data);
	};
	const getPaperInfo = () => {
		let paper;
		for (let i = 0; i < data.length; i++) {
			if (data[i].건물명 == building)
				paper = data[i].서류현황
		}
		paper = `${100 - paper}/100`;
		setPaper(paper);
		
	}
	const checkPaper = (building, document,prevPaper) => {
		let checking;
		for (let i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) {
				checking = parseInt(document) + parseInt(data[i].서류현황) - parseInt(prevPaper?prevPaper:0);
				break;
			}
		}
		if (document <= 50 && checking <= 100) {
			return 1;
		} else {
			return 0;
		}
	}
	const checkInfo = (name, phone, destination, document) => {
		if (name != null && phone != null && destination != null && document != null) return true;
		else return false;
	}
	const update = async (name, phone, destination, document) => {
		if (name == null) name = list.이름;
		if (phone == null) phone = list.전화번호;
		if (destination == null) destination = list.배송지;
		if (document == null) document = list.서류수량;

		let userId = list.주문자번호;
		let building = list.건물명;
		let prevPaper = list.서류수량;
		let checking = checkPaper(building, prevPaper, document);
	
		if (checking !== 0) {
			dataHandler.updateBooking(userId, name, phone, destination, document, building);
			Alert.alert(
				'예약정보수정',
				'완료되었습니다',
				[
					{
						text    : 'OK',
						onPress : () => {
							list.이름 = null;
							props.navigation.navigate('BooingInformation', {
								name,
								phone,
								destination,
								document
							});
						}
					}
				],
				{ cancelable: false }
			);
		} else {
			Alert.alert('서류수량초과', '예약가능한 서류수량 초과하였습니다.', [
				{
					text    : 'OK',
					onPress : () => {}
				}
			]);
		}
	};

	const upload = async (name, phone, destination, document) => {
		let token = await Notifications.getExpoPushTokenAsync();
		let checkInfoVAlue = checkInfo(name, phone, destination, document);
		let check = checkPaper(building, document);
		if (checkInfoVAlue) {
			if (check == 1) {
				dataHandler.uploadBooking(name, phone, destination,document, building, token);
				Alert.alert(
					'예약진행',
					'완료되었습니다',
					[
						{
							text: 'OK',
							onPress: () => {
								props.navigation.navigate('BookingInformation', {
									name,
									phone,
									destination,
									document
								});
							}
						}
					],
					{ cancelable: false }
				);
			} else {
				Alert.alert('서류수량초과', '가능한 서류수량을 초과하였습니다. 확인 부탁드립니다.');
			}
		} else {
			Alert.alert('정보 입력 오류', '필수 정보를 모두 입력해주세요!');
		}
	};
	return (
		<>
			{status === "upload" ? <BookingFormView saveButton={upload} paper={paper} /> :
				<BookingFormView saveButton={update} list={list} />}
		</>
	);
};

export default BookingController;