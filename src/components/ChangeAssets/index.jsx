import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Image,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    Flex,
} from "@chakra-ui/react";
import { ExportSquare, AudioSquare } from "iconsax-react";
import DragDrop from "../DragDrop";

const ChangeAssets = (props) => {
    const params = useParams();
    const idgame = params.idgame;
    const ididea = params.ididea;

    return (
        <>
            <Box mb="5">
                <DragDrop text="assets" />
                <Table w="100%" my="5" variant="striped" colorScheme="gray">
                    <TableCaption>* Click to EDIT the link</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name Asset</Th>
                            <Th>Current Asset</Th>
                            <Th>Current Size</Th>
                            <Th>New Asset</Th>
                            <Th>New Size</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>inches</Td>
                            <Td>
                                <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src="https://bit.ly/sage-adebayo"
                                    alt="Segun Adebayo"
                                />
                            </Td>
                            <Td>30x50</Td>
                            <Td>
                                <Image
                                    boxSize="100px"
                                    objectFit="cover"
                                    src="https://bit.ly/sage-adebayo"
                                    alt="Segun Adebayo"
                                />
                            </Td>
                            <Td>30x50</Td>
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
                    <Link to={`/editgame/`+idgame+"/"+ididea+`/changesounds`}>
                            <Button
                                mb="5"
                                colorScheme="green"
                                rightIcon={
                                    <AudioSquare colorScheme="currentColor" />
                                }
                            >
                                Change Sounds
                            </Button>{" "}
                        </Link>
                        <Link to={"/export/"+idgame+`/`+ididea}>
                            <Button
                                mb="5"
                                colorScheme="green"
                                rightIcon={
                                    <ExportSquare colorScheme="currenColor" />
                                }
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

ChangeAssets.propTypes = {};

export default ChangeAssets;
