import { Form, Button, Select, Row, Col, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Language } from "../../../../assets/language/vietnam";
import TagInput from "../../../../components/tag-input/tag-input.component";
import { FormCreateProductType } from "../../../../models/types/form-create-product.type";
import { AttributeOptions } from "../../../../utils/constants/attribute-options";
import { useDispatch } from "react-redux";
import FormValue from "../../../../models/interfaces/form-value.model";
import { clearForm, removeAttribute, setForm } from "../../../../store/create-product-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

function VariantForm({ form, moveNext }: FormCreateProductType) {
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.createProduct);
	form.setFieldsValue({ ...state });

	const options = AttributeOptions.filter((attribute) => {
		return state.attributes.length === 0 || (state.attributes && !state.attributes.some((item) => item.attribute === attribute.label));
	}).map((attribute) => (
		<Select.Option key={attribute.id} value={attribute.label}>
			{attribute.label}
		</Select.Option>
	));

	const handleChangeValue = () => {
		console.count('render');
		dispatch(setForm({ name: "attributes", value: form.getFieldValue("attributes") } as FormValue));
	};

	const actionRemove = (name: number, remove: (index: number | number[]) => void) => {
		dispatch(removeAttribute(name));
		remove(name);
	};

	const actionAdd = (add: () => void) => {
		add();
	};

	// const inputType = (type: string) => {
	// 	switch (type) {
	// 		case Language.color:
	// 			return (
	// 				<MultiSelect
	// 					isMultiSelect={true}
	// 					placeHolder={Language.selectType}
	// 					options={typeOptions}
	// 					updateOption={setTypeOptions}
	// 					text={Language.addNew}
	// 					existItemMessage={Language.existedOrEmpty}
	// 					onChange={(value) => {
	// 						const types = typeOptions?.filter((type) => _.includes(value, type.value)).map((type) => ({ typeId: type.value, typeName: type.label } as TypeProduct)) ?? [];
	// 						form.setFieldValue("typeIds", value);
	// 						form.setFieldValue("types", types);
	// 					}}
	// 				/>
	// 			);
	// 		case Language.size:
	// 			return "size";
	// 		default:
	// 			return <TagInput />;
	// 	}
	// };

	const validateTags = (value: string[]) => {
		if (!value || value.length === 0) {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const onSubmit = () => {
		//console.log(state);
	};

	return (
		<Form form={form} labelCol={{ span: 8 }} onFinish={onSubmit}>
			<Form.List name="attributes">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Row key={key} gutter={10}>
								<Col span={12}>
									<Form.Item
										label={Language.attribute}
										{...restField}
										name={[name, "attribute"]}
										rules={[{ required: true, message: Language.notAccessEmpty }]}
									>
										<Select notFoundContent={Language.empty} style={{ width: 150 }} onChange={handleChangeValue}>
											{options}
										</Select>
									</Form.Item>
								</Col>
								<Col span={10} style={{ marginLeft: "-80px" }}>
									<Form.Item
										label={Language.detail}
										{...restField}
										name={[name, "tags"]}
										rules={[{ required: true, message: Language.notAccessEmpty, validator: () => validateTags(state.attributes[name].tags) }]}
									>
										<TagInput onChange={handleChangeValue} disabled={form.getFieldValue("attributes")[name] === undefined} />
									</Form.Item>
								</Col>
								<Col>
									<Button type="primary" onClick={() => actionRemove(name, remove)}>
										{Language.remove}
									</Button>
								</Col>
							</Row>
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => actionAdd(add)} block icon={<PlusOutlined />}>
								{Language.addAttribute}
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item wrapperCol={{ offset: 18, span: 24 }}>
				<Space>
					<Button type="primary" htmlType="submit">
						{Language.create}
					</Button>
					<Button htmlType="button" onClick={() => dispatch(clearForm("variant"))}>
						{Language.reset}
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
}

export default VariantForm;
