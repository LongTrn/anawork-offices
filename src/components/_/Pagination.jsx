import React, { useState, useEffect, } from 'react';
import "../../styles/_/Pagination.scss"
// import { useDispatch, useSelector, } from "react-redux"
import { useParams, } from "react-router-dom";

export default function Pagination ({ classes, page }) {

	// const state = useSelector(state => state[page.type])
	const { index, total, pageSize, all } = {
		index: 1,
		total: 100,
		pageSize: 10,
		all: false,
	}
	const numbersList = [ 5, 10 , 20 , 100];
	const [ranging, setRanging] = useState(index * pageSize)
	const [allRequest, setAllRequest] = useState(false)
	// const dispatch = useDispatch();
	// const { idJobDetail: exceptJobID }= useParams();
	
	const handlePage = (index) => {

		switch (page.type) {

			// case "jobs":
			// 	if (page.payload.input === "otherJobs") return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, id: exceptJobID, index, size: pageSize}}});
			// 	else return dispatch({ type: SET_JOB_PAGE, payload: { input: { target: FETCH_JOB_DATA, index, size: pageSize}}});

			// case "recruit":
			// 	return dispatch({ type: SET_RECRUIT_PAGE, payload: { input: { all: allRequest, index, size: pageSize}}});
			
			// case "myRecruit":
			// 	return dispatch({ type: SET_MY_RECRUIT_PAGE, payload: { input: { index, size: pageSize}}});
			
			default:
				return;
		}
	}
	
	const handlePageSize = (size) => {
		
		switch (page.type) {

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
		setRanging(parseInt(index * pageSize))
	}, [ index, pageSize, ])

	useEffect(() => {
	// }, [ page, state ])
	}, [ page, ])

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
					value={pageSize}
				>
					{numbersList.map(val => (
						<option value={val} key={val} className="offices-page__pageSize__value">{val}</option>
					))}
				</select>
			</div>
			<div className="offices-page__item">
				<div>
					<span className="offices-page__number text-nowrap">{(index - 1) * pageSize + 1 > total? parseInt(total/pageSize) * pageSize + 1: (index - 1) * pageSize + 1 || " "} - {ranging > total? total: ranging || " "} của {total}</span>
				</div>
				<div className="offices-page__buttons">
					<button className="btn offices-page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-bar-left offices-page__buttons__first" onClick={() => handlePage(1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-compact-left offices-page__buttons__previous" onClick={() => handlePage(index - 1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-compact-right offices-page__buttons__next" onClick={() => handlePage(index + 1)}/></button>
					<button className="btn offices-page__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-bar-right offices-page__buttons__last" onClick={() => handlePage(Math.ceil(total / pageSize))}/></button>
				</div>
			</div>
		</div>
	)
}