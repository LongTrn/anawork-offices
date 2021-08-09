import React, { useState, useEffect, } from 'react';
import { OfficesFoldersHeader, OfficesFoldersBody, } from "../index";
import "../../styles/_/OfficesFolders.scss"
import { useDispatch, useSelector, } from "react-redux"
import { fetchOfficesList, } from "../../actions/_/dispatch"

export default function OfficesFolders() {

	const state = useSelector(state => state.offices)
	const { token } = useSelector(state => state.auth)
	const {
		folders,
	} = state
	const dispatch = useDispatch();
	const [list , setList] = useState([{}])

	const fetchData = ( pageSize = 10 ) => dispatch(fetchOfficesList(1, pageSize))
	
	useEffect(() => {
		if (token) fetchData()
	}, [token])

	useEffect(() => {
		setList(prev => folders)
	}, [ state, ])

	useEffect(() => {
	}, [ list, ])
	
	return (
		<div className="offices-folders">
			<OfficesFoldersHeader  />	
			<OfficesFoldersBody folders={folders}/>	
		</div>
	)
}