import { Source, TypeProduct } from "./product-info.model";

export interface ProductInput {
    id: number;
    productCode: string;
    name: string;
    price: number;
    costPrice: number;
    description: string;
    typeIds: number[];
    types: TypeProduct[];
    sourceId: number;
    source: Source | null;
    listUrlImage: string[];
}


export interface VariantInput {
    attributes: { attribute: string, tags: string[]}[]
}

export interface CreateProductRequest extends ProductInput , VariantInput {}