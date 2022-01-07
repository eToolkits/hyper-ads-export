import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ArrowLeft } from 'iconsax-react';
import { Button, Box } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import NavigationBar from '../../components/NavigationBar';

const HomePage = React.lazy(() => import('../../pages/Home'));
const EditGame = React.lazy(() => import('../../pages/EditGame'));
const ChangeSoundsPage = React.lazy(() =>
  import('../../pages/EditGame/ChangeSounds')
);
const ChangeAssetsPage = React.lazy(() =>
  import('../../pages/EditGame/ChangeAssets')
);
const ChangeMapPage = React.lazy(() =>
  import('../../pages/EditGame/ChangeMap')
);
const ExportPage = React.lazy(() => import('../../pages/Export'));
const SelectIdeaPage = React.lazy(() =>
  import('../../pages/EditGame/SelectIdea')
);

const PrivateRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box pt="30px" ml="0" w="98%" display="flex">
      <NavigationBar />
      <Box display="flex" flexDirection="column" w="100%">
        {location.pathname === '/' ? (
          ''
        ) : (
          <Button
            mb="30px"
            width="fit-content"
            leftIcon={<ArrowLeft color="currentColor" />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        )}
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              exact
              path="/editgame/:idgame"
              element={<SelectIdeaPage />}
            />
            <Route
              exact
              path="/editgame/:idgame/:ididea"
              element={<EditGame />}
            />
            <Route
              exact
              path="/editgame/:idgame/:ididea/changeassets"
              element={<ChangeAssetsPage />}
            />
            <Route
              exact
              path="/editgame/:idgame/:ididea/changesounds"
              element={<ChangeSoundsPage />}
            />
            <Route
              exact
              path="/editgame/:idgame/:ididea/changemap"
              element={<ChangeMapPage />}
            />
            <Route
              path="/export/:idgame/:ididea/:exportbase"
              element={<ExportPage />}
            />
          </Routes>
        </React.Suspense>
      </Box>
    </Box>
  );
};

export default PrivateRouter;
