import { Button, Popconfirm, Space } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { Language } from "../../../assets/language/vietnam";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../../../services/product-service";
import { useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { openUpdateProduct } from "../../../store/management-page-slice";

type ActionProductTableProps = {
	productId: number;
	name: string;
};
function ActionProductTable({ productId, name }: ActionProductTableProps) {
	const deleteProductMutation = useMutation({ mutationFn: deleteProduct });
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();

	const handleDelete = () => {
		setConfirmLoading(true);
		deleteProductMutation
			.mutateAsync(productId)
			.then((res) => {
				if (res.result) {
					setOpen(false);
					queryClient.invalidateQueries(["get-products"]);
				}
				setConfirmLoading(false);
			})
			.finally(() => {
				setConfirmLoading(false);
			});
	};
	return (
		<Space size="middle">
			<a>
				<Button onClick={() => dispatch(openUpdateProduct(productId))}>{Language.edit}</Button>
			</a>
			<Popconfirm
				icon={<DeleteFilled style={{ color: "blue" }} />}
				description={`${Language.confirmRemoveProduct}${name}`}
				okText="Yes"
				cancelText="No"
				open={open}
				okButtonProps={{ loading: confirmLoading }}
				onConfirm={handleDelete}
				onCancel={() => setOpen(false)}
				title={Language.removeProduct}
			>
				<Button danger onClick={() => setOpen(true)}>
					{Language.remove}
				</Button>
			</Popconfirm>
		</Space>
	);
}

export default ActionProductTable;
