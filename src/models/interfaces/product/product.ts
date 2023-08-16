import { Image } from "../image";
import { Status } from "../status";

export interface ProductInput {
    productId: number;
    productCode: string;
    name: string;
    price: string;
    costPrice: string;
    description: string;
    categoryId?: number;
    sourceId?: number;
    tags: string[]
}

export interface ProductVariant {
    colors: ProductColor[],
    variants: Variant[],
    size: string[],
}

export interface Variant {
    variantId: number;
    variantCode: string;
    variantName: string;
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: string;
    featureImage: string;
    productId: number
}


export interface ProductColor {
    colorName: string;
    featureImage: string;
    images: Image[];
    colorId: number;
}

export interface ProductState extends ProductInput, ProductVariant, Status { }

export interface ProductRequest extends ProductInput, ProductVariant { }
