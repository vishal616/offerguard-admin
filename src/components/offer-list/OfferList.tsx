import React, {useEffect, useState} from 'react';
import {OfferService} from "../../services/offerService";
import {AgGridReact} from "ag-grid-react";
import './offer-list.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OfferModal from "../offer-modal/offer-modal";
import FallBack from "../fallback/FallBack";
import ManualOfferStatusRenderer from './ManualOfferStatusRenderer';
import {toast} from "react-toastify";
import ToastInjector from "../toast/ToastInjector";
import StatsModal from "../stats/StatsModal";

function OfferList() {
	const [rowData, setRowData] = useState([]);
	const [modalData, setModalData] = useState(null);
	const [showLoader, setShowLoader] = useState(true)
	const [showStat, setShowStat] = useState(false);
	const [showOffer, setShowOffer] = useState(false);

	const checkAndUpdateOfferStatus = (offerId: string) => {
		setShowLoader(true);
		OfferService.checkAndUpdateOfferStatus(offerId).then((response) => {
			if(response.status !== 200) {
				toast.error("Something went wrong while updating offer status");
			}
			const updatedOffer = response.data;
			const offerList = rowData.map((offer: any) => {
				if (offer.offerid === updatedOffer.offerid) {
					return updatedOffer;
				}
				return offer;
			});
			prepareRows(offerList);
			toast.success("Offer Status updated successfully");
		});
	}

	const columnDefs = [
		{ headerName: 'Offer Id', field: 'offerid', floatingFilter: true },
		{ headerName: 'Name', field: 'name', floatingFilter: true },
		{ headerName: 'Affiliate Status',
			field: 'affiliateStatus',
			cellStyle: (params: any) => {
				if (params.value === "FAILED") {
					return { backgroundColor: "red" };
				} else if (params.value === "SUCCESS") {
					return { backgroundColor: "green" };
				} else {
					return { backgroundColor: "yellow" };
				}
			},
			floatingFilter: true
		},
		{ headerName: 'Redirects', field: 'redirects', filter: 'agNumberColumnFilter', floatingFilter: true},
		{ headerName: 'Mobile Marketing Platform', field: 'mobileMarketingPlatforms', floatingFilter: true},
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
		{ headerName: 'ISP Blocked', field: 'isp_block', floatingFilter: true},
		{ headerName: 'Manual Offer Check',
			field: 'offerid',
			cellRenderer: 'manualOfferStatusRenderer',
			cellRendererParams: {
				checkAndUpdateOfferStatus: checkAndUpdateOfferStatus
			}
		}
	];

	const frameworkComponents = {
		manualOfferStatusRenderer: ManualOfferStatusRenderer
	}

	const getAllOffers = () => {
		OfferService.getAllOffers().then(({data}) => {
			prepareRows(data);
		});
	}

	useEffect( getAllOffers, []);

	const prepareRows = (data: any) => {
		data = data.map((offer: any) => {
			if(!offer.affiliateStatus) {
				offer.affiliateStatus = "PENDING";
				return offer;
			}
			return offer;
		});
		setRowData(data);
		setShowLoader(false);
	}

	const openOfferModal = (offer: any) => {
		setModalData(offer.data);
		toggleOfferModal(true);
	};

	const toggleStatModal = (value: boolean) => {
		setShowStat(value);
	}

	const toggleOfferModal = (value: boolean) => {
		setShowOffer(value);
	}

	return (
		<div className="offers">
			<FallBack
				showLoader={showLoader}
			/>
			<div style={!showLoader ? {display: 'flex'} : {display: 'none'}} className="actions" >
				<button className="action-button" onClick={() => toggleStatModal(true)}>Check Stats</button>
				<button className="action-button">Trigger Offer 18 job</button>
				<button className="action-button">Trigger Mobrand job</button>
			</div>
			<div className="ag-theme-alpine offer-list" style={!showLoader ? {display: 'block'} : {display: 'none'}}>
				<AgGridReact
					columnDefs={columnDefs}
					rowData={rowData}
					enableCellTextSelection={true}
					enableBrowserTooltips={true}
					animateRows={true}
					defaultColDef={{sortable: true, filter: true, resizable: true}}
					onCellDoubleClicked={openOfferModal}
					frameworkComponents={frameworkComponents}
				></AgGridReact>
			</div>
			<OfferModal
				showOffer={showOffer}
				data={modalData}
				toggleOfferModal={toggleOfferModal}
			></OfferModal>
			<StatsModal
				showStats={showStat}
				toggleStatModal={toggleStatModal}
			></StatsModal>
			<ToastInjector/>
		</div>
	);
}

export default OfferList;