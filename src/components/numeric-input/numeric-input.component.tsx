import { Input, Tooltip } from "antd";

type NumericInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function NumericInput(props: NumericInputProps) {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(inputValue);
    }
  };
  return (
    <Tooltip
      trigger={["focus"]}
      title={"Only allow Number"}
      placement='topLeft'
      overlayClassName='numeric-input'
    >
      <Input
        {...props}
        onChange={handleChange}
        placeholder='Input a number'
        maxLength={16}
      />
    </Tooltip>
  );
}

export default NumericInput;
