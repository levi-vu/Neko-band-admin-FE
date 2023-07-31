
import { FormInstance } from "antd";

export type FormCreateProductType = { form: FormInstance<any>, moveNext: (step: number) => void; };