import React, { useState, } from 'react';
import { Modal, } from "react-bootstrap";
import {axios} from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_DATA } from '../../redux/_/offices/officesActionTypes';


export default function OfficeDelete({ id, }) {

	const {
		index, 
		size,
	} = useSelector(state => state.offices)
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const dispatch = useDispatch();

	const handleDelete = async (id, pageIndex, pageSize) => {
		
		const url = `/api/offices/${id}`
		
		const response = await axios.delete(url)
		if (!response.data.success) return;
		dispatch({type: FETCH_OFFICES_DATA, payload: { input: { index: pageIndex, size: pageSize }}})
		return handleClose();
	}
	const { Header, Title, Body, Footer, } = Modal;

	return (
		<>
			<button className="btn shadow-none" onClick={() => handleShow()}><i className="bi bi-trash-fill"/></button>
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
				<Footer className="gap-2">
					<button className="btn button__delete shadow-none"><span className="button__delete__text" onClick={() => handleDelete(id, index, size)}>Xóa</span></button>
					<button className="btn button__delete__cancel shadow-none" onClick={handleClose}><span className="button__delete__text__cancel">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}