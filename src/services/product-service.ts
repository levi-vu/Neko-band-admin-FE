import { Response } from "../models/interfaces/response.model";
import { InitCreateInfo } from "../models/interfaces/init-create-info";
import { Category, Source, Tag } from "../models/interfaces/product/product-side-info";
import { AxiosInstance } from "../utils/http-helper";
import { GeneralItem } from "../models/interfaces/general-item";
import { ProductRequest } from "../models/interfaces/product/product";
import { VariantSearchResult } from "../models/interfaces/variant/variant-search-result";
import { TableProducts } from "../models/interfaces/product/product-table";

export const getProducts = async (page: number): Promise<Response<TableProducts>> => {
	const response = await AxiosInstance.get<Response<TableProducts>>("product", { params: { page } });
	return response.data;
};

export const getInitCreateInfo = async (): Promise<InitCreateInfo> => {
	const response = await AxiosInstance.get<Response<InitCreateInfo>>("create/init-create-info");
	return response.data.result;
};

export const createProduct = async (request: ProductRequest): Promise<Response<number>> => {
	const response = await AxiosInstance.post<Response<number>>("product/update", { ...request });
	return response.data;
};

export const deleteProduct = async (productId: number): Promise<Response<boolean>> => {
	const response = await AxiosInstance.post<Response<boolean>>("product/delete", { id: productId });
	return response.data;
};

export const getProduct = async (productId: number): Promise<Response<ProductRequest>> => {
	const response = await AxiosInstance.post<Response<ProductRequest>>('product/get-by-id', { id: productId });
	return response.data;
};

export const createCategory = async (categoryName: string): Promise<GeneralItem> => {
	const request = {
		CategoryName: categoryName,
		CategoryId: 0,
	};
	const response = await AxiosInstance.post<Response<Category>>("create/update-category", request);
	return { id: response.data.result.categoryId, name: response.data.result.categoryName };
};

export const createSource = async (sourceName: string): Promise<GeneralItem> => {
	const request = {
		sourceName,
		sourceId: 0,
	};
	const response = await AxiosInstance.post<Response<Source>>("create/update-source", request);
	return { id: response.data.result.sourceId, name: response.data.result.sourceName };
};

export const createTag = async (name: string): Promise<GeneralItem> => {
	const request = {
		tagName: name,
		tagId: 0,
	};
	const response = await AxiosInstance.post<Response<Tag>>("create/update-tag", request);
	return { id: response.data.result.tagId, name: response.data.result.tagName };
};

export const checkNewType = async (): Promise<Response<boolean>> => {
	const response = await AxiosInstance.get<Response<boolean>>("check-type");
	return response.data;
};

export const getVariantByText = async (searchText: string, isGetall: boolean): Promise<Response<VariantSearchResult>> => {
	const response = await AxiosInstance.get<Response<VariantSearchResult>>(`variant`, { params: { searchText, isGetall } });
	return response.data;
};
