import { useEffect, useState } from "react";
import Table from "../../components/table/table.component";
import Filter from "./filter/filter.component";
import { ProductType } from "../../types/product.type";
import { ResponseType } from "../../types/response.type";
import axios from "axios";

export default function Management() {
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    axios.get<ResponseType<ProductType[]>>("https://localhost:7139/api/product").then((res) => {
      let a: ProductType[] = [];
      for (let i = 0; i < 100; ++i) {
        a.push(res.data.result[0]);
      }
      return setData(a);
    }
  )}, []);
  return (
    <>
      <Filter />
      <Table data={data} />
    </>
  );
}
