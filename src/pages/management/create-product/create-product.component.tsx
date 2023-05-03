import { Button, Form, Input } from "antd";
import { useMemo, useState } from "react";
import TextArea from "rc-textarea";
import NumericInput from "../../../components/numeric-input/numeric-input.component";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TypeProduct } from "../../../models/interfaces/type-product.model.";
import Loading from "../../../components/loading/loading.component";
import Warning from "../../../components/warning/warning.component";
import "./create-product.styles.scss";
import MultiSelect from "../../../components/multi-select/multi-select.component";
import { DefaultOptionType } from "antd/es/select";
import { Language } from "../../../assets/language/vietnam";
import { CreateProductRequest } from "../../../models/interfaces/create-product.model";
import { useForm } from "antd/es/form/Form";
import { createProduct, getInitCreateInfo } from "../../../api";
import * as _ from "lodash";
import { Source } from "../../../models/interfaces/source.model";

const EmptyRule = [{ required: true, message: Language.notAccessEmpty }];

function CreateProduct() {
	const [form] = useForm<CreateProductRequest>();
	const queryClient = useQueryClient();
	const [typeOptions, setTypeOptions] = useState<DefaultOptionType[] | undefined>([]);
	const [sourceOptions, setSourceOptions] = useState<DefaultOptionType[] | undefined>([]);
	const { isLoading, error, data: initInfo } = useQuery("getInitInfo", getInitCreateInfo, {cacheTime: 0});
	const createProductMutation = useMutation( {mutationFn: createProduct , onSuccess: () => queryClient.invalidateQueries(['get-products'])});
	useMemo(() => {
		if (initInfo == undefined) {
			return;
		}

		const typeOptions = initInfo?.types?.map((type) => {
			return ({ value: type.typeId, label: type.typeName } as DefaultOptionType) ?? [];
		});

		const sourceOptions = initInfo?.sources?.map((source) => {
			return ({ value: source.sourceId, label: source.sourceName } as DefaultOptionType) ?? [];
		});
		setTypeOptions(typeOptions);
		setSourceOptions(sourceOptions);
	}, [initInfo]);

	if (isLoading) return <Loading />;

	if (error) return <Warning />;

	const onReset = () => {
		form.resetFields();
	};

	const onSubmit = async (request: CreateProductRequest) => {
		request.types = typeOptions?.filter((type) => _.includes(request.typeIds, type.value)).map((type) => ({ typeId: type.value, typeName: type.label } as TypeProduct)) ?? [];
		const sourceSelected = sourceOptions?.find((source) => request.sourceId == source.value);
		request.source = { sourceId: sourceSelected?.value, sourceName: sourceSelected?.label } as Source;
		const result = await createProductMutation.mutateAsync(request);
		console.log(result);
	};

	console.log(initInfo);
	console.count("render");

	return (
		<Form form={form} labelCol={{ span: 4 }} onFinish={onSubmit}>
			<Form.Item label={Language.name} name="name" rules={EmptyRule}>
				<Input />
			</Form.Item>

			<Form.Item label={Language.price} rules={[{ required: true }]}>
				<Form.Item name="price" className="price" rules={EmptyRule}>
					<NumericInput placeHoler={Language.sell} onChange={(value) => form.setFieldValue("price", value)} value={form.getFieldValue("price")} />
				</Form.Item>
				<Form.Item name="costPrice" className="source-price" rules={EmptyRule}>
					<NumericInput onChange={(value) => form.setFieldValue("costPrice", value)} value={form.getFieldValue("costPrice")} placeHoler={Language.capital} />
				</Form.Item>
			</Form.Item>

			<Form.Item label={Language.description} name="description">
				<TextArea />
			</Form.Item>
			<Form.Item label={Language.type} name="typeIds">
				<MultiSelect
					isMultiSelect={true}
					placeHolder={Language.selectType}
					options={typeOptions}
					updateOption={setTypeOptions}
					text={Language.addNew}
					existItemMessage={Language.existedOrEmpty}
					onChange={(value) => form.setFieldValue("typeIds", value)}
				/>
			</Form.Item>
			<Form.Item label={Language.source} name="sourceId">
				<MultiSelect
					isMultiSelect={false}
					placeHolder={Language.selectSource}
					options={sourceOptions}
					updateOption={setSourceOptions}
					text={Language.addNew}
					existItemMessage={Language.existedOrEmpty}
					onChange={(value) => form.setFieldValue("sourceId", value)}
				/>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 24 }}>
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
