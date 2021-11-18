import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/home";
import AddGameScreen from "../../screen/AddGame";
import ExportScreen from "../../screen/Export";

const PrivateRouter = (props) => {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            {/* <Route exact path="/addgame" element={<AddGameScreen />} />
            <Route exact path="/export" element={<ExportScreen />} /> */}
        </Routes>
    );
};

export default PrivateRouter;
