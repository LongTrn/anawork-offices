import React, {
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import "../../styles/_/AddModalBody.scss";
import { Container, Row, Col, } from "react-bootstrap";
import { axios } from "../../config/index";
import { useDispatch, useSelector, } from "react-redux"

export default forwardRef(function AddModalBody ({id}, ref) {

	const [officesTypes, setOfOfficesTypes] = useState([])
	const [state, setState] = useState({
		code: "", //"VP0001",
		full_address: "", //"68 Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000",
		is_office: true, //true,
		latitude: "", //"12", // 0 - 100
		longitude: "", //"12", // 0 - 100
		name: "", //"Văn phòng UI test",
		office_type_id: "", //"481cafe4-db78-4f73-9735-4c919a4e6020",
		parent_id: "96856649-d5fa-46af-98d2-71e7289dbf77", //"96856649-d5fa-46af-98d2-71e7289dbf77",
		radius: "0", //"12",
	})
	const { 
		collection, 
		data,
	} = useSelector(state => state.offices)
	const [mutated, setMutated] = useState({
		parent_name: "",
	})
	const {parent_name, } = mutated
	const {code, full_address, latitude, longitude, name, office_type_id, parent_id, } = state
	
	const handleChange = (event) => {

		setState(prev => ({...prev,
			[event.target.name]: event.target.value
		}))
	}
	const fetchOfficesTypes = async () => {

		const url = `/api/officeTypes`
		const response = await axios.get(url)

		if (!response.data.success) return;
		setOfOfficesTypes(response.data.data.collection)
		console.log(response.data.data.collection)
	}

	useEffect(() => {
		fetchOfficesTypes()
	}, [])

	useEffect(() => {
	}, [mutated])

	useEffect(() => {
		const detail = collection.find(office => office.id === id)
		if (detail) {

			setMutated(prev => ({...prev, 
				parent_name: detail.name
			}))
		}
	}, [ collection, ])

	useImperativeHandle(ref, () => ({
		state: () => {
			console.log('state', state)
			return state;
		},	
	}), [state])

	return (
		<Container className="add-modal-body">
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="name" className="add-modal-body__fields__text">Tên văn phòng</label>
						<input type="text" className="add-modal-body__fields__input" value={name} onChange={(e) => handleChange(e)}  name="name" />
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="code" className="add-modal-body__fields__text">Mã văn phòng</label>
						<input type="text" className="add-modal-body__fields__input" value={code} onChange={(e) => handleChange(e)}  name="code" />
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="region" className="add-modal-body__fields__text">Trực thuộc</label>
						<input disabled type="text" className="add-modal-body__fields__input" value={parent_id} />
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="type" className="add-modal-body__fields__text">Loại văn phòng</label>
						<select name="type" className="add-modal-body__fields__input add-modal-body__fields__input--select" value={office_type_id} onChange={(e) => handleChange(e)} name="office_type_id" >
							{officesTypes.map(officesType => (<option value={officesType.id} >{officesType.name}</option>))}
						</select>
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="longtitude" className="add-modal-body__fields__text">Kinh độ</label>
						<input type="text" className="add-modal-body__fields__input" value={longitude} onChange={(e) => handleChange(e)}  name="longitude" />
					</div>
				</Col>
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="latitude" className="add-modal-body__fields__text">Vĩ độ</label>
						<input type="text" className="add-modal-body__fields__input" value={latitude} onChange={(e) => handleChange(e)}  name="latitude" />
					</div>
				</Col>
			</Row>
			<Row className="add-modal-body__rows">
				<Col>
					<div className="add-modal-body__fields">
						<label htmlFor="address" className="add-modal-body__fields__text">Địa chỉ</label>
						<textarea rows="14" cols="10" wrap="soft" type="text" className="add-modal-body__fields__input" value={full_address} onChange={(e) => handleChange(e)}  name="full_address" />
					</div>
				</Col>
			</Row>
		</Container>
	);
})