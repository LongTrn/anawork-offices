import React, { useState, useEffect, } from 'react';
import "../../styles/_/OfficesList.scss"
import { Pagination, } from '../index';
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_DATA } from '../../redux/_/offices/officesActionTypes';

export default function OfficesList() {

	const state = useSelector(state => state.offices)
	const {
		collection,
	} = state
	const dispatch = useDispatch();
	const [list , setList] = useState([{}])
	const Header = () => (
		<div className="offices-list__header">
			<div className="text-nowrap text-uppercase offices-list__header__text">
				danh sach văn phòng
			</div>
		</div>		
	)

	const Body = () => (
		<div className="offices-list__body">
			<table className="offices-list__body__table__head">
				<thead className="offices-list__body__table__head__thead">
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">#</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">mã văn phòng</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">tên văn phòng</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">địa chỉ</div></th>
					<th>
						<div className="offices-list__body__table__head__thead__action">
							<button className="btn shadow-none"><i className="bi bi-plus-lg"/><span className="list__body__table__body__tbody__action__text">Thêm</span></button>
						</div></th>
				</thead>
			</table>
			<table className="offices-list__body__table__body">
				<tbody className="offices-list__body__table__body__tbody">
					{list.map( (office, index) => {
						return (<tr key={office.id}>
							<td><div className="offices-list__body__table__body__tbody__text">{index + 1}</div></td>
							<td><div className="offices-list__body__table__body__tbody__text">{office.code}</div></td>
							<td><div className="offices-list__body__table__body__tbody__text">{office.name}</div></td>
							<td><div className="offices-list__body__table__body__tbody__text">{office.full_address}</div></td>
							<td>
								<div className="offices-list__body__table__body__tbody__action">
									<button className="btn shadow-none"><i className="bi bi-pencil-fill"/></button>
									<button className="btn shadow-none"><i className="bi bi-trash-fill"/></button>
								</div>
							</td>
						</tr>
					)})}
				</tbody>
			</table>
			<div className="offices-list__body__paging">
				<Pagination page={{type: "offices"}}/>						
			</div>
		</div>
	)
	
	const fetchData = async ( pageIndex  = 1, pageSize = 10 ) => {
		dispatch({type: FETCH_OFFICES_DATA, payload: { input: { index: pageIndex, size: pageSize }}})
	}
	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		setList(prev => collection)
	}, [ state, ])

	return (
		<div className="offices-list">	
			<Header />
			<Body />
		</div>
	)
}