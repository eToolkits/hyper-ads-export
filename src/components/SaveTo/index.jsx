import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { SaveToStyle } from "./styles";
import { CombineAndExport } from "../../function/combineSingle";
import { useParams } from "react-router-dom";
//use import syntax will error
const electron = window.require("electron");
let dialog = electron.remote.dialog;

const SaveTo = (props) => {
  const useparams = useParams();
  const params = useparams.id;
  const toast = useToast();
  const { allGame } = props;
  const [directoryState, setDirectoryState] = useState("Not selected yet");
  const [ideaGameState, setIdeaGameState] = useState("");

  const handleDirectory = async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    console.log("directories selected", result);
    if (result.filePaths.length > 0) {
      setDirectoryState((pre) => result.filePaths);
    }
  };
  const handlIdeaGame = (e) => {
    setIdeaGameState(e.target.value);
  };
  const ResetFeild = () => {
    setIdeaGameState("sky");
    setIdeaGameState("");
    setDirectoryState("Not selected yet");
  };
  const handleExportAds = () => {
    if (!ideaGameState || directoryState === "Not selected yet") {
      toast({
        title: "Please complete all fields!",
        status: "warning",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } else {
      CombineAndExport(
        listGame.linkBaseCode,
        listGame.name,
        ideaGameState,
        directoryState
      );
      toast({
        title: "Export Ads successfully!",
        status: "success",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
      ResetFeild();
    }
  };
  return (
    <SaveToStyle>
      <div className="setup">
        <div className="name-idea">
          <FormControl id="ideaGame" isRequired>
            <FormLabel>Name for Idea</FormLabel>
            <Input
              w="70%"
              placeholder="Ex: Sky solo squad..."
              onChange={handlIdeaGame}
              value={ideaGameState}
            />
          </FormControl>
        </div>
        <div className="save-dir">
          <Input
            w="50%"
            className="mgr30"
            isDisabled
            placeholder="medium size"
            size="md"
            value={directoryState}
          />
          <Button
            mx="5"
            colorScheme="teal"
            variant="outline"
            onClick={handleDirectory}
          >
            Save to ...
          </Button>
        </div>
      </div>
      <Button colorScheme="teal" size="lg" onClick={handleExportAds}>
        Export Ads
      </Button>
    </SaveToStyle>
  );
};
export default SaveTo;
