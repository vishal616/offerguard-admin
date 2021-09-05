import axios from "axios";

export class StatsService {

	static apiUrl = 'https://offer-guard.herokuapp.com/api/stats';

	static async getAllStats() {
		return axios.get(this.apiUrl + '/').then((response) => response).catch((error) => error);
	}
}