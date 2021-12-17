import React from "react";
import PropTypes from "prop-types";
import Login from "../../components/Login/index.jsx";
import { AuthContainerStyle } from "./styles";
const AuthenticationContainer = (props) => {
  return (
    <AuthContainerStyle>
      <Login />
    </AuthContainerStyle>
  );
};

AuthenticationContainer.propTypes = {};

export default AuthenticationContainer;
