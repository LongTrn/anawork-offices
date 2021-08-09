import React from 'react';
import "../../styles/_/OfficesList.scss"
import {
	OfficesListBody,
	OfficesListHeader,
} from '../index';

export default function OfficesList() {
	return (
		<div className="offices-list">
			<OfficesListHeader />
			<OfficesListBody />
		</div>
	)
}