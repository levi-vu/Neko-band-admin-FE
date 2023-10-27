import axios from "axios";
import { message } from "antd";
import { Language } from "../assets/language/vietnam";

const messageBox = message;

const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:5183/api";

export const AxiosInstance = axios.create({
	baseURL,
	headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json" },
});

AxiosInstance.defaults.withCredentials = true;

export const setAxiosInterceptors = () => {
	AxiosInstance.interceptors.response.use(
		(response) => response,
		(error) => {
			const { response } = error;
			if (typeof response === "undefined" || response.status === 500 || response.status === 404) {
				messageBox.error({ content: Language.occurError, key: "error", duration: 60000 });
				return response;
			}
			return Promise.reject(error);
		}
	);
};
