import React from 'react';
import './ManualOfferStatusRenderer.css'

function ManualOfferStatusRenderer (props : any) {

	const buttonClicked = () => {
		props.checkAndUpdateOfferStatus(props.value);
	};

	return (
		<span>
			<button onClick={buttonClicked}>Check</button>
		</span>
	);
};

export default ManualOfferStatusRenderer;