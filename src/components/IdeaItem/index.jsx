import React, { useEffect } from "react";
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
import { ArrowDown3, Trash } from "iconsax-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DeleteIdeaAction, UpdateIdeaAction } from "../../action";
const IdeaItem = (props) => {
    const { idGame, ideaDetail, deleteIdeaDispatch, updateIdeaDispatch } =
        props;
    const { id } = ideaDetail;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ideaGameState, setIdeaGameState] = React.useState(ideaDetail);
    const [isOpenAlert, setIsOpenAlert] = React.useState(false);
    const onCloseAlert = () => setIsOpenAlert(false);
    const cancelAlertRef = React.useRef();

    const toast = useToast();
    const nameRef = React.useRef();
    const finalRef = React.useRef();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { name, linkBaseCode } = values;
        const payload = {
            id,
            name,
            linkBaseCode,
            currentGame: idGame,
        };
        setIdeaGameState({
            id,
            name,
            linkBaseCode,
        });
        updateIdeaDispatch(payload);
        setSubmitting(false);
        toast({
            position: "top",
            title: "Edit game successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        let timeOut = setTimeout(() => {
            onClose();
            clearTimeout(timeOut);
        }, 2000);
    };
    const handleDelete = async () => {
        const payload = {
            id,
            currentGame: idGame,
        };
        deleteIdeaDispatch(payload);
        toast({
            position: "top",
            title: "Delete game successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        let timeOut = setTimeout(() => {
            onCloseAlert();
            onClose();
            clearTimeout(timeOut);
        }, 2000);
    };
    return (
        <Box my="3" ml="3">
            <Formik
                initialValues={{
                    name: ideaGameState.name,
                    linkBaseCode: ideaGameState.linkBaseCode,
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
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
                                <ModalHeader>Edit Idea</ModalHeader>
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
                                        isRequired
                                        isInvalid={
                                            formik.touched.linkBaseCode &&
                                            formik.errors.linkBaseCode
                                        }
                                    >
                                        <FormLabel mt={4}>
                                            Link base code
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662"
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
                                        rightIcon={
                                            <Trash
                                                size="20"
                                                schemeColor="currentColor"
                                            />
                                        }
                                    >
                                        Delete Idea
                                    </Button>
                                </ModalFooter>
                            </form>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>
            <Box display="flex" flexWrap="nowrap">
                <Link to={ideaGameState.id}>
                    <Button borderRightRadius="0" colorScheme="teal">
                        <Text>{ideaGameState.name}</Text>
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
                            Delete this idea?
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
                                rightIcon={
                                    <Trash
                                        size="20"
                                        schemeColor="currentColor"
                                    />
                                }
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

IdeaItem.propTypes = {};
const mapDispatchToProps = (dispatch) => {
    return {
        updateIdeaDispatch: (payload) => dispatch(UpdateIdeaAction(payload)),
        deleteIdeaDispatch: (payload) => dispatch(DeleteIdeaAction(payload)),
    };
};
export default connect(null, mapDispatchToProps)(IdeaItem);
