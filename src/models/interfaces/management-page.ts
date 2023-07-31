import { DefaultOptionType } from "antd/es/select";

export interface ManagementPage {
    SourceOptions: DefaultOptionType[],
    CategoryOptions: DefaultOptionType[],
    TagOptions: DefaultOptionType[],
    isOpen: boolean,
    productId: number
}