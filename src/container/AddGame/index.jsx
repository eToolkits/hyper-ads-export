import React from "react";
import PropTypes from "prop-types";
import {
    Input,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
} from "@chakra-ui/react";
import { ArrowDown2, ArrowUp2 } from "iconsax-react";
import { AddGameContainerStyle } from "./style";
const AddGameContainer = (props) => {
    const [showTable, setShowTable] = React.useState(false);
    const handleShowTable = () => {
        setShowTable(!showTable);
    };
    return (
        <AddGameContainerStyle>
            <VStack>
                <Text fontSize="xl" fontWeight="bold" m="5">
                    ADD GAME
                </Text>
            </VStack>
            <Box mb="5">
                <Button
                    mx="5"
                    mb="5"
                    onClick={handleShowTable}
                    colorScheme="teal"
                >
                    <Text mr="3">Show My Games</Text>

                    {showTable ? (
                        <ArrowUp2 size="20" color="currentColor" />
                    ) : (
                        <ArrowDown2 size="20" color="currentColor" />
                    )}
                </Button>

                {showTable ? (
                    <>
                        {" "}
                        <Table variant="striped" colorScheme="gray" mx="5">
                            <TableCaption>
                                * Click to EDIT the link
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Name Game</Th>
                                    <Th>Link IOS</Th>
                                    <Th>Link Android</Th>
                                    <Th>Remove</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>inches</Td>
                                    <Td>
                                        {" "}
                                        <Input
                                            variant="flushed"
                                            placeholder="Flushed"
                                            value="data:base64//"
                                        />
                                    </Td>
                                    <Td>
                                        <Input
                                            variant="flushed"
                                            placeholder="Flushed"
                                            value="data:base64//"
                                        />
                                    </Td>
                                    <Td>
                                        <Button colorScheme="red">
                                            Delete
                                        </Button>
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
            <FormControl id="ideaGame" mx="5" isRequired>
                <Stack>
                    <FormLabel>Name game</FormLabel>
                    <Input
                        isRequired
                        width="50%"
                        placeholder="Ex: Juice Blending"
                        // onChange={handlIdeaGame}
                        // value={ideaGameState}
                    />
                </Stack>
                <Stack mt="5">
                    <FormLabel>Link store IOS</FormLabel>
                    <Input
                        isRequired
                        width="50%"
                        placeholder="Ex: https://apple.com/juiceblending.basicgame"
                        // onChange={handlIdeaGame}
                        // value={ideaGameState}
                    />
                </Stack>
                <Stack mt="5">
                    <FormLabel>Link store Android</FormLabel>
                    <Input
                        isRequired
                        width="50%"
                        placeholder="Ex: https://google.playstore.com/juiceblending.basicgame"
                        // onChange={handlIdeaGame}
                        // value={ideaGameState}
                    />
                </Stack>
                <Button mt="5" colorScheme="teal">
                    Add Game
                </Button>
            </FormControl>
        </AddGameContainerStyle>
    );
};

AddGameContainer.propTypes = {};

export default AddGameContainer;
