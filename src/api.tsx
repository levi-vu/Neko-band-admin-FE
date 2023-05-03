import { TypeProduct } from "./models/interfaces/TypeProduct.";
import { Product } from "./models/interfaces/product.";
import { ResponseType } from "./models/interfaces/response.";
import httpHelper from "./utils/http-helper";

export const getProducts = async (): Promise<ResponseType<Product[]>> => {
  const response = await httpHelper.get<ResponseType<Product[]>>("product");
  return response.data;
};

export const getTypes = async (): Promise<ResponseType<TypeProduct[]>> => {
  const response = await httpHelper.get<ResponseType<TypeProduct[]>>("type");
  return response.data;
};

export const checkNewType = async (): Promise<ResponseType<boolean>> => {
  const response = await httpHelper.get<ResponseType<boolean>>("check-type");
  return response.data;
};
