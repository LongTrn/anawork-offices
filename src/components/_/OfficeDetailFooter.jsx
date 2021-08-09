import React from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { fetchOfficesList, } from "../../actions/_/dispatch"
import { editOffice, } from "../../actions/_/api"
import moment from "moment"

export default function Footer({getState}) {

	const { 
		index, 
		size,
		folderId,
	} = useSelector(state => state.offices)
	const { user, } = useSelector(state => state.auth)
	const dispatch = useDispatch();

	const onBack = (id, index = 1, size = 10) => {
		return dispatch(fetchOfficesList(index, size, id, ))
	}

	const onUpdate = async (index = 1, size = 10) => {
		
		const submitState = {...getState(),
			modified_at: moment().format(),
			modified_by: user.id,
		}
		await editOffice(submitState)
		return dispatch(fetchOfficesList(index, size,))
	}
	
	return (
		<div className="modal-footer office-detail__footer">
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => onBack(folderId, index, size)} ><span className=" modal-footer__buttons__text--right">Hủy</span></button>
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => onUpdate(index, size)}><span className="modal-footer__buttons__text--left">Cập nhật</span></button>
		</div>
	)
}