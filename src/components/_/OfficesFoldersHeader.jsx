import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { fetchOfficesDetail, } from "../../actions/_/dispatch"
import { AddFolder, DeleteOffice, } from "../index"
import "../../styles/_/OfficesFolders.scss"

export default function OfficesFoldersHeader() {

	const { folderId, } = useSelector(state => state.offices)
	const dispatch = useDispatch();
	const onDetail = (id) => {
		if (!id) alert("Chọn thư mục")
		dispatch(fetchOfficesDetail(id))
	}

	useEffect(() => { }, [folderId])

	return (
		<div className="offices-folders__header">
			<div className="text-nowrap text-uppercase offices-folders__header__text">
				danh sach văn phòng
			</div>
			<div className="offices-folders__header__action">
				<AddFolder />
				<button className="btn shadow-none" onClick={() => onDetail(folderId)}><i className="bi bi-pencil-fill" /></button>
				<DeleteOffice id={folderId || ""} />
			</div>
		</div>
	)
}