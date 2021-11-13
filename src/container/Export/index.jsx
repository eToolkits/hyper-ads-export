import React from "react";
import DragDrop from "../../components/DragDrop";
import SaveTo from "../../components/SaveTo";
import { ExportContainerStyle } from "./style";

const ExportContainer = (props) => {
    return (
        <ExportContainerStyle>
            <DragDrop />
            <SaveTo />
        </ExportContainerStyle>
    );
};

ExportContainer.propTypes = {};

export default ExportContainer;
