import React, {useEffect, useState} from 'react';
import {OfferService} from "../../services/offerService";
import {AgGridReact} from "ag-grid-react";
import './offer-list.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function OfferList() {
	const [rowData, setRowData] = useState([]);
	const columnDefs = [
		{ headerName: 'Offer Id', field: 'offerid' },
		{ headerName: 'Name', field: 'name' },
		{ headerName: 'Os', field: 'os_allow'},
		{ headerName: 'Country', field: 'country_allow'},
		{ headerName: 'Affiliate Status', field: 'affiliateStatus'},
		{ headerName: 'Redirects', field: 'redirects'},
	];

	useEffect( () => {
		OfferService.getAllOffers().then(({data}) => {
			setRowData(data);
		})
	}, []);

	return (
		<div className="offer-list">
			<div className="ag-theme-alpine" style={{height: 800, width: 800}}>
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
				></AgGridReact>
			</div>
		</div>
	);
}

export default OfferList;