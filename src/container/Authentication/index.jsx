import React from "react";
import PropTypes from "prop-types";
import Login from "../../components/Login/index.jsx";
import "./styles.css";
const AuthenticationContainer = (props) => {
	return (
		<div className="AuthScreen-Container">
			<Login />
		</div>
	);
};

AuthenticationContainer.propTypes = {};

export default AuthenticationContainer;
