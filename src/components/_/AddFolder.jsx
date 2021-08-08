import React, { useState, useRef, } from 'react';
import { Modal, } from "react-bootstrap";
import { AddFolderModalBody, } from "../index"
import {axios} from "../../config/index";
import { addFolder, } from '../../actions/_/api';

export default function AddFolder() {

	const folderRef = useRef()
	const [show, setShow] = useState(false);
	const { Header, Title, Body, Footer, } = Modal;
	
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleSubmit = async () => {
		
		/**
		 	is_office: false
			name: "Khu vực văn phòng 1"
			parent_id: "96856649-d5fa-46af-98d2-71e7289dbf77"
		 */
		const submitState = {
			is_office: false,
			latitude: "0", 
			longitude: "0", 
			...folderRef.current.state()
		}
		const url = `/api/offices`
		const response = await axios.post(url, submitState)
		if (!response.data.success) return;

		// await addFolder(submitState)
		return handleClose()
	}

	return (
		<>
			<button className="btn shadow-none" onClick={() => handleShow()}><i className="bi bi-folder-plus"/></button>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="modal"
			>
				<Header>
					<Title>{"Thêm thư mục văn phòng mới"}</Title>
					<button className="btn shadow-none" onClick={handleClose}><i className="bi bi-x-lg modal-header__button__text"></i></button>
				</Header>
				<Body className="add-office add-office__body">
					<AddFolderModalBody ref={folderRef}/>
				</Body>
				<Footer className="gap-2">
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--left" onClick={() => handleSubmit()}><span className="modal-footer__buttons__text--left">Thêm</span></button>
					<button className="btn shadow-none modal-footer__buttons modal-footer__buttons--right" onClick={() => handleClose()}><span className=" modal-footer__buttons__text--right">Hủy</span></button>
				</Footer>
			</Modal>
		</>
	)
}