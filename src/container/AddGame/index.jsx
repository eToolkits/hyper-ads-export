import React from "react";
import PropTypes from "prop-types";
import {
    Input,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Text,
    VStack
} from "@chakra-ui/react";
import { AddGameContainerStyle } from "./style";
const AddGameContainer = (props) => {
    return (
        <AddGameContainerStyle>
            <VStack>
                <Text fontSize="xl" fontWeight="bold" m="5">
                    ADD GAME
                </Text>
            </VStack>
            <FormControl id="ideaGame" mx="5">
                <Stack>
                    <FormLabel>Idea for game</FormLabel>
                    <Input
                        isRequired
                        width="50%"
                        placeholder="Ex: Sky solo squad..."
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
