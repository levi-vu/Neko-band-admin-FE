import React, { Suspense } from "react";
import { useQuery } from "react-query";
import { Product } from "../../models/interfaces/product.";
import { ResponseType } from "../../models/interfaces/response.";
import Loading from "../../components/loading/loading.component";
import { getProducts } from "../../api";
import Warning from "../../components/warning/warning.component";
import './management.styles.scss';

const Filter = React.lazy(() => import("./filter/filter.component"));
const TableProduct = React.lazy(() => import("./table-product/table-product.component"));

export default function Management() {
  const { isLoading, error, data } = useQuery<ResponseType<Product[]>>("get-products", async () => await getProducts());

  if (isLoading) return <Loading />;

  if (error) return <Warning />;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Filter />
        <div>
          <TableProduct products={data?.result} className="table-product"/>
        </div>
      </Suspense>
    </>
  );
}
