import React, {
	useState,
	useEffect,
} from "react";
import "../../styles/_/AddModalBody.scss";
import { Container, Row, Col, } from "react-bootstrap";
import { axios } from "../../config/index";

export default function AddModalBody (props) {

	const [officesTypes, setOfOfficesTypes] = useState([])
	const [state, setState] = useState({
		code: "", //"VP0001",
		full_address: "", //"68 Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000",
		is_office: true, //true,
		latitude: "", //"12",
		longitude: "", //"12",
		name: "", //"Văn phòng UI test",
		office_type_id: "", //"481cafe4-db78-4f73-9735-4c919a4e6020",
		parent_id: "", //"96856649-d5fa-46af-98d2-71e7289dbf77",
		radius: "", //"12",
	})
	const {code, full_address, latitude, longitude, name, office_type_id, parent_id, } = state
	const fetchOfficesTypes = async () => {

		const url = `/api/officeTypes`
		const response = await axios.get(url)

		if (!response.data.success) return;
		setOfOfficesTypes(response.data.data.collection)
		console.log(response.data.collection)
	}

	useEffect(() => {
		fetchOfficesTypes()
	}, [])

	useEffect(() => {

	}, [])

	return (
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
						<input type="text" className="add-modal-body__fields__input" value={parent_id}/>
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="type" className="add-modal-body__fields__text">Loại văn phòng</label>
						<select name="type" className="add-modal-body__fields__input add-modal-body__fields__input--select" value={office_type_id}>
							{officesTypes.map(officesType => (<option value={officesType.id}>{officesType.name}</option>))}
						</select>
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
	);
}