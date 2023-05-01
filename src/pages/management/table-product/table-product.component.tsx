import Table from "../../../components/table/table.component";
import { Product } from "../../../models/interfaces/product.";

type TableProductType = {
  products: Product[] | undefined;
};
function TableProduct({ products }: TableProductType) {
  return <Table data={products}></Table>;
}

export default TableProduct;
