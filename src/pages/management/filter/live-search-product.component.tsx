import { useMemo, useState } from "react";
import { Language } from "../../../assets/language/vietnam";
import { Dropdown, MenuProps } from "antd";
import { Variant } from "../../../models/interfaces/product/product";
import useDebounce from "../../../hooks/useDebounce";
import { getVariantByText } from "../../../services/product-service";
import SearchResult from "./search-result.component";

function LiveSearch() {
	const [variants, setVariants] = useState<Variant[]>([]);
	const [total, setTotal] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [openDropdown, setOpenDropdown] = useState(false);

	useDebounce(() => getItems(), 300, [inputValue]);

	console.log(openDropdown);

	const getItems = () => {
		if (inputValue == "") {
			{
				setVariants([]);
				setTotal(0);
				return;
			}
		}
		getVariantByText(inputValue, false).then((res) => {
			setVariants(res.result.variants);
			setTotal(res.result.totalResults);
		});
	};

	const showAllItems = () => {
		if (variants.length < 5) {
			return;
		}
		getVariantByText(inputValue, true).then((res) => {
			setVariants(res.result.variants);
			setTotal(res.result.totalResults);
		});
	};

	const itemMenu: MenuProps["items"] = useMemo(() => {
		if (variants.length == 0) {
			return [
				{
					key: 0,
					label: (
						<span>
							{total} {Language.totalResults}
						</span>
					),
					disabled: true,
				},
			];
		}
		const items = variants.map((variant) => {
			return { key: variant.variantId, label: <SearchResult variant={variant} /> };
		});

		items.push({
			key: 0,
			label:
				variants.length == total ? (
					<span>
						{total} {Language.totalResults}
					</span>
				) : (
					<span onMouseEnter={showAllItems}>
						{variants.length >= 5 ? Language.clickForMore : ""} {total} {Language.totalResults}
					</span>
				),
		});
		return items;
	}, [variants]);

	return (
		<>
			<Dropdown
				open={openDropdown}
				onOpenChange={setOpenDropdown}
				destroyPopupOnHide
				autoAdjustOverflow={true}
				menu={{ items: itemMenu, onClick: () => setOpenDropdown(false) }}
				className="search-dropdown"
				trigger={["click"]}
			>
				<input
					value={inputValue}
					onChange={(e) => {
						setOpenDropdown(true);
						setInputValue(e.currentTarget.value);
					}}
					placeholder={Language.search}
					type="search"
					name="text"
					className="search-box"
				></input>
			</Dropdown>
		</>
	);
}

export default LiveSearch;
