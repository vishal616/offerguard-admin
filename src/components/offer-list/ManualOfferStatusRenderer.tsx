import React from 'react';
import './ManualOfferStatusRenderer.css'

export default (props : any) => {

	const buttonClicked = () => {
		props.checkAndUpdateOfferStatus(props.value);
	};

	return (
		<span>
			<button onClick={buttonClicked}>Check</button>
		</span>
	);
};