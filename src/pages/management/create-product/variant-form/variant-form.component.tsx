import { Button, Space } from "antd";
import { FormCreateProductType } from "../../../../models/types/form-create-product.type";
import AttributeForm from "./attribute-form.component";
import { Language } from "../../../../assets/language/vietnam";
import { useDispatch, useSelector } from "react-redux";
import { clearForm } from "../../../../store/create-product-slice";
import VariantInput from "./variant-input.component";
import { RootState } from "../../../../store/store";

function VariantForm({ form, moveNext }: FormCreateProductType) {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.createProduct);
	return (
		<>
			<AttributeForm form={form}></AttributeForm>
			<VariantInput form={form} attributes={state.attributes}></VariantInput>
			<Space style={{ display: "flex", justifyContent: "flex-end" }}>
				<Button type="primary" onClick={() => form.submit()}>
					{Language.create}
				</Button>
				<Button htmlType="button" onClick={() => dispatch(clearForm("variant"))}>
					{Language.reset}
				</Button>
			</Space>
		</>
	);
}

export default VariantForm;
