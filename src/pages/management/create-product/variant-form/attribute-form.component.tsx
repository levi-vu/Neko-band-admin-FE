import { Button, Col, Form, FormInstance, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Language } from "../../../../assets/language/vietnam";
import TagInput from "../../../../components/tag-input/tag-input.component";
import FormValue from "../../../../models/interfaces/form-value.model";
import { setForm, removeAttribute } from "../../../../store/create-product-slice";
import { RootState } from "../../../../store/store";
import { AttributeOptions } from "../../../../utils/constants/attribute-options";
import { VariantInput } from "../../../../models/interfaces/create-product.type";

function AttributeForm({ form }: { form: FormInstance<VariantInput> }) {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.createProduct);
	form.setFieldsValue({ ...state });

	const options = AttributeOptions.filter((attribute) => {
		return state.attributes.length === 0 || (state.attributes && !state.attributes.some((item) => item?.name === attribute.label));
	}).map((attribute) => (
		<Select.Option key={attribute.id} value={attribute.label}>
			{attribute.label}
		</Select.Option>
	));

	const handleChangeValue = () => {
		dispatch(setForm({ name: "attributes", value: form.getFieldValue("attributes") } as FormValue));
	};

	const actionRemove = (name: number, remove: (index: number | number[]) => void) => {
		dispatch(removeAttribute(name));
		remove(name);
	};

	const validateTags = (value: string[]) => {
		if (!value || value.length === 0) {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	return (
		<Form form={form} labelCol={{ span: 8 }}>
			<Form.List name="attributes">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Row key={key} gutter={10}>
								<Col span={9}>
									<Form.Item
										label={Language.attribute}
										{...restField}
										name={[name, "name"]}
										rules={[{ required: true, message: Language.notAccessEmpty }]}
									>
										<Select notFoundContent={Language.empty} style={{ width: 150 }} onChange={handleChangeValue}>
											{options}
										</Select>
									</Form.Item>
								</Col>
								<Col span={15} style={{ marginLeft: "-80px" }}>
									<Form.Item
										label={Language.detail}
										{...restField}
										name={[name, "tags"]}
										rules={[{ required: true, message: Language.notAccessEmpty, validator: () => validateTags(state.attributes[name]?.tags) }]}
									>
										<TagInput
											value={form.getFieldValue("attributes")[name]?.tags}
											onChange={handleChangeValue}
											disabled={form.getFieldValue("attributes")[name] === undefined}
										/>
									</Form.Item>
								</Col>
								<Col>
									<Button type="primary" onClick={() => actionRemove(name, remove)}>
										{Language.remove}
									</Button>
								</Col>
							</Row>
						))}
						<Form.Item hidden={fields.length === AttributeOptions.length}>
							<Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
								{Language.addAttribute}
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
		</Form>
	);
}

export default AttributeForm;
