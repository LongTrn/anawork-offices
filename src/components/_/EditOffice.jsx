import React from 'react';
import { useDispatch, } from "react-redux"
import { fetchOfficesDetail, } from "../../actions/_/dispatch"

export default function OfficeEdit({ id, }) {

	const dispatch = useDispatch();
	const showDetail = (id) => dispatch(fetchOfficesDetail(id))

	return (
		<><button className="btn shadow-none" onClick={() => showDetail(id)}><i className="bi bi-pencil-fill"/></button></>
	)
}