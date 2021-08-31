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
		{ headerName: 'Affiliate Status', field: 'affiliateStatus'},
		{ headerName: 'Redirects', field: 'redirects', filter: 'agNumberColumnFilter'},
		{ headerName: 'Os Allowed', field: 'os_allow'},
		{ headerName: 'Os Blocked', field: 'os_block'},
		{ headerName: 'Country Allowed', field: 'country_allow'},
		{ headerName: 'Country Blocked', field: 'country_block'},
		{ headerName: 'Click Url', field: 'click_url'},
		{ headerName: 'Impression Url', field: 'impression_url'},
		{ headerName: 'Category', field: 'category'},
		{ headerName: 'Currency', field: 'currency'},
		{ headerName: 'Price', field: 'price', filter: 'agNumberColumnFilter'},
		{ headerName: 'Model', field: 'model'},
		{ headerName: 'Start Date', field: 'date_start'},
		{ headerName: 'End Date', field: 'end_start'},
		{ headerName: 'Preview Url', field: 'preview_url'},
		{ headerName: 'City Allowed', field: 'city_allow'},
		{ headerName: 'City Blocked', field: 'city_block'},
		{ headerName: 'Device Allowed', field: 'device_allow'},
		{ headerName: 'Device Blocked', field: 'device_block'},
		{ headerName: 'ISP Allowed', field: 'isp_allow'},
		{ headerName: 'ISP Blocked', field: 'isp_block'}
	];

	useEffect( () => {
		OfferService.getAllOffers().then(({data}) => {
			setRowData(data);

		})
	}, []);

	const openOfferModal = (offer: any) => {
		console.log(offer);
	};

	return (
		<div className="offers">
			<div className="ag-theme-alpine offer-list">
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
					enableCellTextSelection={true}
					enableBrowserTooltips={true}
					floatingFilter={true}
					animateRows={true}
					defaultColDef={{sortable: true, filter: true, resizable: true}}
					onCellDoubleClicked={openOfferModal}
				></AgGridReact>
			</div>
		</div>
	);
}

export default OfferList;