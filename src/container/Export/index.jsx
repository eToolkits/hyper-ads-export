import React from "react";
import {VStack, Text} from "@chakra-ui/react";
import DragDrop from "../../components/DragDrop";
import SaveTo from "../../components/SaveTo";
import { ExportContainerStyle } from "./style";

const ExportContainer = (props) => {
    return (
        <ExportContainerStyle>
            <VStack>
                <Text fontSize="xl" fontWeight="bold" m="5">
                    EXPORT GAME
                </Text>
            </VStack>
            <DragDrop />
            <SaveTo />
        </ExportContainerStyle>
    );
};

ExportContainer.propTypes = {};

export default ExportContainer;
