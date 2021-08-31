import React, {useEffect, useState} from 'react';
import {OfferService} from "../../services/offerService";
import {AgGridReact} from "ag-grid-react";
import './offer-list.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OfferModal from "../offer-modal/offer-modal";

function OfferList() {
	const [rowData, setRowData] = useState([]);
	const [modalData, setModalData] = useState(null);
	const columnDefs = [
		{ headerName: 'Offer Id', field: 'offerid', floatingFilter: true },
		{ headerName: 'Name', field: 'name', floatingFilter: true },
		{ headerName: 'Affiliate Status',
			field: 'affiliateStatus',
			cellStyle: (params: any) => {
				if (params.value === "FAILED") {
					return { backgroundColor: "red" };
				} else {
					return { backgroundColor: "green" };
				}
			},
			floatingFilter: true
		},
		{ headerName: 'Redirects', field: 'redirects', filter: 'agNumberColumnFilter', floatingFilter: true},
		{ headerName: 'Os Allowed', field: 'os_allow', floatingFilter: true},
		{ headerName: 'Os Blocked', field: 'os_block', floatingFilter: true},
		{ headerName: 'Country Allowed', field: 'country_allow', floatingFilter: true},
		{ headerName: 'Country Blocked', field: 'country_block', floatingFilter: true},
		{ headerName: 'Click Url', field: 'click_url', floatingFilter: true},
		{ headerName: 'Impression Url', field: 'impression_url', floatingFilter: true},
		{ headerName: 'Category', field: 'category', floatingFilter: true},
		{ headerName: 'Currency', field: 'currency', floatingFilter: true},
		{ headerName: 'Price', field: 'price', filter: 'agNumberColumnFilter', floatingFilter: true},
		{ headerName: 'Model', field: 'model', floatingFilter: true},
		{ headerName: 'Start Date', field: 'date_start', floatingFilter: true},
		{ headerName: 'End Date', field: 'end_start', floatingFilter: true},
		{ headerName: 'Preview Url', field: 'preview_url', floatingFilter: true},
		{ headerName: 'City Allowed', field: 'city_allow', floatingFilter: true},
		{ headerName: 'City Blocked', field: 'city_block', floatingFilter: true},
		{ headerName: 'Device Allowed', field: 'device_allow', floatingFilter: true},
		{ headerName: 'Device Blocked', field: 'device_block', floatingFilter: true},
		{ headerName: 'ISP Allowed', field: 'isp_allow', floatingFilter: true},
		{ headerName: 'ISP Blocked', field: 'isp_block', floatingFilter: true}
	];

	useEffect( () => {
		OfferService.getAllOffers().then(({data}) => {
			setRowData(data);
		})
	}, []);

	const openOfferModal = (offer: any) => {
		setModalData(offer.data);
	};

	return (
		<div className="offers">
			<div className="ag-theme-alpine offer-list">
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
					enableCellTextSelection={true}
					enableBrowserTooltips={true}
					animateRows={true}
					defaultColDef={{sortable: true, filter: true, resizable: true}}
					onCellDoubleClicked={openOfferModal}
				></AgGridReact>
			</div>
			<OfferModal
				data={modalData}
			></OfferModal>
		</div>
	);
}

export default OfferList;