import React, { useEffect } from 'react';
import {
	OfficeDetail,
	OfficesFolders,
	OfficesList,

} from "../index"
import "../../styles/_/Offices.scss"
import { useSelector, } from "react-redux"

function OfficesLayoutRight() {
	
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
export default function Offices() {

	return (
		<div className="offices-layout">
			<div className="offices-layout__left">
				<OfficesFolders />
			</div>
			{/* <div className="offices-layout__right">
				{data.id? 
					<OfficeDetail />
					:
					<OfficesList />
				}
			</div> */}
			<OfficesLayoutRight />
		</div>
	)
}