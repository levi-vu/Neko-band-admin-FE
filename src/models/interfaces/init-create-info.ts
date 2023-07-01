import { Source, Tag, Category } from "./product/product-side-info";

export interface InitCreateInfo {
    categories: Category[],
    sources: Source[],
    tags: Tag[]
}