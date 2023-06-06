import { Select } from "antd";

import AddItem from "./add-item.component";
import { DefaultOptionType } from "antd/es/select";

type MultiSelectProps = {
  value: string[] | string;
  isMultiSelect: boolean;
  enableAddItem: boolean;
  placeHolder: string;
  text?: string ;
  existItemMessage?: string;
  options: DefaultOptionType[] | undefined;
  updateOption?: (newOptions: DefaultOptionType[]) => void;
  onChange: (value: string) => void;
};

function MultiSelect({ value, isMultiSelect, placeHolder, text, existItemMessage,enableAddItem,  options, updateOption , onChange }: MultiSelectProps) {
  const setItemHandler = (newValue: string) => {
    if (newValue == '' || options?.find((option) => option.label == newValue)) {
      return false;
    }
    const newItem = {
      label: newValue,
      value: 0,
    };
    if(updateOption){
      options == undefined ? updateOption([newItem]) : updateOption([...options, newItem]);
    }
    return true;
  };
  return (
    <Select
      defaultValue={value}
      mode= {isMultiSelect? 'multiple' : undefined}
      placeholder={placeHolder}
      options={options}
      onChange={item => onChange(item as string)}
      dropdownRender={(menu) => (
        enableAddItem ?
        <AddItem
          setItemHandler={setItemHandler}
          menu={menu}
          text={text}
          existItemText={existItemMessage}
        /> : menu
      )}
    />
  );
}

export default MultiSelect;
