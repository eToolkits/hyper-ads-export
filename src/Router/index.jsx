import React from 'react';
import {useSelector} from 'react-redux'

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const RouterWrapper = () => {
  const userData = useSelector(store => store.userData)
  const accessToken = localStorage.getItem('accessToken')
  return (
    <React.Fragment>
      {(userData.accessToken || accessToken) ? <PrivateRouter /> : <PublicRouter />}
    </React.Fragment>
  );
};

export default RouterWrapper;
