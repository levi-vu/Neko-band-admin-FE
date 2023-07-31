import { Input, Tooltip } from "antd";
import { useEffect, useState } from "react";

type NumericInputProps = {
	onChange?: (value: string) => void;
	onblur?: (value: string) => void;
	placeHoler?: string;
	value?: string;
	isCurrency?: boolean;
	width?: string;
};

function NumericInput({ onChange, isCurrency, placeHoler, value, width }: NumericInputProps) {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		checkValue(e.target.value, () => e.preventDefault());
	};

	const handlePasteValue = (e: React.ClipboardEvent<HTMLInputElement>) => {
		checkValue(e.clipboardData.getData("text"), () => e.preventDefault());
	};

	const formatNumber = (value: string) => {
		const regex = /^0+|,(?=,|$)/g;
		const currencyValue = value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return currencyValue.replace(regex, "");
	};

	const checkValue = (value: string, nextStep: () => void) => {
		const reg = /^[\d,;]*(\.\d*)?$/;
		if (value === "") {
			setInputValue("0");
			onChange?.("0");
		} else if (reg.test(value)) {
			const valueInput = isCurrency ? formatNumber(value) : value;
			setInputValue(valueInput);
			onChange?.(valueInput);
		} else {
			const valueInput = value.match(/\d/g)?.join("") ?? "";
			setInputValue(isCurrency ? formatNumber(valueInput) : valueInput);
			nextStep();
		}
	};

	return (
		<Tooltip trigger={["focus"]} title={"Chỉ nhập số"} placement="topLeft" overlayClassName="numeric-input">
			<Input style={{ width: width }} value={inputValue} onPaste={handlePasteValue} onChange={handleChange} placeholder={placeHoler} maxLength={16} />
		</Tooltip>
	);
}

export default NumericInput;
