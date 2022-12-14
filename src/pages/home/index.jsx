import {
  Box,
  Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text,
  useDisclosure, useToast
} from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { Formik } from 'formik';
import { AddSquare, SearchNormal1 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { AddGameAction, getUserData, InitGameAction } from '../../action';
import GameItem from '../../components/GameItem';
import { db } from './../../services/firebaseConfig';

const HomePage = (props) => {
  const { listGame, initGameDispatch, addGameDispatch } = props;

  const userData = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listGameState, setListGameState] = useState(() => {});
  const [searchGameState, setSearchGameState] = useState();
  const nameRef = useRef();
  const finalRef = useRef();

  const handleAddGame = (values, { setSubmitting, resetForm }) => {
    const { name, linkIOS, linkAndroid, engine } = values;
    const payload = {
      id: uuid(),
      name: name,
      linkStoreIOS: linkIOS,
      linkStoreAndroid: linkAndroid,
      idea: [],
      engine,
    };
    addGameDispatch(payload);
    toast({
      position: 'top',
      title: 'Add game successfully!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    let timeOut = setTimeout(() => {
      setSubmitting(false);
      resetForm();
      onClose();
      clearTimeout(timeOut);
    }, 2000);
  };
  const handleSearch = (event) => {
    const { value } = event.target;
    let searchResult = searchGameState.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setListGameState(searchResult);
  };
  useEffect(() => {
    setListGameState(listGame);
    setSearchGameState(listGame);
  }, [listGame]);

  useEffect(() => {
    const dataRef = ref(db, 'data/');
    if (userData.accessToken) {
      get(dataRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let convertToArr = [];
            let data = snapshot.val();
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                convertToArr.push({ ...element });
              }
            }
            initGameDispatch(convertToArr);
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userData]);

  useEffect(() => {
    const auth = getAuth();
    if (!userData.accessToken) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(getUserData(user));
        } else {
          dispatch(getUserData(''));
          localStorage.removeItem('accessToken');
        }
      });
    }
  }, []);
  return (
    <Box>
      <Text align="center" fontSize="30" fontWeight="bold">
        CHOOSE GAME
      </Text>
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
      <Box
        display={userData?.accessToken ? 'flex' : 'none'}
        justifyContent="flex-start"
        flexWrap="wrap"
      >
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
            name: '',
            linkIOS: '',
            linkAndroid: '',
            engine: 'phaser',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            linkIOS: Yup.string(),
            linkAndroid: Yup.string(),
          })}
          onSubmit={handleAddGame}
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
                  <ModalHeader>Add detail for your game</ModalHeader>
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
                        placeholder="Ex: Sky Raptor"
                        {...formik.getFieldProps('name')}
                      />
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.linkIOS && formik.errors.linkIOS
                      }
                    >
                      <FormLabel mt={4}>Link store IOS</FormLabel>
                      <Input
                        type="text"
                        placeholder="Ex: https://apps.apple.com/us/app/sky-raptor/id1518974662"
                        {...formik.getFieldProps('linkIOS')}
                      />
                      <FormErrorMessage>
                        {formik.errors.linkIOS}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.linkAndroid && formik.errors.linkAndroid
                      }
                    >
                      <FormLabel mt={4}>Link store Android</FormLabel>
                      <Input
                        type="text"
                        placeholder="Ex: https://play.google.com/store/apps/details?id=com.skyraptor.spaceshooter"
                        {...formik.getFieldProps('linkAndroid')}
                      />
                      <FormErrorMessage>
                        {formik.errors.linkAndroid}
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
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} type="submit">
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          )}
        </Formik>
        {listGameState?.map((game) => (
          <GameItem key={game.id} gameDetail={game} />
        ))}
      </Box>
    </Box>
  );
};

HomePage.propTypes = {};
const mapStateToProps = (state) => {
  return {
    listGame: state.listGameStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initGameDispatch: (payload) => dispatch(InitGameAction(payload)),
    addGameDispatch: (payload) => dispatch(AddGameAction(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
