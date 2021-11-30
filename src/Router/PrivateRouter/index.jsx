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
import { db } from "./../../services/firebaseConfig";
import { ref, set, onValue } from "firebase/database";
const PrivateRouter = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(db);
    const payload = {
        id: "7e223eb3-5020-49cd-8a62-3d0f0eaeb013",
        name: "Bino1",
        linkStoreIOS: "",
        linkStoreAndroid:
            "https://play.google.com/store/apps/details?id=com.superbinogo.jungleboyadventure",
        idea: [
            {
                id: "92189f9c-b637-45fc-b2e4-30c912d8eb68",
                name: "ẻyeyey",
                linkBaseCode: "ẻyryrty",
            },
        ],
    };
    const test = () => {
		const dataRef = ref(db, 'data');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });

        set(ref(db, "data/adsdasdasdads"), {
            name: "Bino1",
            linkStoreIOS: "",
            linkStoreAndroid:
                "https://play.google.com/store/apps/details?id=com.superbinogo.jungleboyadventure",
            idea: [
                {
                    id: "92189f9c-b637-45fc-b2e4-30c912d8eb68",
                    name: "ẻyeyey",
                    linkBaseCode: "ẻyryrty",
                },
            ],
        });
    };
    test();
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
                    path="/export/:idgame/:ididea"
                    element={<ExportPage />}
                />
            </Routes>
        </Box>
    );
};

export default PrivateRouter;
