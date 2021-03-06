import React, { useState, useRef, } from 'react';
import { useDispatch, useSelector, } from "react-redux"
import { Modal, } from "react-bootstrap";
import { AddFolderModalBody, } from "../index"
import { addOffice, } from '../../actions/_/api';
import { fetchOfficesList, } from "../../actions/_/dispatch"
import { OfficeState, } from "../../models/index"

export default function AddFolder() {

	const { index, size, collection, } = useSelector(state => state.offices)
	const folderRef = useRef()
	const [show, setShow] = useState(false);
	const { Header, Title, Body, Footer, } = Modal;
	
	const dispatch = useDispatch();
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
		const test = {
			...OfficeState,
			is_office: false,
			latitude: "0", 
			longitude: "0", 
			code: "VP".concat(("" + (10001 + collection.length)).slice(1)),
			...folderRef.current.state()
		}
		console.log(test)
		await addOffice(submitState)
		dispatch(fetchOfficesList(index, size))
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