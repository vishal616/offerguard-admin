import axios from "axios";

export class RedirectUrlService {

	static apiUrl = 'https://offer-guard.herokuapp.com/api/redirects';

	static async getAllRedirectUrlsForOffer(offerId?: string) {
		return axios.get(this.apiUrl + '/offers/' + offerId).then((response) => response).catch((error) => error);
	}
}