import React, { Suspense } from "react";
import "./styles.scss";

const Filter = React.lazy(() => import("./filter/filter.component"));
const TableProduct = React.lazy(() => import("./table-product/table-product.component"));

export default function Management() {
	return (
		<Suspense>
			<Filter />
			<TableProduct />
		</Suspense>
	);
}
