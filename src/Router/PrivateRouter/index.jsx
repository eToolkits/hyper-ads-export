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
                <Route exact path="/editgame" element={<EditGame />} />
                <Route exact path="/editgame/changeassets" element={<ChangeAssetsPage />} />
                <Route exact path="/editgame/changesounds" element={<ChangeSoundsPage />} />
                <Route exact path="/export" element={<ExportPage />} />
            </Routes>
        </Box>
    );
};

export default PrivateRouter;
