import React, { useState, useEffect, } from 'react';
import "../../styles/_/Pagination.scss"
import { useDispatch, useSelector, } from "react-redux"
import { useParams, } from "react-router-dom";
import { 
	SET_OFFICES_PAGE,
	SET_OFFICES_PAGE_SIZE,
} from '../../redux/_/offices/officesActionTypes';

export default function Pagination ({ classes, page }) {

	const state = useSelector(state => state[page.type])
	const { index, total, size, all } = state
	const numbersList = [ 5, 10 , 20 , 100];
	const [ranging, setRanging] = useState(index * size)
	const [allRequest, setAllRequest] = useState(false)
	const dispatch = useDispatch();
	// const { idJobDetail: exceptJobID } = useParams();
	
	const handlePage = (pageIndex) => {

		switch (page.type) {

			case "offices":
				return dispatch({type: SET_OFFICES_PAGE, payload : { input: { target: SET_OFFICES_PAGE, index: pageIndex, size}}})

			// case "jobs":
			// 	if (page.payload.input === "otherJobs") return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, id: exceptJobID, index, size: size}}});
			// 	else return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, index, size: size}}});

			// case "recruit":
			// 	return dispatch({ type: SET_RECRUIT_PAGE, payload: { input: { all: allRequest, index, size: size}}});
			
			// case "myRecruit":
			// 	return dispatch({ type: SET_MY_RECRUIT_PAGE, payload: { input: { index, size: size}}});
			
			default:
				return;
		}
	}
	
	const handlePageSize = (pageSize) => {
		
		switch (page.type) {

			case "offices":
				return dispatch({type: SET_OFFICES_PAGE_SIZE, payload : { input: { index, size: pageSize}}})

			// case "jobs":
			// 	if (page.payload.input === "otherJobs") return dispatch({ type: SET_JOB_PAGE_SIZE, payload: { input: { target: FETCH_JOB_DATA, id: exceptJobID , index, size}}});
			// 	else return dispatch({ type: SET_JOB_PAGE_SIZE, payload: { input: { target: FETCH_JOB_DATA, index, size}}});

			// case "recruit":
			// 	return dispatch({ type: SET_RECRUIT_PAGE_SIZE, payload: { input: { all: allRequest, index, size}}});
				
			// case "myRecruit":
			// 	return dispatch({ type: SET_MY_RECRUIT_PAGE_SIZE, payload: { input: { index, size}}});
			
			default:
				return;
		}
	}

	useEffect(() => { 
		setRanging(parseInt(index * size))
	}, [ index, size, ])

	useEffect(() => {
		// console.log("state", state)
	}, [ page, state ])

	useEffect(() => { 
		setAllRequest(prev=>all)
	}, [ all, ])

	return (
		<div className={classes? "offices-page center" :"offices-page"}>
			<div className="offices-page__item">
				<span className="offices-page__text">Số dòng trên mỗi trang: </span>
				<select 
					name="type" 
					className="offices-page__pageSize offices-page__pageSize__value"
					id="paging__ListRecruitment"
					onChange={(e) => handlePageSize(e.target.value)}
					value={size}
				>
					{numbersList.map(val => (
						<option value={val} key={val} className="offices-page__pageSize__value">{val}</option>
					))}
				</select>
			</div>
			<div className="offices-page__item">
				<div>
					<span className="offices-page__number text-nowrap">{(index - 1) * size + 1 > total? parseInt(total/size) * size + 1: (index - 1) * size + 1 || " "} - {ranging > total? total: ranging || " "} của {total}</span>
				</div>
				<div className="offices-page__buttons">
					<button className="btn offices-page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-bar-left offices-page__buttons__first" onClick={() => handlePage(1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-compact-left offices-page__buttons__previous" onClick={() => handlePage(index - 1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-compact-right offices-page__buttons__next" onClick={() => handlePage(index + 1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-bar-right offices-page__buttons__last" onClick={() => handlePage(Math.ceil(total / size))}/></button>
				</div>
			</div>
		</div>
	)
}