import React, { Suspense, useEffect, useState } from "react";
import { ProductType } from "../../types/product.type";
import { ResponseType } from "../../types/response.type";
import Loading from "../../components/loading/loading.component";
import { getProducts } from "../../api";
import { useQuery } from "react-query";
import Warning from "../../components/warning/warning.component";

const Filter = React.lazy(() => import('./filter/filter.component'));
const Table = React.lazy(() => import('../../components/table/table.component'));


export default function Management() {
  const {isLoading, error, data } = useQuery<ResponseType<ProductType[]>>('get-products', async () => await getProducts().then(res => {
    let temp :ResponseType<ProductType[]> = {
      result:res.result,
      isSuccess: false,
      errorMessage: ""
    } ;
    for( let i = 0; i < 100; i++) {
      temp.result.push(res.result[0]);
      console.log(temp);
    }
    return  temp;
  }));
  if(isLoading) return <Loading />;

  if(error) return <Warning/>;
 
  return (
    <>
    <Suspense fallback={<Loading />}>
      <Filter />
      <Table data={data?.result } />
      </Suspense>
    </>
  );
}
