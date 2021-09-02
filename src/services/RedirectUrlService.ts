import axios from "axios";

export class RedirectUrlService {

	static async getAllRedirectUrlsForOffer(offerId?: string) {
		return axios.get('https://offer-guard.herokuapp.com/api/redirects/offers/' + offerId).then((response) => response).catch((error) => error);
	}
}