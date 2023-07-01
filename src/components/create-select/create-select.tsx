import { Button, Input, InputRef, Modal, Tooltip, Typography } from "antd";
import { Language } from "../../assets/language/vietnam";
import { useEffect, useRef, useState } from "react";
import { addOptions, clearStatus } from "../../store/management-page-slice";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { Status } from "../../shared/constants/status";

function CreateSelect({ options, title, selectKey }: { options: string[]; title: string; selectKey: string }) {
	const [openPopup, setOpenPopup] = useState(false);
	const [isExistValue, setIsExistValue] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const dispatch = useAppDispatch();
	const state = useSelector((state: RootState) => state.ManagementPage);

	useEffect(() => {
		if (state.status === Status.success) {
			setOpenPopup(false);
		}
	}, [state]);

	const handlerSubmit = () => {
		if (inputRef.current?.input?.value == "" || options.includes(inputRef.current?.input?.value!)) {
			setIsExistValue(true);
			return;
		}
		dispatch(addOptions({ key: selectKey, value: inputRef.current?.input?.value! }));
	};
	return (
		<div style={{ zIndex: "100" }}>
			<Button
				style={{ width: "100%" }}
				onClick={() => {
					setOpenPopup(true);
				}}
			>
				{title}
			</Button>
			<Modal
				maskClosable={false}
				open={openPopup}
				title={title}
				onCancel={() => setOpenPopup(false)}
				afterClose={() => dispatch(clearStatus())}
				okText={Language.addNew}
				cancelText={Language.cancel}
				destroyOnClose={true}
				onOk={handlerSubmit}
				confirmLoading={state.status === Status.loading}
			>
				<div>
					<label>{Language.name}</label>
					<Tooltip open={isExistValue} title={Language.existedOrEmpty} placement="topRight" color="red">
						<Input ref={inputRef} onChange={() => setIsExistValue(false)}></Input>
					</Tooltip>

					{state.status === Status.failed ? <Typography.Text type="danger">{Language.createFailed}</Typography.Text> : null}
				</div>
			</Modal>
		</div>
	);
}

export default CreateSelect;
