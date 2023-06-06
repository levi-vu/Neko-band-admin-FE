import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Space, Tooltip } from "antd";
import { useState } from "react";

type AddItemProps = {
	setItemHandler: (newItem: string) => boolean;
	menu: React.ReactNode;
	text?: string;
	existItemText?: string;
};
function AddItem({ setItemHandler, menu, text, existItemText }: AddItemProps) {
	const [name, setName] = useState("");
	const [notify, setNotify] = useState(false);

	const addItemHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
		e.preventDefault();
		const newItemAccessed = setItemHandler(name);
		newItemAccessed ? setName("") : setNotify(true);
	};

	const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		setNotify(false);
	};

	return (
		<>
			{menu}
			<Divider style={{ margin: "8px 0" }} />
			<Space style={{ padding: "0 8px 4px" }}>
				{notify ? (
					<Tooltip title={existItemText}>
						<Input placeholder="Tạo mới" style={notify ? { border: "1px solid red" } : {}} value={name} onChange={onChangeValue} />
					</Tooltip>
				) : (
					<Input placeholder="Tạo mới" style={notify ? { border: "1px solid red" } : {}} value={name} onChange={onChangeValue} />
				)}

				<Button type="text" icon={<PlusOutlined />} onClick={(e) => addItemHandler(e)}>
					{text}
				</Button>
			</Space>
		</>
	);
}

export default AddItem;
