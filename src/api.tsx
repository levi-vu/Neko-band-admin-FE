import { Product } from "./models/interfaces/product.model";
import { Response } from "./models/interfaces/response.model";
import httpHelper from "./utils/http-helper";
import { InitCreateInfo } from "./models/interfaces/init-create-info.model";
import { CreateProductRequest } from "./models/interfaces/create-product.model";

export const getProducts = async (): Promise<Response<Product[]>> => {
  const response = await httpHelper.get<Response<Product[]>>("product");
  return response.data;
};

export const getInitCreateInfo = async (): Promise<InitCreateInfo> => {
   const response = await httpHelper.get<Response<InitCreateInfo>>("create/init-create-info");
   return response.data.result;
};

export const createProduct = async (request: CreateProductRequest): Promise<Response<Product>> => {
  const response = await httpHelper.post<Response<Product>>("product", request);
  return response.data;
};


export const checkNewType = async (): Promise<Response<boolean>> => {
  const response = await httpHelper.get<Response<boolean>>("check-type");
  return response.data;
};
