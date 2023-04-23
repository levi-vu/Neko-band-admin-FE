import {useState} from "react";
import "./filter.styles.scss";
import Popup from "../../../components/popup/popup.component";
import CreateProduct from "../create-product/create-product.component";
import { PopupType } from "../../../types/popup.type";

export default function Filter() {
  const [openCreatePopup, setOpenCreatePopup] = useState(false);
  const popupCreateProps: PopupType = {
    isOpen: openCreatePopup,
    title: "Tạo sản phẩm",
    width: "40%",
    height: "50%",
    content: <CreateProduct />,
    handleActionClose: setOpenCreatePopup,
  }
  return (
    <div className='filter-container'>
      <input placeholder='Search Id, Name...' type='text' name='text' className='search-box'></input>
      <button className='button-create' onClick={() => setOpenCreatePopup(!openCreatePopup)}>
        Create
      </button>
      <Popup props={popupCreateProps}></Popup>
    </div>
  );
}
