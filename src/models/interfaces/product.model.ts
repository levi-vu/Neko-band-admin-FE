import { TypeProduct } from './type-product.model.';
export interface Product {
    id: number,
    name: string,
    types: TypeProduct[]
};
