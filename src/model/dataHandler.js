import axios from 'axios';
class DataHandler {
	constructor(){
		this.ip = '172.30.1.18'
	};

	async getUserInfo() {
		const result = await axios.get(`http://${this.ip}:3000/user`).then(response => response.data).catch(error => console.log(error));
		return result;
	};
	async getAdminInfo() {
		const result = await axios.get(`http://${this.ip}:3000/admin`).then(response => response.data).catch(error => console.log(error));
		return result;
	};
	async getDeliveryInfo() {
		const result = await axios.get(`http://${this.ip}:3000/delivery`).then(response => response.data).catch(error => console.log(error));
		return result;
	};

	async uploadBooking(name, phone, destination, document, building, expoPushToken) {
		const data = { name, phone, destination, document, building, toke:expoPushToken };
		axios.post(`http://${this.ip}:3000/booking`, data).then(response => response.data);
	};

	async updateBooking(userId, name, phone, destination, document, building) {
		const data = { userId, name, phone, destination, document, building };
		axios.post(`http://${this.ip}:3000/booking__update`, data).then(response => response.data);
	};

	async deleteBooking(userId, document, building) {
		const data = { userId, document, building };
		await axios.post(`http://${this.ip}:3000/booking__delete`, data);
	};
	async updateAllBookingState(userId, building, state) {
		const data = { userId, building, state };
		axios.post(`http:/${this.ip}:3000/booking__state`, data).then(response => response.data);
	};
	async updateBookingState(userId, state) {
		const data = { userId, state };
		axios.post(`http://${this.ip}:3000/booking__state`, data).then(response => response.data);
	};
	async sendMessage(message) {
		await axios.post('https://exp.host/--/api/v2/push/send', message);
	};

	async getLocation() {
		const result = await axios.get(`http://${this.ip}:3001`);
		return result;
	}
}

export default DataHandler;
