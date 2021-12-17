import React from "react";
import PrivateRouter from "./PrivateRouter";
// import PublicRouter from './PublicRouter'

const RouterWrapper = () => {
  return (
    <React.Fragment>
      <PrivateRouter />
      {/* <PublicRouter /> */}
    </React.Fragment>
  );
};

export default RouterWrapper;
