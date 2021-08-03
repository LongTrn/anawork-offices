import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import "../../styles/_/OfficeDetail.scss"
import { Container, Row, Col, } from "react-bootstrap";
import {axios} from "../../config/index";
import { FETCH_OFFICES_DATA } from '../../redux/_/offices/officesActionTypes';

export default function OfficeDetail(props) {
	
	const [officesTypes, setOfOfficesTypes] = useState([])
	const [state, setState] = useState({})
	const { 
		index, 
		size,
		collection, 
		data,
	} = useSelector(state => state.offices)
	const { id, code, full_address, latitude, longitude, name, office_type_id, parent_id, radius, } = state
	const [mutated, setMutated] = useState({
		parent_name: "",
	})
	const {parent_name, } = mutated
	const dispatch = useDispatch();

	const fetchOfficesTypes = async () => {

		const url = `/api/officeTypes`
		const response = await axios.get(url)

		if (!response.data.success) return;
		setOfOfficesTypes(response.data.data.collection)
		console.log(response.data.collection)
	}

	const handleChange = (event) => {
		console.log("event", event)
		// setState(prev => ({...prev, [event.target.name]: event.target.value}))
		setState((prev) => {
			return {
				...prev,
				[event.target.name]: event.target.value,
			};
		});
	}

	const onBack = (index = 1, size = 10) => {
		
		return dispatch({type: FETCH_OFFICES_DATA, payload: {input: { index, size }}})
	}

	const onUpdate = async (id, index = 1, size = 10) => {
		
		const url = `/api/offices/${id}`
		const response = await axios.put(url, state)

		if(!response.data.success) return;
		return dispatch({type: FETCH_OFFICES_DATA, payload: {input: { index, size }}})
	}

	const Header = () => (
		<div className="office-detail__header">
			<div className="text-nowrap text-uppercase office-detail__header__text">
				thông tin văn phòng
			</div>
		</div>		
	)

	const Body = () => (
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
						<input type="text" className="add-modal-body__fields__input" onChange={(e) => handleChange(e)} value={parent_name} name={"parent_id"}/>
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
	
	const Footer = () => (
		<div className="modal-footer office-detail__footer">
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => onBack(index, size)}><span className=" modal-footer__buttons__text--right">Hủy</span></button>
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => onUpdate(id, index, size)}><span className="modal-footer__buttons__text--left">Cập nhật</span></button>
		</div>
	)

	useEffect(() => {
		fetchOfficesTypes()
	}, [])

	useEffect(() => {
		const detail = collection.find(office => office.id === parent_id)
		if (detail) {

			setMutated(prev => ({...prev, 
				parent_name: detail.name
			}))
		}
	}, [ collection ])

	useEffect(() => {

		setState(prev => data)
	},[ data ])

	useEffect(() => {

	},[ state ])

	return (
		<div className="office-detail">
			<div className="office-detail__wrapper office-detail__wrapper__header ">
				<Header />
			</div>
			<div className="office-detail__wrapper office-detail__wrapper__body ">
				<Body />
			</div>
			<div className="office-detail__wrapper office-detail__wrapper__footer ">
				<Footer />
			</div>
		</div>
	)
}