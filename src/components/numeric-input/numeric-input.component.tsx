import { Input, InputRef, Tooltip } from "antd";
import { useRef } from "react";

type NumericInputProps = {
	onChange: (value: string) => void;
	onblur?: (value: string) => void;
	placeHoler?: string;
	value: string;
	isCurrency?: boolean;
	width?: string;
};

function NumericInput({ onChange, isCurrency, placeHoler, value, width }: NumericInputProps) {
	const inputRef = useRef<InputRef>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		checkValue(e.target.value, () => e.preventDefault());
	};

	const handlePasteValue = (e: React.ClipboardEvent<HTMLInputElement>) => {
		checkValue(e.clipboardData.getData("text"), () => e.preventDefault());
	};

	const formatNumber = (value: string) => {
		return value.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const checkValue = (value: string, nextStep: () => void) => {
		const reg = /^[\d,;]*(\.\d*)?$/;
		if (reg.test(value) || value === "") {
			const value = inputRef.current?.input?.value ?? "";
			onChange(isCurrency ? formatNumber(value) : value);
		} else {
			nextStep();
		}
	};

	return (
		<Tooltip trigger={["focus"]} title={"Chỉ nhập số"} placement="topLeft" overlayClassName="numeric-input">
			<Input
				style={{ width: width }}
				value={value}
				ref={inputRef}
				onPaste={handlePasteValue}
				onChange={handleChange}
				placeholder={placeHoler}
				maxLength={16}
			/>
		</Tooltip>
	);
}

export default NumericInput;
