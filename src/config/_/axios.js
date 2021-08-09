import axios from "axios";

function getLocalToken() {
    const token = window.localStorage.getItem('token')
    return token
}

async function getToken(username = 'vodinhthien@gmail.com', password = 'RAPtor@4321') {
	const { data } = await refreshToken(username, password)
	const { success, token, } = data
	if (!success) return;
	return token
}

async function refreshToken(username = 'vodinhthien@gmail.com', password = 'RAPtor@4321') {
    return await instance.post(`/api/authenticate/authenticate?username=${username}&password=${password}`)
}

const instance = axios.create({
	baseURL: "http://27.74.255.96:8089",
	headers: {
		"Content-type": "application/json, multipart/form-data",
		"Access-Control-Allow-Origin": "http://27.74.255.96:8089",
	}
})

instance.interceptors.request.use((config) =>{
	const localToken = getLocalToken()
	config.headers.Authorization = `Bearer ${localToken}`
	config.headers.common.Authorization = `Bearer ${localToken}`
	return config;
}, (error) => {
	return Promise.reject(error);
});

// post-response handling 401 error
// refreshing token and re-requesting
instance.interceptors.response.use((response) => {
    return response
}, error => {
	const originalRequest = error.config;
	if (error.response) {
		if (error.response.status === 401) {
			originalRequest._retry = true;
			getToken().then(token => {
				if (token) window.localStorage.setItem("token", token)
				return instance(originalRequest)
			})
		}
    } else {
        return Promise.reject(error)
    }
})

export default instance