import axios, { AxiosResponse } from "axios";

const baseURL = "https://localhost:8080/api";
//const baseURL = "https://localhost:7139/api";

export function PostJson<T>(url: string, object: object): Promise<AxiosResponse<T, any>> {
	const body = JSON.stringify(object);

	return axios
		.create({
			baseURL: baseURL,
			headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json" },
			withCredentials: true,
		})
		.post<T>(url, body);
}

export function Get<T>(url: string): Promise<AxiosResponse<T, any>> {
	return axios.create({ baseURL: baseURL }).get<T>(url);
}

export function GetWithParams<T>(url: string, object: object): Promise<AxiosResponse<T, any>> {
	//const params = JSON.stringify(object);
	return axios.create({ baseURL: baseURL }).get<T>(url, { params: object });
}
