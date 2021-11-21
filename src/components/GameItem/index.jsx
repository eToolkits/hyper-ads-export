import React from "react";
import PropTypes from "prop-types";
import {
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
    FormErrorMessage,
} from "@chakra-ui/react";
import { ArrowDown3 } from "iconsax-react";
import { Link } from "react-router-dom";
const GameItem = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    const finalRef = React.useRef();
    return (
        <Box my="3" ml="3">
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit info your game</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel mt={4}>Name game</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="Ex: Sky Raptor"
                            />
                            <FormErrorMessage>
                                Vui lòng nhập tên game
                            </FormErrorMessage>
                            <FormLabel mt={4}>Link store IOS</FormLabel>
                            <Input placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662" />

                            <FormLabel mt={4}>Link store CHPlay</FormLabel>
                            <Input placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter" />

                            <FormLabel mt={4}>Link Base code folder</FormLabel>
                            <Input placeholder="Ex: D:\Base\SkyRaptor" />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3}>
                            Update
                        </Button>
                        <Button colorScheme="red">Delete Game</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Box display="flex" flexWrap="nowrap">
                <Link to="editgame">
                    <Button borderRightRadius="0" colorScheme="teal">
                        <Text>Sky Raptor</Text>
                    </Button>
                </Link>
                <Button
                    px="0"
                    borderLeftRadius="0"
                    onClick={onOpen}
                    colorScheme="teal"
                >
                    <ArrowDown3 m="0" bg="tomato" color="currentColor" />
                </Button>
            </Box>
        </Box>
    );
};

GameItem.propTypes = {};

export default GameItem;
