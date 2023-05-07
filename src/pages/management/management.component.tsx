import React, { Suspense } from "react";
import Loading from "../../components/loading/loading.component";
import "./management.styles.scss";

const Filter = React.lazy(() => import("./filter/filter.component"));
const TableProduct = React.lazy(() => import("./table-product/table-product.component"));

export default function Management() {
	return (
		<>
			<Suspense>
				<Filter />
				<TableProduct className="table-product" />
			</Suspense>
		</>
	);
}
