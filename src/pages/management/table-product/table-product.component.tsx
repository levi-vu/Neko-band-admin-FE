import Table, { ColumnsType } from "antd/es/table";
import { Language } from "../../../assets/language/vietnam";
import { useQuery } from "react-query";
import Warning from "../../../components/warning/warning.component";
import { ProductItemTable } from "../../../models/interfaces/product/product-item-table";
import { getProducts } from "../../../services/product-service";
import { LoadingOutlined } from "@ant-design/icons";
import ActionProductTable from "./action.component";

const columns: ColumnsType<ProductItemTable> = [
	{
		title: Language.images,
		dataIndex: "image",
		render: (_, record) => <img src={record.image} width={80} />,
		width: 100,
	},
	{
		title: Language.code,
		dataIndex: "productCode",
		key: "code",
	},
	{
		title: Language.name,
		dataIndex: "name",
		key: "name",
	},
	{
		title: Language.costPrice,
		dataIndex: "costPrice",
		key: "costPrice",
	},
	{
		title: Language.price,
		dataIndex: "price",
		key: "price",
	},
	{
		title: Language.source,
		dataIndex: "source",
		key: "source",
	},
	{
		title: Language.size,
		render: (_, record) => record.size.replaceAll("|", "-"),
		key: "size",
	},
	{
		title: Language.type,
		dataIndex: "category",
		key: "category",
	},
	{
		title: Language.modifiedDate,
		key: "created",
		render: (_, record) => {
			const date = new Date(record.modified);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
		},
	},
	{
		title: Language.action,
		key: "action",
		render: (_, record) => <ActionProductTable productId={record.productId} name={record.name} />,
	},
];
function TableProduct() {
	const { isLoading, error, data } = useQuery<ProductItemTable[]>("get-products", async () => await getProducts().then((res) => res.result), {
		retry: false,
	});

	if (error) return <Warning />;
	return (
		<div className="table-product">
			<Table
				size="small"
				columns={columns}
				dataSource={data}
				rowKey={(record: ProductItemTable) => record.productCode}
				loading={{ spinning: isLoading, indicator: <LoadingOutlined style={{ fontSize: 24 }} spin /> }}
			/>
		</div>
	);
}

export default TableProduct;
