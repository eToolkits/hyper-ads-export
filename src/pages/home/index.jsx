import React from "react";
import PropTypes from "prop-types";
import {
    InputLeftElement,
    InputGroup,
    Input,
    Box,
    Button,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    ModalFooter,
} from "@chakra-ui/react";
import { SearchNormal1, AddSquare } from "iconsax-react";
import { HomePageStyle } from "./styles";
import GameItem from "../../components/GameItem";
const HomePage = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();
    return (
        <HomePageStyle>
            <Box my="5">
                <InputGroup mx="3">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchNormal1 color="currentColor" />}
                    />
                    <Input
                        minW="200px"
                        width="50%"
                        type="text"
                        placeholder="search ..."
                    />
                </InputGroup>
            </Box>
            <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
                <Button
                    m="3"
                    onClick={onOpen}
                    leftIcon={<AddSquare color="currentColor" />}
                    colorScheme="blue"
                >
                    <Text mr="0">Add Game</Text>
                </Button>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add detail for your game</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl isRequired>
                                <FormLabel>Name game</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Ex: Sky Raptor"
                                />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Link store IOS</FormLabel>
                                <Input placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662" />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Link store CHPlay</FormLabel>
                                <Input placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter" />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Link Base code folder</FormLabel>
                                <Input placeholder="Ex: D:\Base\SkyRaptor" />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <GameItem />
                <GameItem />
                <GameItem />
                <GameItem />
                <GameItem />
            </Box>
        </HomePageStyle>
    );
};

HomePage.propTypes = {};

export default HomePage;
