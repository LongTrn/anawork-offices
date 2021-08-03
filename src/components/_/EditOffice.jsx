import React, { useSate, useEffect, } from 'react';
import { axios } from '../../config/index'
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_DETAIL } from '../../redux/_/offices/officesActionTypes';

export default function OfficeEdit({ id, }) {

	const dispatch = useDispatch();
	const submitEdit = async (id) => {
		
		const url = `/api/offices/${id}`
		const response = await axios.put(url, {})

		if (!response.data.success) return;
	}

	return (
		<>
			<button className="btn shadow-none" onClick={() => dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})}><i className="bi bi-pencil-fill"/></button>
		</>
	)
}