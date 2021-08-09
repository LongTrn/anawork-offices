import {
	GET_TOKEN,
	SET_TOKEN,

	SET_AUTH_USER,
	UNSET_AUTH_USER,

} from "./authActionTypes"

const initial = {
	token: "", 
	refreshToken: "",
	user: {},
}

export const authReducer = (state = initial, action) => {
	
	switch (action.type) {

		case GET_TOKEN:
			return {
				...state,
			}
		
		case SET_TOKEN:
			return {
				...state,
				token: action.payload.token,
				refreshToken: action.payload.refreshToken,
			}	
		
		case SET_AUTH_USER:
			return {
				...state,
				user: action.payload.user,
			}	
		
		case UNSET_AUTH_USER:
			return {
				...state,
				user: initial.user,
			}	

		default:
			return state;
	}
}