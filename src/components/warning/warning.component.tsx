import { Alert } from "antd";

function Warning() {
  return (
    <Alert
      message="Warning"
      description="Please check with administrator~"
      type="warning"
      showIcon
      closeIcon
    />
  );
}

export default Warning;
