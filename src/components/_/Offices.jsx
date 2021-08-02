import React from 'react';
import {
	OfficesList,
	OfficesFolders,

} from "../index"
import "../../styles/_/Offices.scss"

export default function Offices() {

	return (
		<div className="offices-layout">
			<OfficesFolders />
			<OfficesList />
		</div>
	)
}