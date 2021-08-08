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
	
} from "./officesActionTypes"

const initial = {
	data: {},
	folders: [],
	folderId: "",
	collection: [],
	list: [],
	index: 1,
	size: 10,
	total: 0,
	isLoading: false,
	error: null
}

export const officesReducer = (state = initial, action) => {

	switch (action.type) {
		
		case SET_OFFICES_PAGE:
			return {
				...state, 
				index: action.payload.input.index,
			}
		
		case SET_OFFICES_PAGE_SIZE:
			return {
				...state, 
				size: action.payload.input.size,
			}
			
		case FETCH_OFFICES_DATA:
		case FETCH_OFFICES_LIST:
		case FETCH_OFFICES_DETAIL:
		case FETCH_OFFICES_FOLDERS:
			return {
				...state, 
				isLoading: true,
			}
		
		case FETCH_OFFICES_FAILED:
		case FETCH_OFFICES_LIST_FAILED:
		case FETCH_OFFICES_DETAIL_FAILED:
		case FETCH_OFFICES_FOLDERS_FAILED:
			return {
				...state, 
				isLoading: false,
				error: action.payload.error,
			}
		
		case FETCH_OFFICES_DETAIL_SUCCESS:
			return {
				...state, 
				isLoading: false,
				data: action.payload.data,
				// folderId: "",
			}
		
		case FETCH_OFFICES_FOLDERS_SUCCESS:
			return {
				...state, 
				isLoading: false,
				folders: action.payload.folders,
				data: {},
			}
		
		case FETCH_OFFICES_LIST_SUCCESS:
			return {
				...state, 
				isLoading: false,
				list: action.payload.list,
				total: action.payload.total,
				data: {},
				index: action.payload.index,
				size: action.payload.size,
				folderId: action.payload.id || state.folderId,
			}
		
		case FETCH_OFFICES_SUCCESS:
			return {
				...state, 
				isLoading: false,
				collection: action.payload.collection,
				data: {},
			}

		default:
			return state
	}
}