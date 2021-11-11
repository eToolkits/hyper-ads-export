import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../../screen/Home";


const PrivateRouter = (props) => {
    return (
        <Routes>
            <Route exact path="/" element={<HomeScreen />} />
        </Routes>
    );
};

export default PrivateRouter;
