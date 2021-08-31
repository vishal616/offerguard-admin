import axios from "axios";

export class OfferService {

	static async getAllOffers(apiUrl?: string) {
		return axios.get('http://localhost:8080/api/offers/').then((response) => response).catch((error) => error);
	}
}