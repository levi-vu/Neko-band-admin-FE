import { Table as TableAntd } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LoadingOutlined } from '@ant-design/icons';
import { Product } from "../../models/interfaces/product.model";
import "./table.styles.scss";

type TableProps = {
  data: Product[] | undefined;
  columns: ColumnsType<Product>;
  isLoading: boolean;
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function Table({ data , columns, isLoading }: TableProps) {
  //, onChange: TableProps<ProductType>['onChange']) {

  return (
    <TableAntd
      size='small'
      columns={columns}
      dataSource={data}
      rowKey={'id'}
      loading= {{spinning: isLoading, indicator: antIcon}}

      //onChange={onChange}
    />
  );
}

export default Table;
