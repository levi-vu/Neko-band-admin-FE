import { Select } from "antd";

import AddItem from "./add-item.component";
import { DefaultOptionType } from "antd/es/select";

type MultiSelectProps = {
  isMultiSelect: boolean;
  placeHolder: string;
  text: string;
  existItemMessage: string;
  options: DefaultOptionType[] | undefined;
  updateOption: (newOptions: DefaultOptionType[]) => void;
  onChange: (value: string) => void;
};

let index = 0;

function MultiSelect({ isMultiSelect, placeHolder, text, existItemMessage, options, updateOption , onChange }: MultiSelectProps) {
  console.log(options);
  const setItemHandler = (newValue: string) => {
    if (newValue == '' ||options?.find((option) => option.label == newValue)) {
      return false;
    }
    const newItem = {
      label: newValue,
      value: index--,
    };
    options == undefined ? updateOption([newItem]) : updateOption([...options, newItem]);
    return true;
  };
  return (
    <Select
      mode= {isMultiSelect? 'multiple' : undefined}
      placeholder={placeHolder}
      options={options}
      onChange={value => onChange(value)}
      dropdownRender={(menu) => (
        <AddItem
          setItemHandler={setItemHandler}
          menu={menu}
          text={text}
          existItemText={existItemMessage}
        />
      )}
    />
  );
}

export default MultiSelect;
