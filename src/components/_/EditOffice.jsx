import React from 'react';
import { useDispatch, } from "react-redux"
import { FETCH_OFFICES_DETAIL } from '../../redux/_/offices/officesActionTypes';

export default function OfficeEdit({ id, }) {

	const dispatch = useDispatch();
	const showDetail = (id) => dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})

	return (
		<>
			<button className="btn shadow-none" onClick={() => showDetail(id)}><i className="bi bi-pencil-fill"/></button>
		</>
	)
}