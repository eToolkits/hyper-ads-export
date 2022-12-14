import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { AddSquare, SearchNormal1 } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { AddIdeaAction } from '../../../action';
import IdeaItem from '../../../components/IdeaItem';
const SelectIdeaPage = (props) => {
  const { gameSelected, addIdeaDispatch } = props;
  const params = useParams();
  const idgame = params.idgame;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listIdeaState, setListIdeaState] = useState([]);
  const [searchIdeaState, setSearchIdeaState] = useState();

  const nameRef = useRef();
  const finalRef = useRef();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { name, linkBaseCode } = values;
    const payload = {
      id: uuid(),
      name: name,
      linkBaseCode: linkBaseCode,
      parentGameId: idgame,
    };
    addIdeaDispatch(payload);
    setSubmitting(false);
    toast({
      position: 'top',
      title: 'Add game successfully!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    let timeOut = setTimeout(() => {
      resetForm();
      onClose();
      clearTimeout(timeOut);
    }, 2000);
  };
  const handleSearch = (event) => {
    const { value } = event.target;
    let searchResult = searchIdeaState.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setListIdeaState(searchResult);
  };

  useEffect(() => {
    setListIdeaState(gameSelected.idea || []);
    setSearchIdeaState(gameSelected.idea || []);
  }, [gameSelected]);

  return (
    <>
      <Text align="center" fontSize="30" fontWeight="bold">
        CHOOSE IDEA
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
      <Box display="flex" justifyContent="flex-start" flexWrap="wrap">
        <Button
          m="3"
          onClick={onOpen}
          leftIcon={<AddSquare color="currentColor" />}
          colorScheme="blue"
        >
          <Text mr="0">Add Idea</Text>
        </Button>
        <Formik
          initialValues={{
            name: '',
            linkBaseCode: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            linkBaseCode: Yup.string().required('Required'),
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
                  <ModalHeader>Add Idea</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    {' '}
                    <FormControl
                      isRequired
                      isInvalid={formik.touched.name && formik.errors.name}
                    >
                      <FormLabel mt={4}>Title idea</FormLabel>
                      <Input
                        ref={nameRef}
                        type="text"
                        placeholder="Ex: Sky Raptor"
                        {...formik.getFieldProps('name')}
                      />
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={
                        formik.touched.linkBaseCode &&
                        formik.errors.linkBaseCode
                      }
                    >
                      <FormLabel mt={4}>Link base code</FormLabel>
                      <Input
                        type="text"
                        placeholder="Ex: D:/order"
                        {...formik.getFieldProps('linkBaseCode')}
                      />
                      <FormErrorMessage>
                        {formik.errors.linkBaseCode}
                      </FormErrorMessage>
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
        {listIdeaState?.map((idea) => (
          <IdeaItem key={idea.id} idGame={idgame} ideaDetail={idea} />
        ))}
      </Box>
    </>
  );
};

SelectIdeaPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    gameSelected: state.gameSelected,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIdeaDispatch: (payload) => dispatch(AddIdeaAction(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectIdeaPage);
