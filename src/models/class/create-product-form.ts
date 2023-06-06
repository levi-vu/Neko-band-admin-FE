import { Source, TypeProduct } from "../interfaces/product-info.model";

export class CreateProductForm {
    id: number;
    name: string;
    price: number;
    costPrice: number;
    description: string;
    typeIds: number[];
    types: TypeProduct[];
    sourceId: number;
    source: Source | null;
    listUrlImage: string[];
    attributes: { attribute: string, tags: string[]}[]

    constructor(){
        this.id = 0;
        this.name = "";
        this.price = 0;
        this.costPrice = 0;
        this.description = "";
        this.typeIds = [];
        this.types = [];
        this.sourceId = 0;
        this.source = null;
        this.listUrlImage = [];
        this.attributes = [];
    }
}