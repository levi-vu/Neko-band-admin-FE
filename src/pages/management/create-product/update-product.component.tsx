import { Form, message, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Language } from "../../../assets/language/vietnam";
import { ModalContext } from "../../../components/popup/popup.component";
import { ProductInput, ProductVariant } from "../../../models/interfaces/product/product";
import { FormOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { clearForm, fetchProductById, setProductInputForm, setVariantForm } from "../../../store/update-product-slice";
import MainProductInfo from "./product-info/product-info.component";
import VariantInfo from "./variant-info/variant-info.component";
import { RootState, useAppDispatch } from "../../../store/store";
import Loading from "../../../components/loading/loading.component";

function CreateProduct({ id }: { id: number }) {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const closeModal = useContext(ModalContext);
	const queryClient = useQueryClient();
	const [productForm] = Form.useForm<ProductInput>();
	const [variantForm] = Form.useForm<ProductVariant>();
	const state = useSelector((state: RootState) => state.updateProduct);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id > 0) {
			dispatch(fetchProductById({ productId: id, productForm: productForm }));
		}
		return () => {
			dispatch(clearForm("all"));
		};
	}, []);

	useEffect(() => {
		if (state.isSuccess) {
			closeModal?.closeAction();
			message.success({ content: state.productId > 0 ? Language.updateProductSucceeded : Language.createProductSucceeded, key: Language.create });
			queryClient.invalidateQueries(["get-products"]);
		}

		if (state.isError) {
			message.error({ content: state.productId > 0 ? Language.updateProductFailed : Language.createProductFailed, key: Language.update });
		}
	}, [state.isSuccess, state.isError]);

	const onChangeStep = (value: number) => {
		if (value === 1) {
			productForm.validateFields().then(
				() => {
					dispatch(setProductInputForm(productForm.getFieldsValue()));
					variantForm.setFieldsValue({ ...state });
					setCurrentStep(value);
				},
				() => {}
			);
		} else {
			variantForm.validateFields().then(
				() => {
					dispatch(setVariantForm(variantForm.getFieldsValue()));
					productForm.setFieldsValue({ ...state });
					setCurrentStep(value);
				},
				() => {}
			);
		}
	};

	const forms = [
		<MainProductInfo key={0} form={productForm} moveNext={(step) => onChangeStep(step)} />,
		<VariantInfo key={1} form={variantForm} moveNext={(step) => onChangeStep(step)} isUpdate={state.productId > 0} />,
	];
	return (
		<>
			<Loading isLoading={state.isLoading} isError={state.isError}>
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
			</Loading>
		</>
	);
}

export default CreateProduct;
