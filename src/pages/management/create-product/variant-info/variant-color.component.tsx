import { Button, Form, FormInstance } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Language } from "../../../../assets/language/vietnam";
import { RootState, useAppDispatch } from "../../../../store/store";
import { ProductColor, ProductVariant } from "../../../../models/interfaces/product/product";
import UploadImage from "../../../../components/upload-image/upload-image.component";
import ImagePicker from "../../../../components/image-picker/index.component";
import InputWithDebounce from "../../../../components/input-debounce/input-debounce.component";
import { generateVariant, setInfoForm } from "../../../../store/update-product-slice";
import { Image } from "../../../../models/interfaces/image";
import { useEffect } from "react";

function VariantColor({ form }: { form: FormInstance<ProductVariant> }) {
	const dispatch = useAppDispatch();
	const state = useSelector((state: RootState) => state.updateProduct);
	useEffect(() => {
		form.setFieldValue("colors", state.colors);
	}, [state.colors.length]);

	const validateImages = (value: Image[]) => {
		if (!value || value.length === 0) {
			return Promise.reject();
		}
		return Promise.resolve();
	};

	const handlerAddColor = () => {
		const value = form.getFieldsValue();
		dispatch(generateVariant(state.size, [...value.colors, { colorName: "", featureImage: "#FFFFFF" } as ProductColor]));
	};
	const handlerDeleteColor = (remove: () => void) => {
		remove();
		const value = form.getFieldsValue();
		dispatch(generateVariant(state.size, value.colors));
	};

	const handleInputChange = () => {
		const formValue = form.getFieldsValue();
		dispatch(generateVariant(state.size, formValue.colors));
	};

	const saveState = () => {
		const formValue = form.getFieldsValue();
		dispatch(setInfoForm({ key: "colors", value: formValue.colors }));
	};
	return (
		<Form form={form}>
			<Form.List name="colors">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name }) => (
							<div key={key} className="row-item">
								<Form.Item style={{ minWidth: "160px" }} label={Language.colorAndPattern} name={[name, "featureImage"]}>
									<ImagePicker minMagnifier={40} maxMagnifier={200} onChange={saveState} />
								</Form.Item>

								<Form.Item
									label={Language.name}
									name={[name, "colorName"]}
									style={{ width: "200px" }}
									rules={[{ required: true, message: Language.notAccessEmpty }]}
								>
									<InputWithDebounce delayTime={500} onChange={handleInputChange} />
								</Form.Item>

								<Form.Item
									label={Language.images}
									name={[name, "images"]}
									rules={[{ required: true, message: Language.notAccessEmpty, validator: (_, value) => validateImages(value) }]}
								>
									<UploadImage onChange={saveState} preFix={state.productCode} />
								</Form.Item>

								<Button style={{ marginLeft: "auto" }} type="primary" onClick={() => handlerDeleteColor(() => remove(name))}>
									{Language.remove}
								</Button>
							</div>
						))}

						<Button type="dashed" onClick={handlerAddColor} block icon={<PlusOutlined />}>
							{Language.colorAndPattern}
						</Button>
					</>
				)}
			</Form.List>
		</Form>
	);
}

export default VariantColor;
