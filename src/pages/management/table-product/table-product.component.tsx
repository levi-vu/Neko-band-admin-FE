import Table, { ColumnsType } from "antd/es/table";
import { Language } from "../../../assets/language/vietnam";
import { useQuery } from "react-query";
import Warning from "../../../components/warning/warning.component";
import { ProductItemTable, TableProducts } from "../../../models/interfaces/product/product-table";
import { getProducts } from "../../../services/product-service";
import { LoadingOutlined } from "@ant-design/icons";
import ActionProductTable from "./action.component";
import { useEffect, useState } from "react";

const columns: ColumnsType<ProductItemTable> = [
	{
		title: Language.images,
		dataIndex: "image",
		render: (_, record) => <img src={record.image} height={50} />,
		width: 100,
		key: "image",
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
	const [page, setPage] = useState(1);
	const { isLoading, error, data, refetch } = useQuery<TableProducts>(
		["get-products", page],
		async () => await getProducts(page).then((res) => res.result)
	);

	useEffect(() => {
		refetch();
	}, [page]);

	if (error) return <Warning />;
	return (
		<div className="table-product">
			<Table
				pagination={{ pageSize: 10, current: page, size: "small", total: data?.total }}
				size="small"
				columns={columns}
				dataSource={data?.products}
				rowKey={(record: ProductItemTable) => record.productId}
				loading={{ spinning: isLoading, indicator: <LoadingOutlined style={{ fontSize: 24 }} spin /> }}
				onChange={(page) => setPage(page.current!)}
			/>
		</div>
	);
}

export default TableProduct;
