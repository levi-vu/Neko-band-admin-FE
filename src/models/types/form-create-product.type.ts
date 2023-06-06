
import { FormInstance } from "antd";
import { DefaultOptionType } from 'antd/es/select';

export type FormCreateProductType = { form: FormInstance<any>, moveNext: (step: number) => void; };

export type ProductFormType = FormCreateProductType & {
    typeOptions: DefaultOptionType[],
    sourceOptions: DefaultOptionType[]
}