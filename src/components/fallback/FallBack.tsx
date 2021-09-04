import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import './FallBack.css';

function FallBack(props: {showLoader: boolean}) {

	const [openLoader, setOpenLoader] = useState(false);

	useEffect(()=>{
		if(props.showLoader) {
			setOpenLoader(true);
		} else {
			setOpenLoader(false);
		}
	}, [props]);

	return (
		<div className="fallBack" style={openLoader ? {display: 'block'} : {display: 'none'}}>
			<Loader
				type="TailSpin"
				height={100}
				width={100}
				color="Blue"
			></Loader>
		</div>
	)
}

export default FallBack;