import { Avatar, Dropdown } from "antd";
import "./header.styles.scss";
import { UserOutlined } from "@ant-design/icons";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Header() {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
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
					<div className="user-name">{user ? user.username : ""}</div>
				</Dropdown>
			</div>
		</div>
	);
}
