import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ReactNode, useState } from "react";

type MultiSelectProps = {
	value?: string[] | string;
	isMultiSelect?: boolean;
	placeHolder: string;
	options: DefaultOptionType[] | undefined;
	onChange?: (value: string) => void;
	addItemNode?: ReactNode;
	style?: React.CSSProperties;
};

function MultiSelect({ value, isMultiSelect, placeHolder, options, onChange, addItemNode, style }: MultiSelectProps) {
	const [open, setOpen] = useState(false);
	return (
		<Select
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					setOpen(false);
				}
			}}
			open={open}
			style={style}
			value={value}
			mode={isMultiSelect ? "multiple" : undefined}
			placeholder={placeHolder}
			options={options}
			onChange={(item) => onChange?.(item as string)}
			onDropdownVisibleChange={(visible) => setOpen(visible)}
			dropdownRender={(menu) =>
				addItemNode ? (
					<>
						{menu}
						<div onClick={() => setOpen(false)}>{addItemNode}</div>
					</>
				) : (
					menu
				)
			}
		/>
	);
}

export default MultiSelect;
