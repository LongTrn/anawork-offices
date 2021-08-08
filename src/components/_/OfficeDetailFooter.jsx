import React from 'react';
import {axios} from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_LIST } from '../../redux/_/offices/officesActionTypes';

export default function Footer({ getState}) {

	const { 
		index, 
		size,
		folderId,
	} = useSelector(state => state.offices)
	const dispatch = useDispatch();

	const onBack = (id, index = 1, size = 10) => {
		
		return dispatch({type: FETCH_OFFICES_LIST, payload: {input: { id, index, size, }}})
	}

	const onUpdate = async (index = 1, size = 10) => {
		
		const submitState = getState()
		const url = `/api/offices/${submitState.id}`
		const response = await axios.put(url, submitState)

		if(!response.data.success) return;
		return dispatch({type: FETCH_OFFICES_LIST, payload: {input: { index, size }}})
	}
	
	return (
		<div className="modal-footer office-detail__footer">
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => onBack(folderId, index, size)} ><span className=" modal-footer__buttons__text--right">Hủy</span></button>
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => onUpdate(index, size)}><span className="modal-footer__buttons__text--left">Cập nhật</span></button>
		</div>
	)
}