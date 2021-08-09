import React from 'react';
import { OfficesFolders, OfficesContent, } from "../index"
import "../../styles/_/Offices.scss"

export default function Offices() {
	return (
		<div className="offices-layout">
			<div className="offices-layout__left"><OfficesFolders /></div>
			<OfficesContent />
		</div>
	)
}