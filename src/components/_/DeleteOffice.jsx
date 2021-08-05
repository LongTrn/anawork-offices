import React, { useState, } from 'react';
import { Modal, } from "react-bootstrap";
import {axios} from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_LIST } from '../../redux/_/offices/officesActionTypes';
import "../../styles/_/DeleteOffice.scss"

export default function OfficeDelete({ id, }) {

	const {
		folderId,
		index, 
		size,
	} = useSelector(state => state.offices)
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = (id) => {
		console.log("Đối tượng muốn xóa", id)
		if (!id) return alert("Chọn đối tượng muốn xóa")
		return setShow(true);
	}
	const dispatch = useDispatch();

	const handleDelete = async (id, pageIndex, pageSize) => {
		const url = `/api/offices/${id}`
		
		const response = await axios.delete(url)
		if (!response.data.success) return;
		dispatch({type: FETCH_OFFICES_LIST, payload: { input: { id: folderId, index: pageIndex, size: pageSize }}})
		return handleClose();
	}
	const { Header, Title, Body, Footer, } = Modal;

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