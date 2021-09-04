import axios from "axios";

export class OfferService {

	static apiUrl = 'https://offer-guard.herokuapp.com/api/offers';

	static async getAllOffers() {
		return axios.get(this.apiUrl + '/').then((response) => response).catch((error) => error);
	}

	static async checkAndUpdateOfferStatus(offerId: string) {
		return axios.get(this.apiUrl + '/' + offerId + '/status').then((response) => response).catch((error) => error);
	}

	static async triggerOffer18Job() {
		return axios.get(this.apiUrl + '/job').then((response) => response).catch((error) => error);
	}
}