import { Button, Col, Form, FormInstance, Input, InputNumber } from "antd";
import { ProductVariant, Variant } from "../../../../models/interfaces/product/product";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store/store";
import { Language } from "../../../../assets/language/vietnam";
import TagInput from "../../../../components/tag-input/tag-input.component";
import { generateVariant, setInfoForm } from "../../../../store/update-product-slice";
import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { ValidateAscent } from "../../../../shared/functions/remove-accent";

function VariantInput({ form }: { form: FormInstance<ProductVariant> }) {
	const state = useSelector((state: RootState) => state.updateProduct);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const oldVariant = form.getFieldValue("variants") as Variant[];
		const variants = cloneDeep(state.variants);
		variants?.forEach((variant) => {
			variant.variantCode = `${state.productCode}${variant.color[0] ?? ""}${variant.size[0] ?? ""}`;
			variant.quantity = oldVariant.find((i) => i.variantName === variant.variantName)?.quantity ?? 0;
			variant.price = state.price;
		});
		form.setFieldValue("variants", variants);
	}, [state.variants]);

	const handlerRemoveItem = (index: number) => {
		const item = [...state.variants];
		item.splice(index, 1);
		dispatch(setInfoForm({ value: item, key: "variants" }));
	};

	const validateSizes = (value: string[]) => {
		if (!value || value.length === 0) {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const validateAccent = (values: string[]) => {
		let failedValidate = false;
		values.forEach((value) => {
			if (ValidateAscent(value)) {
				failedValidate = true;
			}
		});

		if (failedValidate) {
			return Promise.reject();
		}

		return Promise.resolve();
	};

	return (
		<Form form={form}>
			<Form.Item
				name="size"
				label={Language.size}
				rules={[
					{ message: Language.notAccessEmpty, validator: (_, value) => validateSizes(value) },
					{
						message: Language.notAccessAccent,
						validator: (_, value) => validateAccent(value),
					},
				]}
			>
				<TagInput onChange={(e) => dispatch(generateVariant(e, state.colors, true))} upper={true} />
			</Form.Item>

			<Form.List name="variants">
				{(fields) => (
					<>
						{fields.map(({ key, name }) => (
							<div className="row-item" key={key}>
								<Col span={8}>
									<Form.Item>
										<span>{Language.name}:&nbsp;</span>
										<span className="variant-name">
											{state.name}-{form.getFieldValue("variants")[name].variantName}
										</span>
									</Form.Item>
								</Col>
								<Form.Item label={Language.code} name={[name, "variantCode"]} rules={[{ required: true, message: Language.notAccessEmpty }]}>
									<Input />
								</Form.Item>
								<Form.Item label={Language.quantity} name={[name, "quantity"]}>
									<InputNumber min={0} />
								</Form.Item>
								<Form.Item>
									<Button style={{ marginLeft: "auto" }} type="primary" onClick={() => handlerRemoveItem(name)}>
										{Language.remove}
									</Button>
								</Form.Item>
							</div>
						))}
					</>
				)}
			</Form.List>
		</Form>
	);
}

export default VariantInput;
