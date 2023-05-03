import { ColumnsType } from "antd/es/table";
import Table from "../../../components/table/table.component";
import { Product } from "../../../models/interfaces/product.";
import { Language } from "../../../assets/language/vietnam";

type TableProductType = {
  products: Product[] | undefined;
  className: string;
};


const columns: ColumnsType<Product> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: Language.name,
    dataIndex: "name",
    key:"name"
  },
  {
    title: Language.type,
    dataIndex: "type",
    key: "type",
    render: (text, record) => record.types.map(type => type.typeName).join(', ')
  },
];
function TableProduct({ products, className }: TableProductType) {
  return (
    <div className={className}>
      <Table data={products} columns={columns}></Table>
    </div>
  );
}

export default TableProduct;
