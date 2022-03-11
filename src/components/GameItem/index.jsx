import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { ArrowDown3, Trash } from 'iconsax-react';
import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {
    DeleteGameAction,
    SelectGameAction,
    UpdateGameAction
} from '../../action';

const GameItem = (props) => {
  const {
    gameDetail,
    UpdateGameDispatch,
    DeleteGameDispatch,
    SelectGameDispatch,
  } = props;
  const { id } = gameDetail;
  const [gameDetailState, setGameDetailState] = useState(gameDetail);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const onCloseAlert = () => setIsOpenAlert(false);
  const cancelAlertRef = useRef();

  const toast = useToast();
  const nameRef = useRef();
  const finalRef = useRef();

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    const { name, linkStoreIOS, linkStoreAndroid, engine } = values;
    const payload = {
      id,
      name,
      linkStoreIOS,
      linkStoreAndroid,
      engine,
    };
    UpdateGameDispatch(payload);

    setSubmitting(false);
    toast({
      position: 'top',
      title: 'Edit game successfully!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    let timeOut = setTimeout(() => {
      onClose();
      clearTimeout(timeOut);
    }, 2000);
    setGameDetailState(payload);
  };
  const handleDelete = async () => {
    DeleteGameDispatch({ id });
    toast({
      position: 'top',
      title: 'Delete game successfully!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onCloseAlert();
    let timeOut = setTimeout(() => {
      onClose();
      clearTimeout(timeOut);
    }, 1000);
  };
  const handleSelectGame = () => {
    SelectGameDispatch(gameDetail);
  };
  return (
    <Box my="3" ml="3">
      <Formik
        initialValues={{
          name: gameDetailState.name,
          linkStoreIOS: gameDetailState.linkStoreIOS,
          linkStoreAndroid: gameDetailState.linkStoreAndroid,
          engine: gameDetailState.engine,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          linkIOS: Yup.string(),
          linkAndroid: Yup.string(),
        })}
        onSubmit={handleUpdate}
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
                <ModalHeader>Edit info for your game</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  {' '}
                  <FormControl
                    isRequired
                    isInvalid={formik.touched.name && formik.errors.name}
                  >
                    <FormLabel mt={4}>Name game</FormLabel>
                    <Input
                      ref={nameRef}
                      type="text"
                      placeholder={`Ex: ${gameDetailState.name}`}
                      {...formik.getFieldProps('name')}
                    />
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.linkStoreIOS && formik.errors.linkStoreIOS
                    }
                  >
                    <FormLabel mt={4}>Link store IOS</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662"
                      {...formik.getFieldProps('linkStoreIOS')}
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
                    <FormLabel mt={4}>Link store Android</FormLabel>
                    <Input
                      type="text"
                      placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter"
                      {...formik.getFieldProps('linkStoreAndroid')}
                    />
                    <FormErrorMessage>
                      {formik.errors.linkStoreAndroid}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel mt={4}>Engine</FormLabel>
                    <Select
                      defaultValue="phaser"
                      {...formik.getFieldProps('engine')}
                    >
                      <option value="phaser">Phaser</option>
                      <option value="cocos">Cocos</option>
                    </Select>
                    <FormErrorMessage>
                      {formik.errors.linkStoreAndroid}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} type="submit">
                    Save
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => setIsOpenAlert(true)}
                    rightIcon={<Trash color="currentColor" size="20" />}
                  >
                    Delete Game
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Formik>
      <Box display="flex" flexWrap="nowrap" onClick={handleSelectGame}>
        <Link to={`/editgame/` + id}>
          <Button borderRightRadius="0" colorScheme="teal">
            <Text>{gameDetailState.name}</Text>
          </Button>
        </Link>
        <Button px="0" borderLeftRadius="0" onClick={onOpen} colorScheme="teal">
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
                rightIcon={<Trash color="currentColor" size="20" />}
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
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateGameDispatch: (payload) => {
      dispatch(UpdateGameAction(payload));
    },
    DeleteGameDispatch: (payload) => {
      dispatch(DeleteGameAction(payload));
    },
    SelectGameDispatch: (payload) => {
      dispatch(SelectGameAction(payload));
    },
  };
};
export default connect(null, mapDispatchToProps)(GameItem);
