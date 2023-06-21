import { Row, Col, Form, Input, Space, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { setForm, setImage, removeImage, clearForm } from "../../../../store/create-product-slice";
import { ProductFormType } from "../../../../models/types/form-create-product.type";
import { Language } from "../../../../assets/language/vietnam";
import MultiSelect from "../../../../components/multi-select/multi-select.component";
import NumericInput from "../../../../components/numeric-input/numeric-input.component";
import UploadImage from "../../../../components/upload-image/upload-image.component";
import { RootState } from "../../../../store/store";
import FormValue from "../../../../models/interfaces/form-value.model";
import { Image } from "../../../../models/interfaces/create-product.type";
import { useQueryClient } from "react-query";

const EmptyRule = [{ required: true, message: Language.notAccessEmpty }];

function ProductForm({ form, moveNext, typeOptions, sourceOptions }: ProductFormType) {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const state = useSelector((state: RootState) => state.createProduct);
	form.setFieldsValue({ ...state });

	const handleImage = (base64: string, name: string, isRemove = false) => {
		if (isRemove) {
			dispatch(removeImage(name));
		} else {
			dispatch(setImage({ base64, name } as Image));
		}
	};

	const handleChangeValue = (name: string, value: string | string[]) => {
		dispatch(setForm({ name, value } as FormValue));
	};

	return (
		<Form form={form} labelCol={{ span: 8, offset: 1 }} onFinish={() => moveNext(1)}>
			<Row gutter={[8, 8]}>
				<Col span={8}>
					<Form.Item label={Language.productId} name="productCode" rules={EmptyRule}>
						<Input onBlur={(e) => handleChangeValue("productCode", e.target.value)} />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.type} name="typeIds">
						<MultiSelect
							value={form.getFieldValue("typeIds")}
							isMultiSelect={true}
							placeHolder={Language.selectType}
							options={typeOptions}
							onChange={(value) => handleChangeValue("typeIds", value)}
						/>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item label={Language.source} name="sourceId">
						<MultiSelect
							value={form.getFieldValue("sourceId")}
							placeHolder={Language.selectSource}
							options={sourceOptions}
							onChange={(value) => handleChangeValue("sourceId", value)}
						/>
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={Language.name} name="name" rules={EmptyRule}>
						<Input onBlur={(e) => handleChangeValue("name", e.target.value)} />
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={Language.price} name="price" rules={EmptyRule}>
						<NumericInput isCurrency={true} onChange={(value) => handleChangeValue("price", value)} value={form.getFieldValue("price")} />
					</Form.Item>
				</Col>

				<Col span={8}>
					<Form.Item label={Language.costPrice} name="costPrice" rules={EmptyRule}>
						<NumericInput isCurrency={true} onChange={(value) => handleChangeValue("costPrice", value)} value={form.getFieldValue("costPrice")} />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item labelCol={{ span: 3 }} label={Language.images} name="images">
						<UploadImage
							images={form.getFieldValue("images")}
							setImage={handleImage}
							removeImage={(base64: string, name: string) => handleImage(base64, name, true)}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item labelCol={{ span: 3 }} label={Language.description} name="description">
						<TextArea onBlur={(e) => handleChangeValue("description", e.target.value)} size="large" style={{ width: 300 }} />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item wrapperCol={{ offset: 18, span: 24 }}>
				<Space>
					<Button type="primary" htmlType="submit">
						{Language.next}
					</Button>
					<Button htmlType="button" onClick={() => dispatch(clearForm("product"))}>
						{Language.reset}
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
}

export default ProductForm;
