import {
	GET_TOKEN,
	SET_TOKEN,

} from "./authActionTypes"

const initial = {
	token: "", 
	refreshToken: "",
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

		default:
			return state;
	}
}