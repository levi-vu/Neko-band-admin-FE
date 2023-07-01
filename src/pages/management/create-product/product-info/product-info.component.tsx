import { Row, Col, Form, Input, Space, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { Language } from "../../../../assets/language/vietnam";
import MultiSelect from "../../../../components/multi-select/multi-select.component";
import NumericInput from "../../../../components/numeric-input/numeric-input.component";
import { RootState } from "../../../../store/store";
import ProductTags from "./product-tag.component";
import CreateSelect from "../../../../components/create-select/create-select";
import { FormCreateProductType } from "../../../../models/types/form-create-product.type";
import { OptionKey } from "../../../../shared/constants/option-key";
import { ValidateAscent } from "../../../../shared/functions/remove-accent";
const EmptyRule = { required: true, message: Language.notAccessEmpty };
const NumberRule = { required: true, message: Language.mustGreaterThanZero };

function MainProductInfo({ form, moveNext }: FormCreateProductType) {
	const optionState = useSelector((state: RootState) => state.ManagementPage);

	const validateNumber = (value: string) => {
		if (value === "0") {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const validateProductCode = (value: string) => {
		if (value?.includes(" ")) {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const ValidateProductCodeAscent = (value: string) => {
		if (ValidateAscent(value)) {
			return Promise.reject();
		}
		return Promise.resolve();
	};
	return (
		<Form form={form} labelCol={{ span: 8 }} onFinish={() => moveNext(1)}>
			<Row gutter={[8, 8]}>
				<Col span={8}>
					<Form.Item
						label={Language.productId}
						name="productCode"
						rules={[
							{ ...EmptyRule },
							{ validator: (_, value: string) => validateProductCode(value), message: Language.includeSpace },
							{ validator: (_, value: string) => ValidateProductCodeAscent(value), message: Language.notAccessAccent },
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.type} name="categoryId" rules={[EmptyRule]}>
						<MultiSelect
							placeHolder={Language.selectCategory}
							options={optionState.CategoryOptions}
							addItemNode={
								<CreateSelect
									options={optionState.CategoryOptions.map((c) => c.label as string)}
									title={Language.addCategory}
									selectKey={OptionKey.categoryKey}
								/>
							}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.source} name="sourceId" rules={[EmptyRule]}>
						<MultiSelect
							placeHolder={Language.selectSource}
							options={optionState.SourceOptions}
							addItemNode={
								<CreateSelect
									options={optionState.SourceOptions.map((c) => c.label as string)}
									title={Language.addSource}
									selectKey={OptionKey.sourceKey}
								/>
							}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.name} name="name" rules={[EmptyRule]}>
						<Input />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.costPrice} name="costPrice" rules={[{ ...NumberRule, validator: (_, value: string) => validateNumber(value) }]}>
						<NumericInput isCurrency={true} />
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={Language.price} name="price" rules={[{ ...NumberRule, validator: (_, value: string) => validateNumber(value) }]}>
						<NumericInput isCurrency={true} />
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={Language.description} name="description">
						<TextArea size="large" style={{ width: 300 }} />
					</Form.Item>
				</Col>

				<Col span={16}>
					<ProductTags tags={optionState.TagOptions} />
				</Col>
			</Row>
			<Form.Item wrapperCol={{ offset: 18, span: 24 }}>
				<Space>
					<Button htmlType="button" onClick={() => form.resetFields()}>
						{Language.reset}
					</Button>
					<Button type="primary" onClick={() => moveNext(1)}>
						{Language.next}
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
}

export default MainProductInfo;
