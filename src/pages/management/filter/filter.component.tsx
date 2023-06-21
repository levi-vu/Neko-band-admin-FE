import { Suspense, useState } from "react";
import "./filter.styles.scss";
import Popup from "../../../components/popup/popup.component";
import CreateProduct from "../create-product/create-product.component";
import { PopupType } from "../../../models/types/popup.type";
import { Language } from "../../../assets/language/vietnam";
export default function Filter() {
	const [openCreatePopup, setOpenCreatePopup] = useState(false);
	const popupCreateProps: PopupType = {
		isOpen: openCreatePopup,
		title: "Tạo sản phẩm",
		content: <CreateProduct />,
		width: "60%",
		handleActionClose: setOpenCreatePopup,
	};

	return (
		<div className="filter-container">
			<input placeholder={Language.search} type="text" name="text" className="search-box"></input>
			<button className="button-create" onClick={() => setOpenCreatePopup(true)}>
				{Language.create}
			</button>
			<Popup {...popupCreateProps}></Popup>
		</div>
	);
}
