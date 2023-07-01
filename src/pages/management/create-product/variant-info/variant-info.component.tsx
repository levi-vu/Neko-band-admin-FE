import { Button, Collapse, CollapseProps, Space } from "antd";
import { FormCreateProductType } from "../../../../models/types/form-create-product.type";
import { Language } from "../../../../assets/language/vietnam";
import { clearForm, updateProduct } from "../../../../store/update-product-slice";
import VariantInput from "./variant-input.component";
import VariantColor from "./variant-color.component";
import { useAppDispatch } from "../../../../store/store";
function VariantInfo({ form, moveNext, isUpdate }: FormCreateProductType & { isUpdate: boolean }) {
	const dispatch = useAppDispatch();

	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: Language.colorAndPattern,
			children: <VariantColor form={form}></VariantColor>,
		},
		{
			key: "2",
			label: Language.size,
			children: <VariantInput form={form}></VariantInput>,
		},
	];

	return (
		<>
			<Collapse items={items} defaultActiveKey={["1", "2"]}></Collapse>

			<Space className="variant-row">
				<Button size="large" onClick={() => moveNext(0)}>
					{Language.back}
				</Button>
				<Button
					size="large"
					onClick={() => {
						dispatch(clearForm("variant"));
					}}
				>
					{Language.reset}
				</Button>
				<Button
					type="primary"
					size="large"
					onClick={() => {
						form.validateFields().then(() => {
							dispatch(updateProduct(form));
						});
					}}
				>
					{isUpdate ? Language.update : Language.create}
				</Button>
			</Space>
		</>
	);
}

export default VariantInfo;
