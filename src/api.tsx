import { TypeProduct } from "./types/TypeProduct.type";
import { ProductType } from "./types/product.type";
import { ResponseType } from "./types/response.type";
import httpHelper from "./utils/http-helper";

export const getProducts = async (): Promise<ResponseType<ProductType[]>> => {
  const response = await httpHelper.get<ResponseType<ProductType[]>>("product");
  return response.data;
};

export const getTypes = async (): Promise<ResponseType<TypeProduct[]>> => {
  const response = await httpHelper.get<ResponseType<TypeProduct[]>>("type");
  return response.data;
};
