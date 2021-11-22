import React, { useRef } from "react";
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
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import { SearchNormal1, AddSquare } from "iconsax-react";
import GameItem from "../../components/GameItem";
import { ListGameService } from "./../../function/utils";
import listGame from "./../../database/ListGame.json";
const ListGameSv = new ListGameService();
const HomePage = (props) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [listGameState, setListGameState] = React.useState(listGame);
    const nameRef = React.useRef();
    const finalRef = React.useRef();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { nameGame, linkIOS, linkAndroid, linkBaseCode } = values;
        console.log(values);
        const payload = {
            id: uuid(),
            name: nameGame,
            linkStoreIOS: linkIOS,
            linkStoreAndroid: linkAndroid,
            linkBaseCode: linkBaseCode,
        };
        ListGameSv.addGame(payload).then((res) => {
            toast({
                position: "top",
                title: "Add game successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            let timeOut = setTimeout(() => {
                setSubmitting(false);
                resetForm();
                onClose();
                clearTimeout(timeOut);
            }, 2000);
        });
    };
    const handleSearch = (event) => {
        const { value } = event.target;
        let searchResult = listGame.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setListGameState(searchResult);
    };
    return (
        <>
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
                        onChange={handleSearch}
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
                <Formik
                    initialValues={{
                        nameGame: "",
                        linkIOS: "",
                        linkAndroid: "",
                        linkBaseCode: "",
                    }}
                    validationSchema={Yup.object({
                        nameGame: Yup.string().required("Required"),
                        linkIOS: Yup.string(),
                        linkAndroid: Yup.string(),
                        linkBaseCode: Yup.string().required("Required"),
                    })}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <Modal
                            initialFocusRef={nameRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <form onSubmit={formik.handleSubmit}>
                                    <ModalHeader>
                                        Add detail for your game
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        {" "}
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                formik.touched.nameGame &&
                                                formik.errors.nameGame
                                            }
                                        >
                                            <FormLabel mt={4}>
                                                Name game
                                            </FormLabel>
                                            <Input
                                                ref={nameRef}
                                                type="text"
                                                placeholder="Ex: Sky Raptor"
                                                {...formik.getFieldProps(
                                                    "nameGame"
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {formik.errors.nameGame}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                formik.touched.linkIOS &&
                                                formik.errors.linkIOS
                                            }
                                        >
                                            <FormLabel mt={4}>
                                                Link store IOS
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662"
                                                {...formik.getFieldProps(
                                                    "linkIOS"
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {formik.errors.linkIOS}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isInvalid={
                                                formik.touched.linkAndroid &&
                                                formik.errors.linkAndroid
                                            }
                                        >
                                            <FormLabel mt={4}>
                                                Link store Android
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter"
                                                {...formik.getFieldProps(
                                                    "linkAndroid"
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {formik.errors.linkAndroid}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl
                                            isRequired
                                            isInvalid={
                                                formik.touched.linkBaseCode &&
                                                formik.errors.linkBaseCode
                                            }
                                        >
                                            <FormLabel mt={4}>
                                                Link Base code folder
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="Ex: D:\Base\SkyRaptor"
                                                {...formik.getFieldProps(
                                                    "linkBaseCode"
                                                )}
                                            />
                                            <FormErrorMessage>
                                                {formik.errors.linkBaseCode}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            colorScheme="teal"
                                            mr={3}
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                        <Button onClick={onClose}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </Modal>
                    )}
                </Formik>
                {listGameState.map((game, index) => (
                    <GameItem key={game.id} gameDetail={game} />
                ))}
            </Box>
        </>
    );
};

HomePage.propTypes = {};

export default HomePage;
