import React, { Suspense, useEffect, useState } from "react";
import Popup from "../../../components/popup/popup.component";
import { PopupType } from "../../../models/types/popup.type";
import { Language } from "../../../assets/language/vietnam";
import { RootState, useAppDispatch } from "../../../store/store";
import { getInitCreateInfo } from "../../../services/product-service";
import { useQuery } from "react-query";
import { DefaultOptionType } from "antd/es/select";
import { closePopupProduct, openCreateProduct, setOptions } from "../../../store/management-page-slice";
import LiveSearch from "./live-search-product.component";
import { useSelector } from "react-redux";
import MultiSelect from "../../../components/multi-select/multi-select.component";

const CreateProduct = React.lazy(() => import("../create-product/update-product.component"));
export default function Filter() {
	const state = useSelector((state: RootState) => state.ManagementPage);
	const { data: initInfo } = useQuery("getInitInfo", getInitCreateInfo, { retry: false });
	const dispatch = useAppDispatch();

	const popupCreateProps: PopupType = {
		isOpen: state.isOpen,
		title: state.productId > 0 ? Language.updateProduct : Language.createProduct,
		content: <CreateProduct id={state.productId} />,
		width: "60%",
		handleActionClose: () => dispatch(closePopupProduct()),
	};

	useEffect(() => {
		if (initInfo == undefined) {
			return;
		}

		const categoryList = initInfo?.categories?.map((category) => {
			return ({ value: category.categoryId, label: category.categoryName } as DefaultOptionType) ?? [];
		});

		const sourceList = initInfo?.sources?.map((source) => {
			return ({ value: source.sourceId, label: source.sourceName } as DefaultOptionType) ?? [];
		});

		const tagList = initInfo?.tags?.map((tag) => {
			return ({ value: tag.tagName, label: tag.tagName } as DefaultOptionType) ?? [];
		});
		dispatch(setOptions({ key: "SourceOptions", value: sourceList }));
		dispatch(setOptions({ key: "CategoryOptions", value: categoryList }));
		dispatch(setOptions({ key: "TagOptions", value: tagList }));
	}, [initInfo]);

	return (
		<div className="filter-container">
			<LiveSearch />
			{/* <MultiSelect isMultiSelect placeHolder={Language.selectCategory} options={state.CategoryOptions} /> */}
			<button className="button-create" onClick={() => dispatch(openCreateProduct())}>
				{Language.create}
			</button>
			<Suspense>
				<Popup {...popupCreateProps}></Popup>
			</Suspense>
		</div>
	);
}
