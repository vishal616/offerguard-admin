import axios from "axios";

export class RedirectUrlService {

	static async getAllRedirectUrlsForOffer(offerId?: string) {
		return axios.get('http://localhost:8080/api/redirects/offers/' + offerId).then((response) => response).catch((error) => error);
	}
}