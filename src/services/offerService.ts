import axios from "axios";

export class OfferService {

	static async getAllOffers(apiUrl?: string) {
		return axios.get('https://offer-guard.herokuapp.com/api/offers/').then((response) => response).catch((error) => error);
	}
}