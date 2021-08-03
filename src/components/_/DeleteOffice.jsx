import React, { useState, } from 'react';
import { Modal, } from "react-bootstrap";

export default function OfficeDelete() {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDelete = async () => {
		
		// const url = `/api/recruits/requests/${id}`
		// const response = await axios.delete(url)
		// if (!response.data.success) return;
		// fetchData()
		handleClose();
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
					<button className="btn button__delete shadow-none"><span className="button__delete__text" onClick={handleDelete}>Xóa</span></button>
					<button className="btn button__delete__cancel shadow-none" onClick={handleClose}><span className="button__delete__text__cancel">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}