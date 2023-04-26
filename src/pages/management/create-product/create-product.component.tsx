import {Form, Input, Select} from "antd";
import NumericInput from "../../../components/numeric-input/numeric-input.component";
import {useQuery} from "react-query";
import {getTypes} from "../../../api";
import {TypeProduct} from "../../../types/TypeProduct.type";
import Loading from "../../../components/loading/loading.component";
import Warning from "../../../components/warning/warning.component";

const {Option} = Select;

function CreateProduct() {
  const {isLoading, error, data: types} = useQuery<TypeProduct[]>("get-types", async () => await getTypes().then((res) => res.result));
  return <Loading />;

  if (error) return <Warning />;
  return (
    <Form>
      <Form.Item label='Tên' name='name' rules={[{required: true, message: "Tên không được để trống"}]}>
        <Input />
      </Form.Item>
      <Form.Item label='Giá' name='price' rules={[{required: true, message: "Giá Không được trống"}]}>
        <NumericInput
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Form.Item>
      <Form.Item label='Giá Vốn' name='sourcePrice'>
        <NumericInput
          onChange={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Form.Item>
      <Form.Item label='Mô Tả' name='description'>
        <Input />
      </Form.Item>
      <Form.Item label='loại sản phẩm' name='type'>
        <Select mode='multiple' placeholder='Chọn loại sản phẩm'>
          {types?.map((type) => (
            <Option key={type.typeId} value={type.typeId}>
              {type.typeName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default CreateProduct;
