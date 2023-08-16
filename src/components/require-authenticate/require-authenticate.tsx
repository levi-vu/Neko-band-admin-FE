import { useContext, useEffect } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import AuthContext from "react-auth-kit/dist/AuthContext";

function RequireAuthenticate({ children }: { children: JSX.Element }) {
	const isAuthenticated = useIsAuthenticated();
	const navigate = useNavigate();
	const context = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
		}
	}, [context?.authState]);
	return children;
}

export default RequireAuthenticate;
