import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import {RedirectUrlService} from "../../services/RedirectUrlService";
import './offer-modal.css';

function OfferModal(props: any) {
	const [open, setOpen] = useState(false);
	const [redirectUrls, setRedirectUrls] = useState([]);

	useEffect(() => {
		if(props.data) {
			setOpen(true);
			RedirectUrlService.getAllRedirectUrlsForOffer(props.data.offerid).then(({data}) => {
				const urls = data.map((data: any) => data.url);
				setRedirectUrls(urls);
			});
		}
	},[props]);

	return (
		<div className="offer-modal">
			<ReactModal
				isOpen={open}
			>
				<button onClick={() => setOpen(false)}>close</button>
				<h2>Offer Redirections</h2>
				{
					redirectUrls.map((url, index) => {
						return <div key={index}>{url}</div>
					})
				}
			</ReactModal>
		</div>
	);
}

export default OfferModal;