import { FETCH_OFFICES_LIST, FETCH_OFFICES_DETAIL, } from "../../redux/_/offices/officesActionTypes"

export const fetchOfficesList = (index = 1, size = 10, id) => {
	return {type: FETCH_OFFICES_LIST, payload: {input: { id, index, size }}}
}

export const fetchOfficesDetail = (id) => {
	return {type: FETCH_OFFICES_DETAIL, payload: { input : { id }}}
}