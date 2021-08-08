import { call, put, takeEvery, } from 'redux-saga/effects'

import {
	GET_TOKEN,
	SET_TOKEN,

} from "../../redux/_/auth/authActionTypes"

function* workerAuth() {

	const token = yield call({
		context: localStorage,
		fn: localStorage.getItem
	}, "token")

	yield put({type: SET_TOKEN, payload: { token }})
}

export function* watchAuth(){
	yield takeEvery(GET_TOKEN, workerAuth)
}