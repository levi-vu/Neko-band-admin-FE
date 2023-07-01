import { Button, Form } from "antd";
import { Language } from "../../../../assets/language/vietnam";
import { PlusOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";
import SelectTags from "./select-tag.component";

function ProductTags({ tags }: { tags: DefaultOptionType[] }) {
	const formItemLayout = {
		labelCol: {
			xs: { span: 22 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 20 },
			sm: { span: 16 },
		},
	};
	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 22, offset: 0 },
			sm: { span: 16, offset: 4 },
		},
	};

	const validateTag = (value: string) => {
		if (value === undefined) {
			return Promise.reject();
		}
		const tagValue = value.split(": ");

		if (tagValue[0] === "") {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const validateTagDetail = (value: string) => {
		const tagValue = value.split(": ");

		if (tagValue[1] === "") {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	return (
		<Form.List name="tags">
			{(fields, { add, remove }) => (
				<>
					{fields.map((field, index) => (
						<Form.Item
							{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
							label={index === 0 ? Language.tag : ""}
							required={true}
							key={field.key}
						>
							<Form.Item
								rules={[
									{
										message: Language.emptyTag,
										validator: (_, value: string) => validateTag(value),
									},
									{
										message: Language.emptyTagDetail,
										validator: (_, value: string) => validateTagDetail(value),
									},
								]}
								name={[index]}
								noStyle
							>
								<SelectTags tags={tags} remove={remove} index={field.name} />
							</Form.Item>
						</Form.Item>
					))}
					<Form.Item {...formItemLayoutWithOutLabel}>
						<Button type="dashed" onClick={() => add()} style={{ width: "60%" }} icon={<PlusOutlined />}>
							{Language.addTag}
						</Button>
					</Form.Item>
				</>
			)}
		</Form.List>
	);
}

export default ProductTags;
