import { Language } from "../../../assets/language/vietnam";
import { Variant } from "../../../models/interfaces/product/product";
import { openUpdateProduct } from "../../../store/management-page-slice";
import { useAppDispatch } from "../../../store/store";

function SearchResult({ variant }: { variant: Variant }) {
	const dispatch = useAppDispatch();
	return (
		<div
			className="display-flex"
			onClick={(e) => {
				e.preventDefault();
				dispatch(openUpdateProduct(variant.productId));
			}}
		>
			<img src={variant.featureImage} className="image-item" />
			<div style={{ width: "-webkit-fill-available" }}>
				{variant.productName} - <b>{variant.variantName}</b>
				<div>
					<span>
						{Language.quantity}: {variant.quantity}
					</span>
					<span style={{ float: "right" }}>
						{Language.price} : {variant.price}
					</span>
				</div>
			</div>
		</div>
	);
}

export default SearchResult;
