import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/layout";
import ChangeSounds from "../../components/ChangeSounds";
import ChangeAssets from "../../components/ChangeAssets";
const fs = window.require("fs");
const path = window.require("path");
const EditGame = (props) => {
    useEffect(() => {
        const getAllFromDir = (source) =>
            fs.readdirSync(source).map((name) => path.join(source, name));
        let dir = String.raw`D:\Monster\z_order\match3d-pa-phaser-fake-3d`;
        console.log(getAllFromDir(dir));
    }, []);
    return (
        <Box display="flex" flexDirection="column" w="100%" my="30px">
            <ChangeSounds />
            <ChangeAssets />
        </Box>
    );
};

EditGame.propTypes = {};

export default EditGame;
