import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
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
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import { ArrowDown3 } from "iconsax-react";
import { Link } from "react-router-dom";
import { ListGameService } from "../../function/utils";
const ListGameSv = new ListGameService();
const GameItem = (props) => {
    const { gameDetail } = props;
    const { id, name, linkStoreIOS, linkStoreAndroid, linkBaseCode } =
        gameDetail;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const onCloseAlert = () => setIsOpenAlert(false);
    const cancelAlertRef = React.useRef();

    const toast = useToast();
    const nameRef = React.useRef();
    const finalRef = React.useRef();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { name, linkStoreIOS, linkStoreAndroid, linkBaseCode } = values;
        const payload = {
            id,
            name,
            linkStoreIOS,
            linkStoreAndroid,
            linkBaseCode,
        };
        ListGameSv.updateGame(payload).then((res) => {
            setSubmitting(false);
            toast({
                position: "top",
                title: "Edit game successfully!",
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
    const handleDelete = async () => {
        ListGameSv.deleteGame(id).then((res) => {
            toast({
                position: "top",
                title: "Delete game successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            let timeOut = setTimeout(() => {
                onClose();
                clearTimeout(timeOut);
            }, 2000);
        });
    };
    return (
        <Box my="3" ml="3">
            <Formik
                initialValues={{
                    name: name,
                    linkStoreIOS: linkStoreIOS,
                    linkStoreAndroid: linkStoreAndroid,
                    linkBaseCode: linkBaseCode,
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
                                    Edit info for your game
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    {" "}
                                    <FormControl
                                        isRequired
                                        isInvalid={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                    >
                                        <FormLabel mt={4}>Name game</FormLabel>
                                        <Input
                                            ref={nameRef}
                                            type="text"
                                            placeholder="Ex: Sky Raptor"
                                            {...formik.getFieldProps("name")}
                                        />
                                        <FormErrorMessage>
                                            {formik.errors.name}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            formik.touched.linkStoreIOS &&
                                            formik.errors.linkStoreIOS
                                        }
                                    >
                                        <FormLabel mt={4}>
                                            Link store IOS
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662"
                                            {...formik.getFieldProps(
                                                "linkStoreIOS"
                                            )}
                                        />
                                        <FormErrorMessage>
                                            {formik.errors.linkStoreIOS}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl
                                        isInvalid={
                                            formik.touched.linkStoreAndroid &&
                                            formik.errors.linkStoreAndroid
                                        }
                                    >
                                        <FormLabel mt={4}>
                                            Link store Android
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter"
                                            {...formik.getFieldProps(
                                                "linkStoreAndroid"
                                            )}
                                        />
                                        <FormErrorMessage>
                                            {formik.errors.linkStoreAndroid}
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
                                    <Button
                                        colorScheme="red"
                                        onClick={() => setIsOpenAlert(true)}
                                    >
                                        Delete Game
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>
            <Box display="flex" flexWrap="nowrap">
                <Link to="editgame">
                    <Button borderRightRadius="0" colorScheme="teal">
                        <Text>{gameDetail.name}</Text>
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

            <AlertDialog
                isOpen={isOpenAlert}
                leastDestructiveRef={cancelAlertRef}
                onClose={onCloseAlert}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete this game
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelAlertRef} onClick={onCloseAlert}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

GameItem.propTypes = {};

export default GameItem;
