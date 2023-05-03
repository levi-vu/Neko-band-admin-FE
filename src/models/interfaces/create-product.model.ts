import { Source } from "./source.model";
import { TypeProduct } from "./type-product.model.";

export interface CreateProductRequest {
    id: number;
    name: string;
    price: number;
    costPrice: number;
    description: string;
    typeIds: number[];
    types: TypeProduct[];
    sourceId: number;
    source: Source;
}