import "./login.scss";
import { Form, Input, Button, Carousel } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../services/user-service";
import { UserRequest } from "../../models/interfaces/user/user-request";
import { useSignIn } from "react-auth-kit";
import { useState } from "react";
import { Language } from "../../assets/language/vietnam";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [isLoginFailed, setIsLoginFailed] = useState(false);
	const singIn = useSignIn();
	const navigate = useNavigate();
	const onFinish = async (request: UserRequest) => {
		const token = await login(request);
		if (token) {
			singIn({
				token: token,
				expiresIn: 120,
				tokenType: "Bearer",
				authState: { userName: request.userName },
			});
			navigate("/");
			setIsLoginFailed(false);
		} else {
			setIsLoginFailed(true);
		}
	};

	return (
		<div className="login">
			<div className="login-page-content">
				<Form name="normal_login" className="login-form" onFinish={onFinish}>
					<Form.Item
						name="userName"
						rules={[
							{
								required: true,
								message: "Please input your Username!",
							},
						]}
					>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
					</Form.Item>

					{isLoginFailed ? <p className="login-failed">{Language.loginFailed}</p> : null}

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
					</Form.Item>
				</Form>

				<Carousel autoplay speed={500} variableWidth className="carousel">
					<div>
						<img width={500} src="https://d39f6atbz96inh.cloudfront.net/used-logo.jpg" />
					</div>
				</Carousel>
			</div>
		</div>
	);
}
