import { TypeProduct } from "./product-info.model";

export interface Product {
    id: number,
    name: string,
    types: TypeProduct[]
};
