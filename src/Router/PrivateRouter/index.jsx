import React from "react";
import { Route, Routes } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const HomePage = React.lazy(() => import("../../pages/Home"));
const EditGame = React.lazy(() => import("../../pages/EditGame"));
const ChangeSoundsPage = React.lazy(() =>
  import("../../pages/EditGame/ChangeSounds")
);
const ChangeAssetsPage = React.lazy(() =>
  import("../../pages/EditGame/ChangeAssets")
);
const ExportPage = React.lazy(() => import("../../pages/Export"));
const SelectIdeaPage = React.lazy(() =>
  import("../../pages/EditGame/SelectIdea")
);
const PrivateRouter = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box m="30px" w="100%">
      {location.pathname === "/" ? (
        ""
      ) : (
        <Button
          mb="30px"
          leftIcon={<ArrowLeft color="currentColor" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      )}
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/editgame/:idgame" element={<SelectIdeaPage />} />
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
            path="/export/:idgame/:ididea"
            element={<ExportPage />}
          />
        </Routes>
      </React.Suspense>
    </Box>
  );
};

export default PrivateRouter;
