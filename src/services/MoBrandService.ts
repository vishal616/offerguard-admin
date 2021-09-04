import axios from "axios";

export class MoBrandService {

	static apiUrl = 'https://offer-guard.herokuapp.com/api/mobrand';

	static async triggerMoBrandJob() {
		return axios.get(this.apiUrl + '/job').then((response) => response).catch((error) => error);
	}
}