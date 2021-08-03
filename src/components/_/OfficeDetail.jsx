import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import "../../styles/_/OfficeDetail.scss"
import { Container, Row, Col, } from "react-bootstrap";

export default function OfficeDetail(props) {
	
	const { collection, data } = useSelector(state => state.offices)
	const {code, full_address, latitude, longitude, name, office_type_id, parent_id, } = data
	const [mutated, setMutated] = useState({
		parent_name: "",
	})
	const {parent_name, } = mutated
	const dispatch = useDispatch();
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
						<input type="text" className="add-modal-body__fields__input" value={name}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="code" className="add-modal-body__fields__text">Mã văn phòng</label>
						<input type="text" className="add-modal-body__fields__input" value={code}/>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="region" className="add-modal-body__fields__text">Trực thuộc</label>
						<input type="text" className="add-modal-body__fields__input" value={parent_name}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="type" className="add-modal-body__fields__text">Loại văn phòng</label>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="longtitude" className="add-modal-body__fields__text">Kinh độ</label>
						<input type="text" className="add-modal-body__fields__input" value={longitude}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="latitude" className="add-modal-body__fields__text">Vĩ độ</label>
						<input type="text" className="add-modal-body__fields__input" value={latitude}/>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="address" className="add-modal-body__fields__text">Địa chỉ</label>
						<textarea rows="14" cols="10" wrap="soft" type="text" className="add-modal-body__fields__input" value={full_address}/>
					</div>
				</Col>
			</Row>
		</Container>
	)
	
	const Footer = () => (
		<div className="modal-footer office-detail__footer">
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" ><span className=" modal-footer__buttons__text--right">Hủy</span></button>
			<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left"><span className="modal-footer__buttons__text--left">Cập nhật</span></button>
		</div>
	)

	useEffect(() => {
		console.log(collection)
		console.log(collection.find(office => office.id === parent_id))
		const detail = collection.find(office => office.id === parent_id)
		if (detail) {

			setMutated(prev => ({...prev, 
				parent_name: detail.name
			}))
		}
	}, [ collection ])
	useEffect(() => {},[ data ])

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