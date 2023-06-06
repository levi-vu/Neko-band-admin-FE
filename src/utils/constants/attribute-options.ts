import { Language } from "../../assets/language/vietnam";
import { OptionSelect } from "../../models/interfaces/option-select.model";

export const AttributeOptions: OptionSelect[] = [
	{ id: 1, label: Language.color, selected: false },
	{ id: 2, label: Language.size, selected: false },
	{ id: 3, label: Language.pattern, selected: false },
];