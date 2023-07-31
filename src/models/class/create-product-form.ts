import { Source } from "../interfaces/product/product-side-info";

export class CreateProductForm {
    id: number;
    name: string;
    price: number;
    costPrice: number;
    description: string;
    categoryIds: number[];
    sourceId: number;
    source: Source | null;
    listUrlImage: string[];
    attributes: { attribute: string, tags: string[] }[]

    constructor() {
        this.id = 0;
        this.name = "";
        this.price = 0;
        this.costPrice = 0;
        this.description = "";
        this.categoryIds = [];
        this.sourceId = 0;
        this.source = null;
        this.listUrlImage = [];
        this.attributes = [];
    }
}