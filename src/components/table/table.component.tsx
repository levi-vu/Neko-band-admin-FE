import { Table as TableAntd } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../../models/interfaces/product.";
import "./table.styles.scss";

const columns: ColumnsType<Product> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key:"name"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (text, record) => record.types.map(type => type.typeName).join(', ')
  },
];

type TableProps = {
  data: Product[] | undefined;
};
function Table({ data }: TableProps) {
  //, onChange: TableProps<ProductType>['onChange']) {

  return (
    <TableAntd
      size='middle'
      columns={columns}
      dataSource={data}

      //onChange={onChange}
    />
  );
}

export default Table;
