import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Warning from "../warning/warning.component";

type LoadingType = {
	isLoading: boolean;
	isError: boolean;
	children?: React.ReactNode;
};
function Loading({ isLoading, children, isError }: LoadingType) {
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	return (
		<>
			{isError ? (
				<Warning />
			) : (
				<Spin spinning={isLoading} indicator={antIcon}>
					{children}
				</Spin>
			)}
		</>
	);
}

export default Loading;
