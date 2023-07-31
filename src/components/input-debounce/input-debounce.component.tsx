import { Input } from "antd";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";

type InputDebounceProps = {
	value?: string;
	onChange?: (value: string) => void;
	delayTime: number;
};
function InputWithDebounce({ value, onChange, delayTime }: InputDebounceProps) {
	const [inputValue, setInputValue] = useState(value ?? "");

	useDebounce(() => onChange?.(inputValue), delayTime, [inputValue]);

	return <Input value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)} />;
}

export default InputWithDebounce;
