import { call, put, takeEvery, } from 'redux-saga/effects'
import {
	GET_TOKEN,
	SET_TOKEN,

	SET_AUTH_USER,
	UNSET_AUTH_USER,

} from "../../redux/_/auth/authActionTypes"
import {axios} from '../../config/index'

async function login(username = "vodinhthien@gmail.com", password = "RAPtor@4321") {
	const url = `/api/authenticate/authenticate?username=${username}&password=${password}`
	return await axios.post(url)
}

async function getMyInfo() {
	const url = `/api/authenticate/getMyInfo`
	return await axios.get(url)
}

function* workerAuth() {
	try {
		let setToken = yield call({
			context: localStorage,
			fn: localStorage.getItem
		}, "token")
	
		if (!setToken) {
			const response = yield login()
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
		const response = yield getMyInfo()
		const { user, success, message} = response.data
		if (!success && message) {throw new Error(message)}
		yield put({type: SET_AUTH_USER, payload: { user }})
	} catch (error) {
		console.group("Watcher Authenticating Error")
		console.log(error)
		console.groupEnd()
	}
}

export function* watchAuth(){
	yield takeEvery(GET_TOKEN, workerAuth)
}