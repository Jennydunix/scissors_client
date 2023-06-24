import { useRouteError } from "react-router-dom";
import "./errorElement.scss";
const ErrorElement = () => {
	const error = useRouteError();
	return (
		
			<div className="rbox">
				<h2>{error.data.msg}</h2>
			</div>
		
	);
};

export default ErrorElement;
