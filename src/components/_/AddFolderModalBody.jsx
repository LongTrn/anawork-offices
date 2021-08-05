import React, { 
	useState, 
	useEffect, 
	forwardRef,
	useImperativeHandle,
} from 'react';
import "../../styles/_/AddFolderModalBody.scss";
import { Container, Row, } from "react-bootstrap";
import { useDispatch, useSelector, } from "react-redux"
import { FETCH_OFFICES_LIST } from '../../redux/_/offices/officesActionTypes';

export default forwardRef(function AddFolderModalBody(props, ref) {

	const { collection, } = useSelector(state => state.offices)
	const [list, setList] = useState([])
	const [state, setState] = useState({
		name: "", 
		parent_id: "",
	})
	const { name, parent_id} = state
	const dispatch = useDispatch();
	const handleChange = (event) => setState(prev => ({...prev, [event.target.name]: event.target.value}))


	useEffect(() => {
		dispatch({type: FETCH_OFFICES_LIST, payload: { input: {}}})
	}, [])

	useEffect(() => {
		setList(collection.map(office => !office.is_office && office).filter(notNull => notNull))
	}, [collection])
	
	useEffect(() => {
		console.log(list)
	}, [list])

	useImperativeHandle(ref, () => ({
		state: () => {
			return state;
		},	
	}), [state])

	return (
		<Container className="add-folder-modal-body">
			<Row>
				<div className="add-folder-modal-body__fields">
					<label htmlFor="name" className="add-folder-modal-body__fields__text">Trực thuộc</label>
					<select type="text" className="shadow-none add-folder-modal-body__fields__input add-folder-modal-body__fields__input--select" name="parent_id" value={parent_id} onChange={(e) => handleChange(e)}>
						<option value="" className="add-folder-modal-body__fields__input__value">Không trực thuộc</option>
						{list.map(folder => (<option value={folder.id} className="add-folder-modal-body__fields__input__value">{folder.name}</option>))}
					</select>
				</div>
			</Row>
			<Row>
				<div className="add-folder-modal-body__fields">
					<label htmlFor="name" className="add-folder-modal-body__fields__text">Tên thư mục</label>
					<input type="text" className="add-folder-modal-body__fields__input" name="name" value={name} onChange={(e) => handleChange(e)}/>
				</div>
			</Row>
		</Container>
	)
})