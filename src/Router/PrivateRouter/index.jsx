import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthenicationScreen from "../../screen/Authentication";

const PrivateRouter = (props) => {
    // let his  = useHistory();
    // console.log(his);
    return (
        <Routes>
            <Route path="/" element={<AuthenicationScreen />} />
            <Route path="/login" element={<AuthenicationScreen />} />
            <Route element={<AuthenicationScreen />} />
        </Routes>
    );
};

export default PrivateRouter;
