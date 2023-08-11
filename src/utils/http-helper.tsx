import axios from "axios";
import { message } from "antd";
import { Language } from "../assets/language/vietnam";
import { redirect } from "react-router-dom";

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
			if (response.status === 401) {
				messageBox.error({ content: Language.SessionExpired, key: "need-re-login" });
				redirect("/login");
				return response;
			}
			return Promise.reject(error);
		}
	);
};
