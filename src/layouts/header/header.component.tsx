import { Avatar, Dropdown } from "antd";
import "./header.styles.scss";
import { UserOutlined } from "@ant-design/icons";
import { useAuthUser, useSignOut } from "react-auth-kit";

export default function Header() {
	const auth = useAuthUser();
	const signOut = useSignOut();
	return (
		<div className="header-container">
			<div className="user">
				<Avatar size="small" icon={<UserOutlined />} />
				<Dropdown
					trigger={["click", "hover"]}
					menu={{
						items: [
							{
								key: 0,
								label: "Log out",
								onClick: () => {
									signOut();
								},
							},
						],
					}}
				>
					<div className="user-name">{auth() ? auth()!.userName : ""}</div>
				</Dropdown>
			</div>
		</div>
	);
}
