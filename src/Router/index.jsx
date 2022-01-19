import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const PrivateRouter = React.lazy(() => import('./PrivateRouter'));
const PublicRouter = React.lazy(() => import('./PublicRouter'));

const RouterWrapper = () => {
  const userData = useSelector((store) => store.userData);
  const accessToken = localStorage.getItem('accessToken');
  return (
    <React.Fragment>
      <React.Suspense fallback={<Loading />}>
        {userData.accessToken || accessToken ? (
          <PrivateRouter />
        ) : (
          <PublicRouter />
        )}
      </React.Suspense>
    </React.Fragment>
  );
};

export default RouterWrapper;
