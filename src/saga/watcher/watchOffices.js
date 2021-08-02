import { put, takeEvery, } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	FETCH_OFFICES_DATA,
	FETCH_OFFICES_FAILED,
	FETCH_OFFICES_SUCCESS,

	FETCH_OFFICES_DETAIL,
	FETCH_OFFICES_DETAIL_FAILED,
	FETCH_OFFICES_DETAIL_SUCCESS,
	
	SET_OFFICES_PAGE,
	SET_OFFICES_PAGE_SIZE,
} from "../../redux/_/offices/officesActionTypes"

function* fetchData(id, search) {
	
	const url = id? `/api/offices/${id}`
	: search? `/api/offices?Filters=name@=*${search},code@=*${search}`
	: `/api/offices`
	const response = yield axios.get(url)
	
	if (!response.data.success) throw new Error("Fetch List Offices Failed")
	return response.data.data
}

function* workerOffices (action) {
	try {
		const { id, search, index, size } = action.payload.input
		let response = yield fetchData(id, search)
		
		if (size >= response.total) response = yield fetchData(id, search,)
		
		let { collection } = response
		const total = collection.length;
		collection = (index > 0 && size > 0)? collection.slice((index - 1) * size, index * size) : collection
		yield put({ type: FETCH_OFFICES_SUCCESS, payload: { total, collection}})
	} catch (error) {
		console.group("Watcher Offices")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerOfficesDetail (action) {
	try {
		const { id } = action.payload.input
		const url = `/api/recruits/requests/${id}`
		const response = yield axios.get(url)

		if (!response.data.success) throw new Error("Fetch Job Detail Failed")
		const data = response.data.data
		yield put({ type: FETCH_OFFICES_DETAIL_SUCCESS, payload: { data} })		
	} catch (error) {
		console.group("Watcher Recruit")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_DETAIL_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPaging(action) {
	try {
		const { target, ...input } = action.payload.input

		switch (target) {

			case FETCH_OFFICES_DETAIL:
				yield put({type: FETCH_OFFICES_DETAIL, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_OFFICES_DATA, payload: {input}})
				break;
		}
	} catch (error) {
		console.group("Watcher Recruit Paging")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerPageSizing(action) {
	try {
		const { target, ...input } = action.payload.input
		switch (target) {

			case FETCH_OFFICES_DETAIL:
				yield put({type: FETCH_OFFICES_DETAIL, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_OFFICES_DATA, payload: {input}})
				break;
		}
		
	} catch (error) {
		console.group("Watcher Recruit Paging Size")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_FAILED,
            payload : {
                error
            }
        })
	}
}

export function* watchOffices(){
	yield takeEvery(FETCH_OFFICES_DATA, workerOffices)
	// yield takeEvery(FETCH_OFFICES_DETAIL, workerOfficesDetail)
	yield takeEvery(SET_OFFICES_PAGE, workerPaging)
	yield takeEvery(SET_OFFICES_PAGE_SIZE, workerPageSizing)
}