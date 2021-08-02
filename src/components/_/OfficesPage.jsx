import React from 'react';
import "../../styles/_/OfficesPage.scss"
import { Header, Offices, } from "../index"

export default function OfficesPage() {

	return (
		<div className="offices-page">
			<div className="offices-page--wrapper">
				<Header main={"Cài đặt"} sub={"Cài đặt văn phòng"} />
				<Offices />
			</div>
		</div>
	)
}