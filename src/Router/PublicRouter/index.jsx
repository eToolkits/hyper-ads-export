import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenicationScreen from "../../screen/Authentication";

const PublicRouter = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<AuthenicationScreen />} />
    </Routes>
  );
};

PublicRouter.propTypes = {};

export default PublicRouter;
