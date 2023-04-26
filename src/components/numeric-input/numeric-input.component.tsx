import {Input, Tooltip} from "antd";

type NumericInputProps = {
  onChange: (value: string) => void;
};

function NumericInput({ onChange }: NumericInputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value: inputValue} = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };
  return (
    <Tooltip trigger={["focus"]} title={"Chỉ nhập số"} placement='topLeft' overlayClassName='numeric-input'>
      <Input onChange={handleChange} placeholder='Input a number' maxLength={16} />
    </Tooltip>
  );
}

export default NumericInput;
