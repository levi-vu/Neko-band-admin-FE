import { Source } from "./source.model";
import { TypeProduct } from "./type-product.model.";

export interface InitCreateInfo {
    types: TypeProduct[],
    sources: Source[],
}