import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ArrowLeft } from "iconsax-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import EditGame from "../../pages/EditGame";
import HomePage from "../../pages/Home";
import { useNavigate, useLocation } from "react-router-dom";
const PrivateRouter = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Box m="30px" w="100%">
            {location.pathname === "/" ? (
                ""
            ) : (
                <Button leftIcon={<ArrowLeft color="currentColor" />} onClick={()=>navigate(-1)}>
                    Back
                </Button>
            )}
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/editgame" element={<EditGame />} />
            </Routes>
        </Box>
    );
};

export default PrivateRouter;
