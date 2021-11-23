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
    TableCaption,
    Box,
} from "@chakra-ui/react";
import { ExportSquare, GalleryEdit } from "iconsax-react";
import DragDrop from "../DragDrop";

const ChangeSounds = (props) => {
    const params = useParams();
    const ididea = params.ididea;
    const idgame = params.idgame;
    return (
        <>
            <Box mb="5">
                <DragDrop text="sounds" />
                <Table my="5" variant="striped" colorScheme="gray" w="100%">
                    <TableCaption>* Click to EDIT the link</TableCaption>
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
                                <audio controls>
                                    <source src="horse.ogg" />
                                </audio>
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
                    <Link to={`/editgame/`+idgame+"/"+ididea+`/changeassets`}>
                            <Button mb="5" colorScheme="green" rightIcon={<GalleryEdit colorScheme="currentColor"/>}>
                                Change Assets
                            </Button>{" "}
                        </Link>
                        <Link to={"/export/"+idgame+`/`+ididea}>
                            <Button mb="5" colorScheme="green" rightIcon={<ExportSquare colorScheme="currentColor"/>}>
                                Export Now
                            </Button>{" "}
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

ChangeSounds.propTypes = {};

export default ChangeSounds;
