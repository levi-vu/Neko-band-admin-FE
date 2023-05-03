import { Input, InputRef, Tooltip } from "antd";
import { useRef } from "react";

type NumericInputProps = {
	onChange: (value: string) => void;
	placeHoler: string;
	value: string;
};

function NumericInput({ onChange, placeHoler, value }: NumericInputProps) {
  const inputRef = useRef<InputRef>(null);
	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const  inputValue  = e.key;
		const reg = /^-?\d*(\.\d*)?$/;
		if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
			onChange(inputRef.current?.input?.value ?? "");
		} else {
      e.preventDefault();
    }
	};

	return (
		<Tooltip trigger={["focus"]} title={"Chỉ nhập số"} placement="topLeft" overlayClassName="numeric-input">
			<Input value={value} ref={inputRef} onKeyPress={handleChange} onChange={(e) => onChange(e.target.value)} placeholder={placeHoler} maxLength={16} />
		</Tooltip>
	);
}

export default NumericInput;
