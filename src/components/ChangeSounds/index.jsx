import React from "react";
import PropTypes from "prop-types";
import {
    Input,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
} from "@chakra-ui/react";
import { ArrowDown2, ArrowUp2, AudioSquare } from "iconsax-react";

const ChangeSounds = (props) => {
    const [showTable, setShowTable] = React.useState(false);
    const handleShowTable = () => {
        setShowTable(!showTable);
    };
    return (
        <>
            <Box mb="5" width="100%">
                <Button
                    leftIcon={<AudioSquare color="currentColor" />}
                    mb="5"
                    onClick={handleShowTable}
                    colorScheme="teal"
                >
                    <Text mr="3">Change Sounds</Text>

                    {showTable ? (
                        <ArrowUp2 size="20" color="currentColor" />
                    ) : (
                        <ArrowDown2 size="20" color="currentColor" />
                    )}
                </Button>

                {showTable ? (
                    <>
                        {" "}
                        <Table my="5" variant="striped" colorScheme="gray">
                            <TableCaption>
                                * Click to EDIT the link
                            </TableCaption>
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
                                            <source
                                                src="horse.ogg"
                                            />
                                            <source
                                                src="horse.mp3"
                                            />
                                        </audio>
                                        {/* <Input
                                            variant="flushed"
                                            placeholder="Flushed"
                                            value="data:base64//"
                                        /> */}
                                    </Td>
                                    <Td>
                                        <Input
                                            variant="flushed"
                                            placeholder="Flushed"
                                            value="data:base64//"
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Button
                            mx="5"
                            mb="5"
                            colorScheme="orange"
                            onClick={handleShowTable}
                        >
                            Save
                        </Button>{" "}
                    </>
                ) : (
                    ""
                )}
            </Box>
        </>
    );
};

ChangeSounds.propTypes = {};

export default ChangeSounds;
