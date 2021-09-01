import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {RedirectUrlService} from "../../services/RedirectUrlService";
import './offer-modal.css';

function OfferModal(props: any) {
	const [open, setOpen] = useState(false);
	const [redirectUrls, setRedirectUrls] = useState([]);
	const [offer, setOffer] = useState<Offer>({
		name: '',
		country: '',
		id: '',
		os: ''
	});

	useEffect(() => {
		if(props.data) {
			setOpen(true);
			RedirectUrlService.getAllRedirectUrlsForOffer(props.data.offerid).then(({data}) => {
				const urls = data.map((data: any) => data.url);
				setOffer({
					name: props.data.name,
					id: props.data.offerid,
					os: props.data.os_allow,
					country: props.data.country_allow
				});
				setRedirectUrls(urls);
			});
		}
	},[props]);

	return (
		<div className="offer-modal">
			<ReactModal
				isOpen={open}
			>
				<i className="fa fa-times" aria-hidden="true" onClick={() => setOpen(false)}></i>
				<h2>Offer Redirections</h2>
				<div><strong>Id : </strong>{offer.id}</div>
				<div><strong>Name : </strong>{offer.name}</div>
				<div><strong>Country : </strong>{offer.country}</div>
				<div><strong>Os : </strong>{offer.os}</div>
				<h4>Urls</h4>
				{
					redirectUrls.map((url, index) => {
						return <div className="url" key={index}>{url}</div>
					})
				}
			</ReactModal>
		</div>
	);
}

export interface Offer {
	name: string;
	id: string;
	country: string;
	os: string;
}

export default OfferModal;