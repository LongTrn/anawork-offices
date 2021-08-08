import React, { useState, useEffect, forwardRef, useImperativeHandle, } from 'react';
import { useSelector, } from "react-redux"
import {axios} from "../../config/index";
import { Container, Row, Col, } from "react-bootstrap";

export default forwardRef(function Body(props, ref) {

	const [officesTypes, setOfOfficesTypes] = useState([])
	const [state, setState] = useState({})
	const { 
		collection, 
		data,
	} = useSelector(state => state.offices)
	const { code, full_address, latitude, longitude, name, office_type_id, parent_id, } = state
	const [mutated, setMutated] = useState({
		parent_name: "",
	})
	const {parent_name, } = mutated

	const handleChange = (event) => {
		setState((prev) => {
			return {
				...prev,
				[event.target.name]: event.target.value,
			};
		});
	}

	const fetchOfficesTypes = async () => {

		const url = `/api/officeTypes`
		const response = await axios.get(url)

		if (!response.data.success) return;
		return setOfOfficesTypes(response.data.data.collection)
	}

	useEffect(() => {
		fetchOfficesTypes()
	}, [])

	useEffect(() => {}, [ collection, ])

	useEffect(() => { setState(prev => data) },[ data ])

	useEffect(() => {
		const detail = collection.find(office => office.id === parent_id)
		if (detail) {

			setMutated(prev => ({...prev, 
				parent_name: detail.name
			}))
		}
	},[ state ])

	useImperativeHandle(ref, () => ({
		state: () => {
			return state;
		},
	}), [ state ]);

	return (
		<Container className="add-modal-body">
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="name" className="add-modal-body__fields__text">Tên văn phòng</label>
						<input type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={name} name={"name"}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="code" className="add-modal-body__fields__text">Mã văn phòng</label>
						<input type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={code} name={"code"}/>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="region" className="add-modal-body__fields__text">Trực thuộc</label>
						<input disabled type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={parent_name} name={"parent_id"}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="type" className="add-modal-body__fields__text">Loại văn phòng</label>
						<select className="add-modal-body__fields__input add-modal-body__fields__input--select office-detail__body__fields__input--select" onChange={(e) => handleChange(e)} value={office_type_id} name={"office_type_id"}>
							{officesTypes.map(officesType => (<option onChange={(e) => handleChange(e)} value={officesType.id}>{officesType.name}</option>))}
						</select>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="longtitude" className="add-modal-body__fields__text">Kinh độ</label>
						<input type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={longitude} name={"longitude"}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="latitude" className="add-modal-body__fields__text">Vĩ độ</label>
						<input type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={latitude} name={"latitude"}/>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="address" className="add-modal-body__fields__text">Địa chỉ</label>
						<textarea rows="14" cols="10" wrap="soft" type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={full_address} name={"full_address"}/>
					</div>
				</Col>
			</Row>
		</Container>
	)
})