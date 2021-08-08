import React, { useEffect } from 'react';
import { OfficesPage, } from "./components/index"
import './styles/_/App.scss';
import { useDispatch, useSelector, } from "react-redux"
import { GET_TOKEN } from './redux/_/auth/authActionTypes';

function App() {

	const { token } = useSelector(state => state.auth)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({type: GET_TOKEN})
	}, [token])

	return (
		<div className="App">
			<OfficesPage />
		</div>
	);
}

export default App;
