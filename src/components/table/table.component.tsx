import { Table as TableAntd } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Product } from "../../models/interfaces/product.model";
import "./table.styles.scss";

type TableProps = {
  data: Product[] | undefined;
  columns: ColumnsType<Product>;
};
function Table({ data , columns }: TableProps) {
  //, onChange: TableProps<ProductType>['onChange']) {

  return (
    <TableAntd
      size='small'
      columns={columns}
      dataSource={data}
      rowKey={'id'}
      //onChange={onChange}
    />
  );
}

export default Table;
