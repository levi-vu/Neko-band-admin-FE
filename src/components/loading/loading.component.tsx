import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type LoadingType = {
  isLoading: boolean;
  children: React.ReactNode;
}
function Loading({isLoading, children} : LoadingType) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin spinning={isLoading} indicator={antIcon} > {children}</Spin>
  );
}

export default Loading;
