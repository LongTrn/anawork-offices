import React, { useState, useEffect, } from 'react';
import {
	Pagination,
	AddOffice,
	EditOffice,
	DeleteOffice,
} from '../index';
import { useSelector, } from "react-redux"
import "../../styles/_/OfficesList.scss"

export default function OfficesListBody() {

	const state = useSelector(state => state.offices)
	const {
		index,
		size,
		list,
	} = state
	const [listState, setListState] = useState([{}])

	useEffect(() => {

		const slicedCollection = (index > 0 && size > 0) ? list.slice((index - 1) * size, index * size) : list
		setListState(prev => slicedCollection)
	}, [state,])

	return (
		<div className="offices-list__body">
			<table className="offices-list__body__table__head">
				<thead className="offices-list__body__table__head__thead">
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">#</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">mã văn phòng</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">tên văn phòng</div></th>
					<th><div className="text-uppercase offices-list__body__table__head__thead__text">địa chỉ</div></th>
					<th>
						<div className="offices-list__body__table__head__thead__action">
							<AddOffice />
						</div></th>
				</thead>
			</table>
			{listState.length > 0 ?
				(<table className="offices-list__body__table__body">
					<tbody className="offices-list__body__table__body__tbody">
						{listState.map((office, index) => {
							return (
								<tr key={office.id}>
									<td><div className="offices-list__body__table__body__tbody__text">{index + 1}</div></td>
									<td><div className="offices-list__body__table__body__tbody__text">{office.code}</div></td>
									<td><div className="offices-list__body__table__body__tbody__text">{office.name}</div></td>
									<td><div className="offices-list__body__table__body__tbody__text">{office.full_address}</div></td>
									<td>
										<div className="offices-list__body__table__body__tbody__action">
											<EditOffice id={office.id} />
											<DeleteOffice id={office.id} />
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>)
				:
				<div className="offices-list__body__table__body__no-content">
					Không có dữ liệu
				</div>
			}
			<div className="offices-list__body__paging">
				<Pagination page={{ type: "offices" }} />
			</div>
		</div>
	)
}