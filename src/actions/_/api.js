import {axios} from "../../config/index";

export const addFolder = async (state) => {
	
	const url = `/api/offices`
	const response = await axios.post(url, state)
	if (!response.data.success) return;
}