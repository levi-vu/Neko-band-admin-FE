import { Button, Form, Input, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import type { FormInstance } from "antd/es/form";
import TextArea from "rc-textarea";
import type { SelectProps } from "antd";
import NumericInput from "../../../components/numeric-input/numeric-input.component";
import { useQuery } from "react-query";
import { getTypes } from "../../../api";
import { TypeProduct } from "../../../models/interfaces/TypeProduct.";
import Loading from "../../../components/loading/loading.component";
import Warning from "../../../components/warning/warning.component";
import "./create-product.styles.scss";
import MultiSelect from "../../../components/multi-select/multi-select.component";
import { MultiSelectItem } from "../../../models/interfaces/multi-select-item";
import { DefaultOptionType } from "antd/es/select";
import { Language } from "../../../assets/language/vietnam";

const { Option } = Select;

function CreateProduct() {
	const formRef = useRef<FormInstance>(null);
	const [typeOptions, setTypeOptions] = useState<DefaultOptionType[] | undefined>([]);
	console.count("app: ");

	const onReset = () => {
		formRef.current?.resetFields();
	};

	const onSubmit = (e: any) => {
		console.log(e);
	};

	const layout = {
		labelCol: { span: 4 },
	};

	return (
		<Form ref={formRef} {...layout} onFinish={onSubmit}>
			<Form.Item label={Language.name} name="name" rules={[{ required: true, message: Language.notAccessEmpty }]}>
				<Input />
			</Form.Item>

			<Form.Item label={Language.price} rules={[{ required: true }]}>
				<Form.Item name="price" className="price" rules={[{ required: true, message: Language.notAccessEmpty }]}>
					<NumericInput placeHoler={Language.sell} onChange={(value) => formRef.current?.setFieldValue("price", value)}  value={formRef.current?.getFieldValue('price')}/>
				</Form.Item>
				<Form.Item name="costPrice" className="source-price" rules={[{ required: true, message: Language.notAccessEmpty }]}>
					<NumericInput onChange={(value) => formRef.current?.setFieldValue("costPrice", value)} value={formRef.current?.getFieldValue('costPrice')} placeHoler={Language.capital} />
				</Form.Item>
			</Form.Item>

			<Form.Item label={Language.description} name="description">
				<TextArea />
			</Form.Item>

			<Form.Item label={Language.type} name="type">
				<MultiSelect placeHolder={Language.selectType} options={typeOptions} updateOption={setTypeOptions} text={Language.addNew} existItemMessage={Language.existed} />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					{Language.create}
				</Button>
				<Button htmlType="button" onClick={onReset}>
					{Language.reset}
				</Button>
			</Form.Item>
		</Form>
	);
}

export default CreateProduct;
