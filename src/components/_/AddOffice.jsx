import React, { useState, useEffect, } from 'react';
import { Modal, } from "react-bootstrap";
import { AddModalBody, } from "../index"

export default function OfficeAdd() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { Header, Title, Body, Footer, } = Modal;

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
					<AddModalBody />
				</Body>
				<Footer className="gap-2">
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left"><span className="modal-footer__buttons__text--left">Xóa</span></button>
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={handleClose}><span className=" modal-footer__buttons__text--right">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}