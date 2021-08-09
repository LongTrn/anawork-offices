import { call, put, takeEvery, } from 'redux-saga/effects'
import {
	GET_TOKEN,
	SET_TOKEN,

} from "../../redux/_/auth/authActionTypes"
import {axios} from '../../config/index'

function* workerAuth() {
	try {
		let setToken = yield call({
			context: localStorage,
			fn: localStorage.getItem
		}, "token")
	
		if (!setToken) {
			console.log("test")
			const username = "vodinhthien@gmail.com"
			const password = "RAPtor@4321"
			const url = `/api/authenticate/authenticate?username=${username}&password=${password}`
			const response = yield axios.post(url)
		
			if (!response) throw new Error("Bad Request Authenticate")
			const { token, success } = response.data
			if (!success) throw new Error("Get Authenticate Failed")
			yield call({
				context: localStorage,
				fn: localStorage.setItem
			}, "token", token)
			setToken = token
		}
		
		yield put({type: SET_TOKEN, payload: { token: setToken}})
	} catch (error) {
		
	}
}

export function* watchAuth(){
	yield takeEvery(GET_TOKEN, workerAuth)
}