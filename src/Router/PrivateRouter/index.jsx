import React from "react";
import { Route, Routes } from "react-router-dom";
import ExportScreen from "../../screen/Export";

const PrivateRouter = (props) => {
    return (
        <Routes>
            {/* <Route exact path="/" element={<HomeScreen />} /> */}
            <Route exact path="/export" element={<ExportScreen />} />
        </Routes>
    );
};

export default PrivateRouter;
