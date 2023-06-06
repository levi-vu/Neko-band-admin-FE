import { Button, Form, message, Space, Steps } from "antd";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { createProduct, getInitCreateInfo } from "../../../utils/api";
import { Language } from "../../../assets/language/vietnam";
import { ModalContext } from "../../../components/popup/popup.component";
import { CreateProductRequest, ProductInput, VariantInput } from "../../../models/interfaces/create-product.type";
import { FormOutlined, FileSearchOutlined } from "@ant-design/icons";
import "./create-product.styles.scss";
import { DefaultOptionType } from "antd/es/select";
import { useDispatch } from "react-redux";
import { clearForm } from "../../../store/create-product-slice";
import ProductForm from "./product-form/product-form.component";
import VariantForm from "./variant-form/variant-form.component";

function CreateProduct() {
	const [typeOptions, setTypeOptions] = useState<DefaultOptionType[]>([]);
	const [sourceOptions, setSourceOptions] = useState<DefaultOptionType[]>([]);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const closeModal = useContext(ModalContext);
	const queryClient = useQueryClient();
	const createProductMutation = useMutation({ mutationFn: createProduct });
	const { data: initInfo } = useQuery("getInitInfo", getInitCreateInfo, { cacheTime: 0 });
	const dispatch = useDispatch();
	const [productForm] = Form.useForm<ProductInput>();
	const [variantForm] = Form.useForm<VariantInput>();

	useEffect(() => {
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

	useEffect(() => {
		return () => {
			dispatch(clearForm('all'));
		};
	}, []);

	const onChangeStep = (value: number) => {
		if(value === 1){
			productForm.validateFields().then( () => setCurrentStep(value) , () => {});
		} else {
			variantForm.validateFields().then( () => setCurrentStep(value) , () => {});
		}
	};

	const onSubmit = async (request: CreateProductRequest) => {
		message.loading({ content: Language.loading, key: Language.create });
		console.log(request);
		// createProductMutation.mutateAsync(request).then((result) => {
		// 	if (!result.isSuccess) {
		// 		message.warning({ content: Language.createProductFailed, key: Language.create });
		// 	} else {
		// 		closeModal?.closeAction(false);
		// 		message.success({ content: Language.createProductSucceeded, key: Language.create });
		// 		queryClient.invalidateQueries(["get-products"]);
		// 	}
		// });
	};

	const forms = [
		<ProductForm key={0} form={productForm} moveNext={(step) => onChangeStep(step)} typeOptions={typeOptions} sourceOptions={sourceOptions} />,
		<VariantForm key={1} form={variantForm} moveNext={(step) => onChangeStep(step)} />,
	];
	return (
		<>
			<Steps
				type="navigation"
				items={[
					{
						title: Language.mainInfo,
						icon: <FormOutlined />,
					},
					{
						title: Language.attribute,
						icon: <FileSearchOutlined />,
					},
				]}
				current={currentStep}
				onChange={onChangeStep}
				className="steps"
			/>
			{forms[currentStep]}
		</>
	);
}

export default CreateProduct;
