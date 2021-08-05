import React, { useState, useEffect, } from 'react';
import { } from "../index";
import "../../styles/_/OfficesFolders.scss"
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_LIST, FETCH_OFFICES_DETAIL } from '../../redux/_/offices/officesActionTypes';
import { Accordion, AddFolder, DeleteOffice,  } from "../index"

function Header () {

	const { folderId, } = useSelector(state => state.offices)
	const dispatch = useDispatch();
	const onDetail = (id) => {
		if(!id) alert("Chọn thư mục")
		dispatch({type: FETCH_OFFICES_DETAIL, payload: { input : { id }}})
	} 

	useEffect(() => {}, [folderId])

	return (
		<div className="offices-folders__header">
			<div className="text-nowrap text-uppercase offices-folders__header__text">
				danh sach văn phòng
			</div>
			<div className="offices-folders__header__action">
				<AddFolder />
				<button className="btn shadow-none" onClick={() => onDetail(folderId)}><i className="bi bi-pencil-fill"/></button>
				<DeleteOffice id={folderId || ""}/>
			</div>
		</div>
	)
}

function Body ({folders}) {

	return (
		<div className="offices-folders__body">
			<div className="offices-folders__body__search-bar">
				<input type="text" className="offices-folders__body__search-bar__field" placeholder="Tìm kiếm..."/>
			</div>
			<div className="offices-folders__body__folders">
				<Accordion children={folders}/>
			</div>
		</div>
	)
}

export default function OfficesFolders() {

	const state = useSelector(state => state.offices)
	const {
		folders,
	} = state
	const dispatch = useDispatch();
	const [list , setList] = useState([{}])

	const fetchData = ( pageSize = 10 ) => {
		dispatch({type: FETCH_OFFICES_LIST, payload: { input: { index: 1, size: pageSize }}})
		return;
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		setList(prev => folders)
	}, [ state, ])

	useEffect(() => {
	}, [ list, ])
	
	return (
		<div className="offices-folders">
			<Header  />	
			<Body folders={folders}/>	
		</div>
	)
}