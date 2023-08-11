
import { UserRequest } from "../models/interfaces/user/user-request";
import { AxiosInstance } from "../utils/http-helper";

export const login = async (request: UserRequest): Promise<string> => {
    const response = await AxiosInstance.post<string>("login", request);
    return response.data;
};
