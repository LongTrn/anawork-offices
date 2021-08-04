import React, { useState, useEffect, } from 'react';
import { } from "../index";
import "../../styles/_/OfficesFolders.scss"
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_DATA } from '../../redux/_/offices/officesActionTypes';
import { Accordion, } from "../index"

export default function OfficesFolders() {

	const state = useSelector(state => state.offices)
	const {
		folders,
	} = state
	const dispatch = useDispatch();
	const [list , setList] = useState([{}])

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
			<div className="offices-folders__body__search-bar">
				<input type="text" className="offices-folders__body__search-bar__field" placeholder="Tìm kiếm..."/>
			</div>
			<div className="offices-folders__body__folders">
				{/* <Accordion children={[{name: 1, title: "adf"},{name: 2},{name: 3},{name: 4}]}/> */}
				<Accordion children={folders}/>
			</div>
		</div>
	)

	const fetchData = ( pageSize = 10 ) => {
		dispatch({type: FETCH_OFFICES_DATA, payload: { input: { size: pageSize }}})
	}
	
	useEffect(() => {
		console.log(Accordion)
		fetchData()
	}, [])

	useEffect(() => {
		setList(prev => folders)
	}, [ state, ])

	useEffect(() => {
		console.log("folders", folders)
	}, [ list, ])
	
	return (
		<div className="offices-folders">
			<Header />	
			<Body />	
		</div>
	)
}