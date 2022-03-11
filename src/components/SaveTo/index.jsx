import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { ArrowRight } from 'iconsax-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SaveToStyle } from './styles';
//use import syntax will error
const electron = window.require('electron');
let dialog = electron.remote.dialog;

const SaveTo = (props) => {
  const { handleExportAds, exported } = props;
  const toast = useToast();
  const [ideaNameState, setIdeaNameState] = useState('');
  const [directoryState, setDirectoryState] = useState('Not selected yet');

  const handleDirectory = async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    // console.log('directories selected', result);
    if (result.filePaths.length > 0) {
      setDirectoryState((pre) => result.filePaths[0]);
    }
  };
  const handlIdeaGame = (e) => {
    setIdeaNameState(e.target.value);
  };
  const ResetFeild = () => {
    setIdeaNameState('');
    setDirectoryState('Not selected yet');
  };
  const checkValidAllField = () => {
    if (!ideaNameState || directoryState === 'Not selected yet') {
      toast({
        title: 'Please complete all fields!',
        status: 'warning',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
    } else {
      handleExportAds(ideaNameState, directoryState);
      ResetFeild();
    }
  };
  return (
    <SaveToStyle>
      <div className="setup">
        <div className="name-idea">
          <FormControl id="ideaGame" isRequired>
            <FormLabel>Name for Idea</FormLabel>
            <Input
              w="70%"
              placeholder="Ex: Sky solo squad..."
              onChange={handlIdeaGame}
              value={ideaNameState}
            />
          </FormControl>
        </div>
        <div className="save-dir">
          <Input
            w="50%"
            className="mgr30"
            isDisabled
            placeholder="medium size"
            size="md"
            value={directoryState}
          />
          <Button
            mx="5"
            colorScheme="teal"
            variant="outline"
            onClick={handleDirectory}
          >
            Save to ...
          </Button>
        </div>
      </div>
      <Box display="flex">
        <Button colorScheme="teal" size="lg" onClick={checkValidAllField}>
          Export Ads
        </Button>
        <Link
          to="/preview"
          style={exported ? { display: 'block' } : { display: 'none' }}
        >
          <Button
            ml="3"
            colorScheme="teal"
            size="lg"
            rightIcon={<ArrowRight size="20" color="currentColor" />}
          >
            Preview Now
          </Button>
        </Link>
      </Box>
    </SaveToStyle>
  );
};
export default SaveTo;
