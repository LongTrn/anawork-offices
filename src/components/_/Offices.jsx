import React, { useEffect } from 'react';
import {
	OfficeDetail,
	OfficesFolders,
	OfficesList,

} from "../index"
import "../../styles/_/Offices.scss"
import { useSelector, } from "react-redux"

export default function Offices() {
	
	const {data} = useSelector(state => state.offices)

	useEffect(() => {},[ data ])

	return (
		<div className="offices-layout">
			<OfficesFolders />
			{data.id? 
				<OfficeDetail />
				:
				<OfficesList />
			}
		</div>
	)
}