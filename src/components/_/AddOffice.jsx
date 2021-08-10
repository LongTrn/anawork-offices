import React, { useState, useRef, } from 'react';
import { Modal, } from "react-bootstrap";
import { AddOfficeModalBody, } from "../index"
import { useDispatch, useSelector, } from "react-redux"
import { fetchOfficesList, } from "../../actions/_/dispatch"
import { addOffice, } from '../../actions/_/api';
import "../../styles/_/OfficesList.scss"

export default function OfficeAdd() {

	const submitRef = useRef();
	const { index, size, folderId} = useSelector(state => state.offices)
	const { user, } = useSelector(state => state.auth)
	const [show, setShow] = useState(false);
	const { Header, Title, Body, Footer, } = Modal;
	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSubmit = async () => {
		if (!folderId) return alert("Vui lòng chọn Chi nhánh Trực thuộc")
		const submitState = {...submitRef.current.state(),
			created_by: user.id,
		};
		await addOffice(submitState)
		dispatch(fetchOfficesList(index, size, folderId))
		return handleClose()
	}

	return (
		<>
			<button className="btn shadow-none" onClick={() => handleShow()}><i className="bi bi-plus-lg"/><span className="offices-list__body__table__head__thead__action__text">Thêm</span></button>
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
					<AddOfficeModalBody ref={submitRef}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => handleSubmit()}><span className="modal-footer__buttons__text--left">Thêm</span></button>
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => handleClose()}><span className=" modal-footer__buttons__text--right">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}