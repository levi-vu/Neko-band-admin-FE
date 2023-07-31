import { Slider, Switch } from "antd";
import { Language } from "../../assets/language/vietnam";

type MagnifierControllerProps = {
	minMagnifier: number;
	maxMagnifier: number;
	defaultMagnifier: number;
	magnifier: number;
	handlerChangeMagnifier: (value: number) => void;
	handlerChangeOptionSelect: (value: boolean) => void;
	isPickColor: boolean;
};
function MagnifierController({
	minMagnifier,
	maxMagnifier,
	magnifier,
	defaultMagnifier,
	isPickColor,
	handlerChangeMagnifier,
	handlerChangeOptionSelect,
}: MagnifierControllerProps) {
	return (
		<>
			<Switch
				style={{ display: "block" }}
				defaultChecked
				onChange={(e) => {
					handlerChangeOptionSelect(e);
					handlerChangeMagnifier(e ? defaultMagnifier : magnifier);
				}}
				checkedChildren={Language.color}
				unCheckedChildren={Language.pattern}
			/>
			<Slider disabled={isPickColor} min={minMagnifier} max={maxMagnifier} onChange={handlerChangeMagnifier} value={magnifier} />
		</>
	);
}

export default MagnifierController;
