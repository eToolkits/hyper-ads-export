import React from 'react';
import { useCookies } from 'react-cookie';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const RouterWrapper = () => {

  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

  return (
    <React.Fragment>
      {cookies.access_token ? <PrivateRouter /> : <PublicRouter />}
    </React.Fragment>
  );
};

export default RouterWrapper;
