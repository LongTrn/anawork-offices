import {
	FETCH_OFFICES_DATA,
	FETCH_OFFICES_FAILED,
	FETCH_OFFICES_SUCCESS,
	FETCH_OFFICES_DETAIL,
	FETCH_OFFICES_DETAIL_FAILED,
	FETCH_OFFICES_DETAIL_SUCCESS,
	SET_OFFICES_PAGE,
	SET_OFFICES_PAGE_SIZE,
	
} from "./officesActionTypes"

const initial = {
	data: {},
	collection: [],
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
		case FETCH_OFFICES_DETAIL:
			return {
				...state, 
				isLoading: true,
			}
		
		case FETCH_OFFICES_FAILED:
		case FETCH_OFFICES_DETAIL_FAILED:
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
				total: action.payload.total,
			}
		
		case FETCH_OFFICES_SUCCESS:
			return {
				...state, 
				isLoading: false,
				collection: action.payload.collection,
				total: action.payload.total,
			}

		default:
			return state
	}
}