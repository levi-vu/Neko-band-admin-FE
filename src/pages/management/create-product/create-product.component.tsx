import { Button, Form, Input, Select } from "antd";
import NumericInput from "../../../components/numeric-input/numeric-input.component";
import { useQuery } from "react-query";
import { getTypes } from "../../../api";
import { TypeProduct } from "../../../models/interfaces/TypeProduct.";
import Loading from "../../../components/loading/loading.component";
import Warning from "../../../components/warning/warning.component";
import { useRef } from "react";
import type { FormInstance } from 'antd/es/form';

const { Option } = Select;

function CreateProduct() {
  const formRef = useRef<FormInstance>(null);
  const { isLoading, error, data: types } = useQuery<TypeProduct[]>("get-types", async () => await getTypes().then((res) => res.result));
  if (isLoading) return <Loading />;

  if (error) return <Warning />;

  const onReset = () => {
    formRef.current?.resetFields();
  };


  return (
    <Form ref={formRef}>
      <Form.Item label='Tên' name='name' rules={[{ required: true, message: "Tên không được để trống" }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Giá' name='price' rules={[{ required: true, message: "Giá Không được trống" }]}>
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
        <Button htmlType='button' onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateProduct;
