import React, { useState, useEffect, } from 'react';
import "../../styles/_/Pagination.scss"
import { useDispatch, useSelector, } from "react-redux"
// import { useParams, } from "react-router-dom";
import { 
	FETCH_OFFICES_LIST,
	SET_OFFICES_PAGE,
	SET_OFFICES_PAGE_SIZE,
} from '../../redux/_/offices/officesActionTypes';

export default function Pagination ({ classes, page }) {

	const state = useSelector(state => state[page.type])
	const { index, total, size, folderId, } = state
	const numbersList = [ 5, 10 , 20 , 100];
	const [ranging, setRanging] = useState(index * size)
	// const [allRequest, setAllRequest] = useState(false)
	const dispatch = useDispatch();
	// const { idJobDetail: exceptJobID } = useParams();
	
	const handlePage = (pageIndex) => {

		switch (page.type) {

			case "offices":
				return dispatch({type: SET_OFFICES_PAGE, payload : { input: { target: FETCH_OFFICES_LIST, id: folderId || "", index: pageIndex, size}}})

			default:
				return;
		}
	}
	
	const handlePageSize = (pageSize) => {
		
		switch (page.type) {

			case "offices":
				return dispatch({type: SET_OFFICES_PAGE_SIZE, payload : { input: { target: FETCH_OFFICES_LIST, id: folderId || "", index, size: pageSize}}})
			
			default:
				return;
		}
	}

	useEffect(() => { 
		setRanging(parseInt(index * size))
	}, [ index, size, folderId, ])

	useEffect(() => {
	}, [ page, state ])

	return (
		<div className={classes? "offices-pagination center" :"offices-pagination"}>
			<div className="offices-pagination__item">
				<span className="offices-pagination__text">Số dòng trên mỗi trang: </span>
				<select 
					name="type" 
					className="offices-pagination__pageSize offices-pagination__pageSize__value"
					id="paging__ListRecruitment"
					onChange={(e) => handlePageSize(e.target.value)}
					value={size}
				>
					{numbersList.map(val => (
						<option value={val} key={val} className="offices-pagination__pageSize__value">{val}</option>
					))}
				</select>
			</div>
			<div className="offices-pagination__item">
				<div>
					<span className="offices-pagination__number text-nowrap">{(index - 1) * size + 1 > total? parseInt(total/size) * size + 1: (index - 1) * size + 1 || " "} - {ranging > total? total: ranging || " "} của {total}</span>
				</div>
				<div className="offices-pagination__buttons">
					<button className="btn offices-pagination__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-bar-left offices-pagination__buttons__first" onClick={() => handlePage(1)}/></button>
					<button className="btn offices-pagination__buttons--size shadow-none" disabled={!(index - 1)}><i className="bi bi-chevron-compact-left offices-pagination__buttons__previous" onClick={() => handlePage(index - 1)}/></button>
					<button className="btn offices-pagination__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-compact-right offices-pagination__buttons__next" onClick={() => handlePage(index + 1)}/></button>
					<button className="btn offices-pagination__buttons--size shadow-none" disabled={ranging > total}><i className="bi bi-chevron-bar-right offices-pagination__buttons__last" onClick={() => handlePage(Math.ceil(total / size))}/></button>
				</div>
			</div>
		</div>
	)
}