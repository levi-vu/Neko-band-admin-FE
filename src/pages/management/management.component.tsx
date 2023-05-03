import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { Product } from "../../models/interfaces/product.model";
import Loading from "../../components/loading/loading.component";
import { getProducts } from "../../api";
import Warning from "../../components/warning/warning.component";
import './management.styles.scss';

const Filter = React.lazy(() => import("./filter/filter.component"));
const TableProduct = React.lazy(() => import("./table-product/table-product.component"));

export default function Management() {

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Filter />
        <div>
          <TableProduct className="table-product"/>
        </div>
      </Suspense>
    </>
  );
}
