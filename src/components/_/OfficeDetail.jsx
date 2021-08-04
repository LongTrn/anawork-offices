import React, { useRef, } from 'react';
import "../../styles/_/OfficeDetail.scss"
import { OfficeDetailHeader, OfficeDetailBody, OfficeDetailFooter, } from "../index"

export default function OfficeDetail() {
	
	const bodyRef = useRef();
	const actionSubmit = () => bodyRef.current.state()

	return (
		<div className="office-detail">
			<div className="office-detail__wrapper office-detail__wrapper__header "><OfficeDetailHeader /></div>
			<div className="office-detail__wrapper office-detail__wrapper__body "><OfficeDetailBody ref={bodyRef} /></div>
			<div className="office-detail__wrapper office-detail__wrapper__footer "><OfficeDetailFooter getState={actionSubmit} /></div>
		</div>
	)
}