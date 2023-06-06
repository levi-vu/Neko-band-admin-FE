import { Color, Source, TypeProduct } from "./product-info.model";

export interface InitCreateInfo {
    types: TypeProduct[],
    sources: Source[],
    color: Color[],
   // size: size[]
}