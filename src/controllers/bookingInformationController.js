import React from 'react';
import BookingInformationView from '../view/bookingInformationView';

const BookingInformationController = ({ navigation, route }) => {
    const { name, phone, destination, document } = route.params;
    const data = {
        name,
        phone,
        destination,
        document
    }
	return (
		<BookingInformationView data={data} navigation={navigation} />
	);
};

export default BookingInformationController;