import { Select } from "antd";

import AddItem from "./add-item.component";
import { DefaultOptionType } from "antd/es/select";

type MultiSelectProps = {
	value: string[] | string;
	isMultiSelect?: boolean;
	enableAddItem?: boolean;
	placeHolder: string;
	existItemMessage?: string;
	options: DefaultOptionType[] | undefined;
	updateOption?: (newOptions: string) => void;
	onChange: (value: string) => void;
};

function MultiSelect({ value, isMultiSelect, placeHolder, existItemMessage, enableAddItem, options, updateOption, onChange }: MultiSelectProps) {
	const setItemHandler = (newValue: string) => {
		if (newValue == "" || options?.find((option) => option.label == newValue)) {
			return false;
		}
		if (updateOption) {
			updateOption(newValue);
		}
		return true;
	};
	return (
		<Select
			defaultValue={value}
			mode={isMultiSelect ? "multiple" : undefined}
			placeholder={placeHolder}
			options={options}
			onChange={(item) => onChange(item as string)}
			dropdownRender={(menu) => (enableAddItem ? <AddItem setItemHandler={setItemHandler} menu={menu} existItemText={existItemMessage} /> : menu)}
		/>
	);
}

export default MultiSelect;
