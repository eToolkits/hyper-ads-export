import React from "react";
import { Route, Routes } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import HomePage from "../../pages/Home";
import EditGame from "../../pages/EditGame";
import ChangeSoundsPage from "../../pages/EditGame/ChangeSounds";
import ChangeAssetsPage from "../../pages/EditGame/ChangeAssets";
import ExportPage from "../../pages/Export";
import SelectIdeaPage from "../../pages/EditGame/SelectIdea";
const PrivateRouter = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box m="30px" w="100%">
            {location.pathname === "/" ? (
                ""
            ) : (
                <Button mb="30px" leftIcon={<ArrowLeft color="currentColor" />} onClick={()=>navigate(-1)}>
                    Back
                </Button>
            )}
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/editgame/:idgame" element={<SelectIdeaPage />} />
                <Route exact path="/editgame/:idgame/:ididea" element={<EditGame />} />
                <Route exact path="/editgame/:idgame/:ididea/changeassets" element={<ChangeAssetsPage />} />
                <Route exact path="/editgame/:idgame/:ididea/changesounds" element={<ChangeSoundsPage />} />
                <Route exact path="/export/:idgame/:ididea" element={<ExportPage />} />
            </Routes>
        </Box>
    );
};

export default PrivateRouter;
