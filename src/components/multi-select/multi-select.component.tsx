
import { Select} from "antd";
import type { SelectProps } from 'antd';

import AddItem from "./add-item.component";

type MultiSelectProps = {
	placeHolder: string;
    text: string;
    existItemMessage: string;
    options: SelectProps['options'] | undefined,
    updateOption: (newOptions: SelectProps['options']) => void
};

let index = 0;

function MultiSelect({ placeHolder,text, existItemMessage, options, updateOption,  }: MultiSelectProps) {
    console.log(options);
	const setItemHandler = (newValue: string) => {
        if(options?.find(option => option.label == newValue)){
            return false;
        }
        const newItem = {
            label: newValue,
            value: index--
        };
		options == undefined ? updateOption([newItem]): updateOption([...options, newItem]);
        return true;
	};
	return <Select 
        mode="multiple"
        style={{ width: 300 }} placeholder={placeHolder}
        options={options}
        dropdownRender={(menu) => <AddItem setItemHandler={setItemHandler} menu={menu} text={text} existItemText={existItemMessage}/>} />;
}

export default MultiSelect;
