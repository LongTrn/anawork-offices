import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { AddFolder, EditOffice, DeleteOffice, } from "../index"
import { fetchOfficesList, } from "../../actions/_/dispatch"
import "../../styles/_/OfficesFolders.scss"

export default function OfficesFoldersHeader() {

	const { folderId, } = useSelector(state => state.offices)
	const dispatch = useDispatch();

	useEffect(() => { }, [folderId])

	return (
		<div className="offices-folders__header">
			<div className="text-nowrap text-uppercase offices-folders__header__text" onClick={()=> dispatch(fetchOfficesList())}>
				danh sach văn phòng
			</div>
			<div className="offices-folders__header__action">
				<AddFolder />
				<EditOffice id={folderId} />
				<DeleteOffice id={folderId || ""} />
			</div>
		</div>
	)
}