export interface ProductItemTable {
    name: string;
    productId: number;
    productCode: string;
    category: string;
    source: string;
    price: string;
    description: string;
    modified: string;
    image: string;
    size: string;
}

export interface TableProducts {
    products: ProductItemTable[],
    total: number
}