import React, {useEffect, useState} from 'react';
import ReactModal from 'react-modal';
import FallBack from "../fallback/FallBack";
import {StatsService} from "../../services/StatsService";
import './StatsModal.css';

export function StatsModal(props: Props) {
	const [open, setOpen] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [stats, setStats] = useState([]);

	useEffect(() => {
		if(props.showStats) {
			setShowLoader(true);
			StatsService.getAllStats().then(({data}) => {
				data = data.map((stat: Stat) => {
					return {
						id: stat.id,
						name: stat.name,
						value: stat.value
					}
				});
				setStats(data);
				setShowLoader(false);
				setOpen(true);
			});
		}
	},[props]);

	const toggleModal = (value: boolean) => {
		props.toggleStatModal(value);
		setOpen(false);
		setShowLoader(false);
	}

	return (
		<div className="stats">
			<FallBack showLoader={showLoader}/>
			<ReactModal
				isOpen={open}
			>
				<i className="fa fa-times" aria-hidden="true" onClick={() => toggleModal(false)}></i>
				<h2>Application Statistics</h2>
				{
					stats.map((stat: Stat) => {
						return (
							<div className="" key={stat.id}>
								<span>Last updated by {stat.name} job at : </span> <span>{stat.value}</span>
							</div>
						)
					})
				}
			</ReactModal>
		</div>
	);
}

export interface Stat {
	id: string;
	name: string;
	value: string;
}

export interface Props {
	showStats: boolean;
	toggleStatModal: Function;
}

export default StatsModal;