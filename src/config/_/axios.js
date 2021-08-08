import axios from "axios";
import store from "../../redux/store"
import { SET_TOKEN } from "../../redux/_/auth/authActionTypes";

function getLocalToken() {
    const token = window.localStorage.getItem('token')
    return token
}

//get token via refreshToken
// function getLocalRefreshToken() {
//     const token = window.localStorage.getItem('refreshToken')
//     return token
// }

function getToken(username = 'vodinhthien@gmail.com', password = 'RAPtor@4321') {
    return instance.post(`/api/authenticate/authenticate?username=${username}&password=${password}`)
}

// function refreshToken () {
//     return instance.post('/token',{
//         refreshToken: getLocalRefreshToken()
//     })
// }


const instance = axios.create({
	baseURL: "http://27.74.255.96:8089",
	headers: {
		// "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9kaW5odGhpZW5AZ21haWwuY29tIiwiZXhwIjoxNjM2MTc4ODIxLCJpc3MiOiJhbmF3b3JrLmNvbSIsImF1ZCI6ImFuYXdvcmsuY29tIn0.kNmVRbuNhZ0kU-9XXf1j2DtMzVBw2IOQti0h2hrZFSo",
		// "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9kaW5odGhpZW5AZ21haWwuY29tIiwiZXhwIjoxNjM2MTgxNTgxLCJpc3MiOiJhbmF3b3JrLmNvbSIsImF1ZCI6ImFuYXdvcmsuY29tIn0.ybuiSs-OVhQ7nDH0TMmVw_qWaQrKvK7xjr7DwXGA5u0",
		"Content-type": "application/json, multipart/form-data",
		"Access-Control-Allow-Origin": "http://27.74.255.96:8089",
	}
})

instance.setAuthorizationHeader = (token) => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`
	store.dispatch({type: SET_TOKEN, payload: { token: token, refreshToken: token}})
	// instance.defaults.headers.common['Authorization'] = `Bearer ${localToken}`
    window.localStorage.setItem('token', token)
}

instance.interceptors.request.use((config) =>{
	const localToken = getLocalToken()
	const storeState = store.getState()
	const storeToken = storeState.auth.token
	// const localRefreshToken = getLocalRefreshToken()

	if (localToken !== null && localToken !== undefined && localToken !== "null") {

		instance.setAuthorizationHeader(localToken)
	}
	else if (storeToken !== null && storeToken !== undefined && storeToken !== "null") {

		instance.setAuthorizationHeader(storeToken)
	}

	return config;
}, (error) => {
	return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    return response
}, error => {
	const originalRequest = error.config;
    if (error.response.status === 401) {
		originalRequest._retry = true;
		getToken().then(response => {
			const { success, token} = response.data
			if (success) {
				window.localStorage.setItem("token", token)
				window.localStorage.setItem("refreshToken", token)
				instance.setAuthorizationHeader(token)
				// return instance(originalRequest)
			} 
			// else return instance(originalRequest)
		})
    } else {
        return Promise.reject(error)
    }
})

export default instance