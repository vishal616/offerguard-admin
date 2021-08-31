import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';

function OfferModal(props: any) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if(props.data) {
			setOpen(true);
		}
	},[props]);

	return (
		<div className="offer-modal">
			<ReactModal
				isOpen={open}
			>
				<h2>TEST</h2>
				<button onClick={() => setOpen(false)}>close</button>
			</ReactModal>
		</div>
	);
}

export default OfferModal;