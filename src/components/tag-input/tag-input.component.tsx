import { Input, InputRef, Space, Tooltip, Tag } from "antd";
import { useEffect, useRef, useState } from "react";

interface TagInputProps {
	value?: string[];
	onChange?: (value: string[]) => void;
	disabled?: boolean;
  }

function TagInput({ disabled, onChange, value }: TagInputProps) {
	const [tags, setTags] = useState<string[]>(value ?? []);
	const [inputValue, setInputValue] = useState("");
	const [editInputIndex, setEditInputIndex] = useState(-1);
	const [editInputValue, setEditInputValue] = useState("");
	const inputRef = useRef<InputRef>(null);
	const editInputRef = useRef<InputRef>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, [tags]);
	useEffect(() => {
		editInputRef.current?.focus();
	}, [inputValue]);

	const handleClose = (removedTag: string) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		setTags(newTags);
		onChange?.(newTags);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditInputValue(e.target.value);
	};

	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTags([...tags, inputValue]);
			onChange?.([...tags, inputValue]);
		}

		setInputValue("");
	};

	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTags(newTags);
		onChange?.(newTags);
		setEditInputIndex(-1);
		setInputValue("");
	};

	const tagInputStyle: React.CSSProperties = {
		width: 60,
	};
	return (
		<Space wrap>
			{tags.map((tag, index) => {
				if (editInputIndex === index) {
					return <Input ref={editInputRef} key={tag} size="small" style={tagInputStyle} value={editInputValue} onChange={handleEditInputChange} onBlur={handleEditInputConfirm} onPressEnter={handleEditInputConfirm} />;
				}
				const isLongTag = tag.length > 20;
				const tagElem = (
					<Tag color="#108ee9" key={tag} closable={true} style={{ userSelect: "none" }} onClose={() => handleClose(tag)}>
						<span
							onDoubleClick={(e) => {
								setEditInputIndex(index);
								setEditInputValue(tag);
								e.preventDefault();
							}}
						>
							{isLongTag ? `${tag.slice(0, 20)}...` : tag}
						</span>
					</Tag>
				);
				return isLongTag ? (
					<Tooltip title={tag} key={tag}>
						{tagElem}
					</Tooltip>
				) : (
					tagElem
				);
			})}

			<Input ref={inputRef} disabled={disabled} type="text" size="small" style={tagInputStyle} value={inputValue} onChange={handleInputChange} onBlur={handleInputConfirm} onPressEnter={handleInputConfirm} />
		</Space>
	);
}

export default TagInput;
