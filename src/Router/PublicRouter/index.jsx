import { Route, Routes } from 'react-router-dom';
import AuthPage from '../../pages/Auth';


const PublicRouter = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<AuthPage />} />
    </Routes>
  );
};

PublicRouter.propTypes = {};

export default PublicRouter;
