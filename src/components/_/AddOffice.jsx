import React, { useState, useEffect, useRef, } from 'react';
import { Modal, } from "react-bootstrap";
import { AddOfficeModalBody, } from "../index"
import {axios} from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_LIST } from '../../redux/_/offices/officesActionTypes';

export default function OfficeAdd() {

	const submitRef = useRef();
	const { folderId, index, size, } = useSelector(state => state.offices)
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { Header, Title, Body, Footer, } = Modal;
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async () => {
		
		const submitState = submitRef.current.state();
		const url = `/api/offices`
		const response = await axios.post(url, submitState)

		if (!response.data.success) return;
		dispatch({type: FETCH_OFFICES_LIST, payload: { input: { index, size }}})
		return handleClose()
	}

	useEffect(() => {}, [show])

	return (
		<>
			<button className="btn shadow-none" onClick={() => handleShow()}><i className="bi bi-plus-lg"/><span className="list__body__table__body__tbody__action__text">Thêm</span></button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header>
					<Title>{"Thêm văn phòng mới"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg modal-header__button__text"></i></button>
				</Header>
				<Body className="add-office add-office__body">
					<AddOfficeModalBody id={folderId} ref={submitRef}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => handleSubmit()}><span className="modal-footer__buttons__text--left">Thêm</span></button>
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => handleClose()}><span className=" modal-footer__buttons__text--right">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}