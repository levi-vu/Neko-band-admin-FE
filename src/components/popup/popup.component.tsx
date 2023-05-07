import { Modal } from "antd";
import { PopupType } from "../../models/types/popup.type";
import { Dispatch, SetStateAction, createContext } from "react";

type ModelContextType = {
	closeAction: (closePopup: boolean) => void;
};
export const ModalContext = createContext<ModelContextType | null>(null);
function Popup(props: PopupType) {
	const { isOpen, title, content, handleActionClose } = props;
	return (
		<>
			{isOpen ? (
				<ModalContext.Provider value={{ closeAction: handleActionClose }}>
					<Modal centered title={title} open={true} onCancel={() => handleActionClose(false)} footer={<></>} maskClosable={false}>
						{content}
					</Modal>
				</ModalContext.Provider>
			) : null}
		</>
	);
}

export default Popup;
