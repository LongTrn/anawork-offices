import React from 'react';
import { useDispatch, } from "react-redux"
import { fetchOfficesDetail, } from "../../actions/_/dispatch"

export default function EditOffice({ id, }) {

	const dispatch = useDispatch();
	const showDetail = (id) => {
		if (!id) return alert("Chọn thư mục")
		return dispatch(fetchOfficesDetail(id))
	}

	return (
		<><button className="btn shadow-none button" onClick={() => showDetail(id)}><div className="icons icons__edit"/></button></>
	)
}