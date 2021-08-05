import { put, takeEvery, } from 'redux-saga/effects'
import {axios} from '../../config/index'

import {
	FETCH_OFFICES_DATA,
	FETCH_OFFICES_FAILED,
	FETCH_OFFICES_SUCCESS,

	FETCH_OFFICES_LIST,
	FETCH_OFFICES_LIST_FAILED,
	FETCH_OFFICES_LIST_SUCCESS,

	FETCH_OFFICES_FOLDERS,
	FETCH_OFFICES_FOLDERS_FAILED,
	FETCH_OFFICES_FOLDERS_SUCCESS,

	FETCH_OFFICES_DETAIL,
	FETCH_OFFICES_DETAIL_FAILED,
	FETCH_OFFICES_DETAIL_SUCCESS,
	
	SET_OFFICES_PAGE,
	SET_OFFICES_PAGE_SIZE,
	SET_OFFICES_TOTAL,
} from "../../redux/_/offices/officesActionTypes"

function* fetchData(id, search) {
	
	const url = search? `/api/offices?Filters=name@=*${search},code@=*${search}`
	: `/api/offices`
	const response = yield axios.get(url)
	
	if (!response.data.success) throw new Error("Fetch List Offices Failed")
	return response.data.data
}

function recursion(collection, id) {

	let response;
	if (!id) response = collection.filter(folder => !folder.parent_id)
	else response = collection.map((folder) => folder.parent_id === id? folder : null).filter(notNull => notNull )
	return response.map(folder => {
		const children = recursion(collection, folder.id)
		const hasChildren = children.length > 0 ? 
			{children} 
			: null
		return collection.find(check => check.parent_id === (id || folder.id))? 
			{...folder, ...hasChildren}
			: {...folder,}
	});
}

function* workerOffices (action) {
	try {
		const { id, index, search, size } = action.payload.input
		let response = yield fetchData(id, search)
		
		if (size >= response.total) response = yield fetchData(id, search,)
		
		let { collection } = response
		yield put({ type: FETCH_OFFICES_SUCCESS, payload: { total: collection.length, collection, index, size, id: id || ""}})
		yield put({type: FETCH_OFFICES_FOLDERS, payload: { input: { collection }}})
	} catch (error) {
		console.group("Watcher Offices Error")
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

function* workerOfficesList (action) {
	try {
		const { id, index, search, size } = action.payload.input
		console.log("workerOfficesList", action.payload.input)
		let response = yield fetchData(id, search)
		
		if (size >= response.total) response = yield fetchData(id, search,)
		
		let { collection } = response
		
		const filtered = id? collection.filter(office => office.parent_id === id).filter(office => office.is_office === true) : collection

		yield put({ type: FETCH_OFFICES_LIST_SUCCESS, payload: { total: filtered.length, list: filtered, index, size, id: id || ""}})
	} catch (error) {
		console.group("Watcher Offices Error")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_LIST_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerOfficesFolders (action) {
	try {
		const { collection, } = action.payload.input

		const folders = yield recursion(collection)
		yield put({ type: FETCH_OFFICES_FOLDERS_SUCCESS, payload: { total: collection.length, folders}})
	} catch (error) {
		console.group("Watcher Offices Folders Error")
		console.log(error)
		console.groupEnd()
        yield put({ 
            type : FETCH_OFFICES_FOLDERS_FAILED,
            payload : {
                error
            }
        })
	}
}

function* workerOfficesDetail (action) {
	try {
		const { id } = action.payload.input
		const url = `/api/offices/${id}`
		const response = yield axios.get(url)

		if (!response.data.success) throw new Error("Fetch Offices Detail Failed")
		const data = response.data.data
		yield put({ type: FETCH_OFFICES_DETAIL_SUCCESS, payload: { data} })		
	} catch (error) {
		console.group("Watcher Offices Detail Error")
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
		console.log("workerPaging", action.payload.input)

		switch (target) {

			case FETCH_OFFICES_DETAIL:
				yield put({type: FETCH_OFFICES_DETAIL, payload: {input}})
				break;

			case FETCH_OFFICES_LIST:
				yield put({type: FETCH_OFFICES_LIST, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_OFFICES_DATA, payload: {input}})
				break;
		}
	} catch (error) {
		console.group("Watcher Offices Paging Error")
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
		console.log("workerPageSizing", action.payload.input)

		switch (target) {

			case FETCH_OFFICES_DETAIL:
				yield put({type: FETCH_OFFICES_DETAIL, payload: {input}})
				break;

			case FETCH_OFFICES_LIST:
				yield put({type: FETCH_OFFICES_LIST, payload: {input}})
				break;
				
			default: 
				yield put({type: FETCH_OFFICES_DATA, payload: {input}})
				break;
		}
		
	} catch (error) {
		console.group("Watcher Offices Paging Size Error")
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

function* workerTotalPage(action) {
	try {

	} catch (error) {
		console.group("Watcher Offices Paging Size Error")
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
	yield takeEvery(FETCH_OFFICES_LIST, workerOfficesList)
	yield takeEvery(FETCH_OFFICES_FOLDERS, workerOfficesFolders)
	yield takeEvery(FETCH_OFFICES_DETAIL, workerOfficesDetail)
	yield takeEvery(SET_OFFICES_PAGE, workerPaging)
	yield takeEvery(SET_OFFICES_PAGE_SIZE, workerPageSizing)
	yield takeEvery(SET_OFFICES_TOTAL, workerTotalPage)
}