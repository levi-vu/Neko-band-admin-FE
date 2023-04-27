import { TypeProduct } from "./models/interfaces/TypeProduct.";
import { ProductType } from "./models/interfaces/product.";
import { ResponseType } from "./models/interfaces/response.";
import httpHelper from "./utils/http-helper";

export const getProducts = async (): Promise<ResponseType<ProductType[]>> => {
  const response = await httpHelper.get<ResponseType<ProductType[]>>("product");
  return response.data;
};

export const getTypes = async (): Promise<ResponseType<TypeProduct[]>> => {
  const response = await httpHelper.get<ResponseType<TypeProduct[]>>("type");
  return response.data;
};
