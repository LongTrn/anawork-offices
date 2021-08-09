import React, { useEffect } from 'react';
import {
	OfficeDetail,
	OfficesList,

} from "../index"
import "../../styles/_/Offices.scss"
import { useSelector, } from "react-redux"

export default function OfficesContent() {
	
	const {data} = useSelector(state => state.offices)

	useEffect(() => {}, [ data ])

	return (
		<div className="offices-layout__right">
			{data.id? 
				<OfficeDetail />
				:
				<OfficesList />
			}
		</div>
	)
}