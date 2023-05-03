import { ColumnsType } from "antd/es/table";
import Table from "../../../components/table/table.component";
import { Product } from "../../../models/interfaces/product.model";
import { Language } from "../../../assets/language/vietnam";
import { useQuery } from "react-query";
import Loading from "../../../components/loading/loading.component";
import Warning from "../../../components/warning/warning.component";
import { getProducts } from "../../../api";
import { Response } from "../../../models/interfaces/response.model";

type TableProductType = {
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
		key: "name",
	},
	{
		title: Language.type,
		dataIndex: "type",
		key: "type",
		render: (text, record) => record.types.map((type) => type.typeName).join(", "),
	},
];
function TableProduct({ className }: TableProductType) {
	const { isLoading, error, data } = useQuery<Product[]>("get-products", async () => await getProducts().then((res) => res.result));

	if (isLoading) return <Loading />;

	if (error) return <Warning />;
	return (
		<div className={className}>
			<Table data={data} columns={columns}></Table>
		</div>
	);
}

export default TableProduct;
