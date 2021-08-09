import React, { useState, } from 'react';
import { Modal, } from "react-bootstrap";
import {axios} from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"
import { fetchOfficesList, } from "../../actions/_/dispatch"
import "../../styles/_/DeleteOffice.scss"
import { deleteOffice, } from "../../actions/_/api"

export default function OfficeDelete({ id, }) {

	const {
		folderId,
		index, 
		size,
	} = useSelector(state => state.offices)
	const [show, setShow] = useState(false);
	const { Header, Title, Body, Footer, } = Modal;

	const dispatch = useDispatch();
	const handleClose = () => setShow(false);
	const handleShow = (id) => {
		if (!id) return alert("Chọn đối tượng muốn xóa")
		return setShow(true);
	}
	const handleDelete = async (id, pageIndex, pageSize) => {
		await deleteOffice(id)
		dispatch(fetchOfficesList(pageIndex, pageSize, folderId))
		return handleClose();
	}

	return (
		<>
			<button className="btn shadow-none" onClick={() => handleShow(id)}><i className="bi bi-trash-fill"/></button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header>
					<Title>{"Xóa yêu cầu tuyển dụng"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg"></i></button>
				</Header>
				<Body className="button__delete button__delete__body">
					Bạn có muốn xóa bỏ yêu cầu này không?
				</Body>
				<Footer className="gap-2 modal-footer">
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left modal-footer__buttons--left--inverted"><span className="modal-footer__buttons__text--left--inverted" onClick={() => handleDelete(id, index, size)}>Xóa</span></button>
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={handleClose}><span className="modal-footer__buttons__text--right">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}