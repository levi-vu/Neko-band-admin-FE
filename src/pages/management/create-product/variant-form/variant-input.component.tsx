import { Attribute, Image } from "../../../../models/interfaces/create-product.type";
import NumericInput from "../../../../components/numeric-input/numeric-input.component";
import { Col, Form, FormInstance, Input, InputNumber, Row } from "antd";
import "../create-product.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Language } from "../../../../assets/language/vietnam";
import React from "react";
import UploadImage from "../../../../components/upload-image/upload-image.component";
import { removeImage, setImage } from "../../../../store/create-product-slice";

function VariantInput({ attributes, form }: { attributes: Attribute[]; form: FormInstance<any> }) {
	const state = useSelector((state: RootState) => state.createProduct);
	const dispatch = useDispatch();

	function generateCombinations(lists: string[][], currentCombination: string[] = [], currentIndex = 0): string[][] {
		if (lists.length === 0) {
			return [];
		}

		if (currentIndex === lists.length) {
			return [currentCombination];
		}

		const currentList = lists[currentIndex];
		const combinations = [];

		if (currentList.length === 0) {
			const subCombinations = generateCombinations(lists, currentCombination, currentIndex + 1);
			combinations.push(...subCombinations);
		} else {
			for (const item of currentList) {
				const newCombination = [...currentCombination, item];
				const subCombinations = generateCombinations(lists, newCombination, currentIndex + 1);
				combinations.push(...subCombinations);
			}
		}

		return combinations;
	}

	const handleImage = (base64: string, name: string, isRemove = false) => {
		if (isRemove) {
			dispatch(removeImage(name));
		} else {
			dispatch(setImage({ base64, name } as Image));
		}
	};

	const variantRender = () => {
		const tags = attributes?.filter((attribute) => attribute.tags?.length > 0).map((attribute) => attribute.tags);
		const variants = generateCombinations(tags);
		return (
			variants.length > 0 &&
			variants.map((variant) => {
				const variantName = variant.join(" - ");
				function handleChangeValue(arg0: string, value: any): void {
					throw new Error("Function not implemented.");
				}

				return (
					<React.Fragment key={variantName}>
						<div className="variant-name">{variantName}</div>
						<div className="row-item">
							<Form.Item name="name" label={Language.productId}>
								<Input defaultValue={`${state.productCode}${variant.map((v) => v.slice(0, 1).toLocaleUpperCase()).join("")}`} />
							</Form.Item>

							<Form.Item name="quantity" label={Language.quantity}>
								<InputNumber onChange={(value) => handleChangeValue("price", value)} value={form.getFieldValue("price")} />
							</Form.Item>
						</div>
					</React.Fragment>
				);
			})
		);
	};

	return <Form className="variant-table">{variantRender()}</Form>;
}

export default VariantInput;
