import React from 'react';
import { } from "../index";
import "../../styles/_/OfficesFolders.scss"

export default function OfficesFolders() {

	const Header = () => (
		<div className="offices-folders__header">
			<div className="text-nowrap text-uppercase offices-folders__header__text">
				danh sach văn phòng
			</div>
			<div className="offices-folders__header__action">
				<button className="btn shadow-none"><i className="bi bi-folder-plus"/></button>
				<button className="btn shadow-none"><i className="bi bi-pencil-fill"/></button>
				<button className="btn shadow-none"><i className="bi bi-trash-fill"/></button>
			</div>
		</div>
	)

	const Body = () => (
		<div className="offices-folders__body">

		</div>
	)
	
	return (
		<div className="offices-folders">
			<Header />	
			<Body />	
		</div>
	)
}