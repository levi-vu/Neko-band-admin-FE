import { Variant } from "../product/product";

export interface VariantSearchResult {
    variants: Variant[],
    totalResults: number
}