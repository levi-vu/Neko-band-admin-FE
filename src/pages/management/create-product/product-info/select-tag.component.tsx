import { DefaultOptionType } from "antd/es/select";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import { useSelector } from "react-redux";
import { Language } from "../../../../assets/language/vietnam";
import TagInput from "../../../../components/tag-input/tag-input.component";
import MultiSelect from "../../../../components/multi-select/multi-select.component";
import CreateSelect from "../../../../components/create-select/create-select";
import { OptionKey } from "../../../../shared/constants/option-key";
import { RootState } from "../../../../store/store";
import TextArea from "antd/es/input/TextArea";

type PriceInputProps = {
	value?: string;
	tags: DefaultOptionType[];
	onChange?: (value: string) => void;
	remove: (value: number) => void;
	index: number;
};
function SelectTags({ value, index, onChange, remove }: PriceInputProps) {
	const defaultValue = value?.split(": ");
	const [tagName, setTagName] = useState(value?.split(": ")[0]);
	const [tagValue, setTagValue] = useState<string>("");
	const firstUpdate = useRef(true);
	const state = useSelector((state: RootState) => state.ManagementPage);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		onChange?.(`${tagName}: ${tagValue}`);
	}, [tagName, tagValue]);

	const onTagValueChange = (tagValue: string) => {
		setTagValue(tagValue);
		triggerChange();
	};

	const onTagNameChange = (tagId: string) => {
		const tagName = state.TagOptions.find((t) => t.value === Number(tagId))!.label?.toString();
		setTagName(tagName);
		triggerChange();
	};
	const triggerChange = () => {
		if (tagName === "" || tagValue.length === 0) {
			onChange?.("");
			return;
		}
		onChange?.(`${tagName}: ${tagValue}`);
	};

	return (
		<Space>
			<MultiSelect
				style={{ minWidth: "200px" }}
				value={defaultValue?.[0]}
				placeHolder={Language.selectTag}
				options={state.TagOptions}
				onChange={(e) => onTagNameChange(e)}
				addItemNode={<CreateSelect options={state.TagOptions.map((c) => c.label as string)} title={Language.addTag} selectKey={OptionKey.tagKey} />}
			></MultiSelect>
			<TextArea autoSize={true} value={defaultValue?.[1]?.split(",")} onChange={(e) => onTagValueChange(e.target.value)} />
			<Button style={{ marginLeft: "10px" }} type="primary" onClick={() => remove(index)}>
				{Language.remove}
			</Button>
		</Space>
	);
}

export default SelectTags;
