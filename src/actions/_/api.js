import {axios} from "../../config/index";

export const getOfficeTypes = async () => {
	
	const url = `/api/officeTypes`
	const response = await axios.get(url)
	if (!response.data.success) return alert(response.data.message);
	return response
}

export const addOffice = async (state) => {
	
	const url = `/api/offices`
	const response = await axios.post(url, state)
	if (!response.data.success) return alert(response.data.message)
}

export const editOffice = async (state) => {
	
	const url = `/api/offices/${state.id}`
	const response = await axios.put(url, state)

	if(!response.data.success) return alert(response.data.message);
}

export const deleteOffice = async (id) => {
	
	const url = `/api/offices/${id}`
	const response = await axios.delete(url)
	if (!response.data.success) return alert(response.data.message)
}