import { Table as TableAntd } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ProductType } from "../../types/product.type";
import './table.styles.scss';

const columns: ColumnsType<ProductType> = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Type",
    dataIndex: "typeId",
    sorter: {
      compare: (first: ProductType, second: ProductType) => first.type.localeCompare(second.type),
      multiple: 1,
    },
  },
];

type TableProps = {
  data: ProductType[];
};
function Table({ data }: TableProps) {
  //, onChange: TableProps<ProductType>['onChange']) {

  return (
    <TableAntd
      size="middle"
      columns={columns}
      dataSource={data}
    
      //onChange={onChange}
    />
  );
}

export default Table;
