import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {RedirectUrlService} from "../../services/RedirectUrlService";
import './offer-modal.css';
import FallBack from "../fallback/FallBack";

function OfferModal(props: any) {
	const [open, setOpen] = useState(false);
	const [redirectUrls, setRedirectUrls] = useState([]);
	const [showLoader, setShowLoader] = useState(false);
	const [offer, setOffer] = useState<Offer>({
		name: '',
		country: '',
		id: '',
		os: '',
		mobileMarketingPlatforms: '',
		redirects: '',
		affiliateStatus: ''
	});

	useEffect(() => {
		if(props.showOffer) {
			setShowLoader(true);
			RedirectUrlService.getAllRedirectUrlsForOffer(props.data.offerid).then(({data}) => {
				const urls = data.map((data: any) => data.url);
				setOffer({
					name: props.data.name,
					id: props.data.offerid,
					os: props.data.os_allow,
					country: props.data.country_allow,
					redirects: props.data.redirects,
					mobileMarketingPlatforms: props.data.mobileMarketingPlatforms,
					affiliateStatus: props.data.affiliateStatus
				});
				setRedirectUrls(urls);
				setShowLoader(false);
				setOpen(true);
			});
		}
	},[props]);

	const toggleModal = (value: boolean) => {
		props.toggleOfferModal(value);
		setOpen(false);
		setShowLoader(false);
	}

	return (
		<div className="offer-modal">
			<FallBack showLoader={showLoader}/>
			<ReactModal
				isOpen={open}
			>
				<i className="fa fa-times" aria-hidden="true" onClick={() => toggleModal(false)}></i>
				<h2>Offer Redirections</h2>
				<div><strong>Id : </strong>{offer.id}</div>
				<div><strong>Name : </strong>{offer.name}</div>
				<div><strong>Country : </strong>{offer.country}</div>
				<div><strong>Os : </strong>{offer.os}</div>
				<div><strong>Redirects : </strong>{offer.redirects}</div>
				<div><strong>Status : </strong>{offer.affiliateStatus}</div>
				<div><strong>Mobile Marketing Platforms : </strong>{offer.mobileMarketingPlatforms.length === 0 ? 'Could not find the matches' : offer.mobileMarketingPlatforms }</div>
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
	redirects: string;
	mobileMarketingPlatforms: string;
	affiliateStatus: string;
}

export default OfferModal;