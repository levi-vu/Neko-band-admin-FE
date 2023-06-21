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
    images: Image[];
}


export interface VariantInput {
    attributes: Attribute[]
}

export interface Attribute {
    name: string;
    tags: string[]
}

export interface Image {
    name: string;
    url: string;
    base64: string;
}

export interface CreateProductRequest extends ProductInput, VariantInput { }