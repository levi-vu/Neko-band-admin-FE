import { Modal } from "antd";
import { PopupType } from "../../models/types/popup.type";
import { createContext, useMemo } from "react";

type ModelContextType = {
	closeAction: () => void;
};
export const ModalContext = createContext<ModelContextType | null>(null);
function Popup(props: PopupType) {
	const { isOpen, title, content, width, handleActionClose } = props;
	const contextValue = useMemo<ModelContextType>(() => ({ closeAction: handleActionClose }), [content]);
	return (
		<>
			{isOpen ? (
				<ModalContext.Provider value={contextValue}>
					<Modal
						width={width}
						style={{ top: "5vh", maxHeight: "80%" }}
						title={title}
						open={true}
						onCancel={() => handleActionClose()}
						footer={<></>}
						maskClosable={false}
					>
						{content}
					</Modal>
				</ModalContext.Provider>
			) : null}
		</>
	);
}

export default Popup;
