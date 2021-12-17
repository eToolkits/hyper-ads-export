import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { ExportSquare, GalleryEdit } from "iconsax-react";
import DragDrop from "../../components/DragDrop";
var fs = window.require("fs");

const ChangeSoundsContainer = (props) => {
  const params = useParams();
  const ididea = params.ididea;
  const idgame = params.idgame;
  const handleFile = (file) => {
    console.log(file.path);
    var imageAsBase64 = fs.readFileSync(file.path, "base64");
    console.log(
      "🚀 ~ file: index.jsx ~ line 27 ~ handleFile ~ resultB64",
      imageAsBase64
    );
  };
  return (
    <>
      <Box mb="5">
        <Table my="5" variant="striped" colorScheme="gray" w="100%">
          <Thead>
            <Tr>
              <Th>Name Sound</Th>
              <Th>Current Sound</Th>
              <Th>New Sound</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>
                {" "}
                <audio controls>
                  <source src="horse.ogg" />
                </audio>
              </Td>
              <Td>
                <DragDrop
                  text="audio"
                  handleFile={handleFile}
                  type="audio/mp3, audio/mpeg"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Flex justifyContent="space-between">
          <Box>
            <Button mb="5" colorScheme="green">
              Save
            </Button>{" "}
          </Box>
          <Box>
            <Link to={`/editgame/` + idgame + "/" + ididea + `/changeassets`}>
              <Button
                mb="5"
                colorScheme="green"
                rightIcon={<GalleryEdit color="currentColor" />}
              >
                Change Assets
              </Button>{" "}
            </Link>
            <Link to={"/export/" + idgame + `/` + ididea}>
              <Button
                ml="5"
                mb="5"
                colorScheme="green"
                rightIcon={<ExportSquare color="currentColor" />}
              >
                Export Now
              </Button>{" "}
            </Link>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

ChangeSoundsContainer.propTypes = {};

export default ChangeSoundsContainer;
