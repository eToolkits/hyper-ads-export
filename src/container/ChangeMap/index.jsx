import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import { AudioSquare, ExportSquare, GalleryEdit } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DragDrop from '../../components/DragDrop';
import { TYPE_JSON } from '../../constant';
import { readInFile, writeInFile } from '../../Utils';

const fs = window.require('fs');
const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;

const ChangeMapContainer = (props) => {
  const { selectedGame } = props;
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const idgame = params.idgame;
  const ididea = params.ididea;

  const locationSaveFile = `${TempFolder}/Map-${ididea}.json`;
  console.log('ChangeMapContainer loaded');

  const [currentMapDataState, setCurrentMapDataState] = useState('');
  const [newMapDataState, setNewMapDataState] = useState();

  const handleFile = (data) => {
    const readResult = readInFile(data.file.path);
    setNewMapDataState(() => readResult);
    const writeResult = writeInFile(locationSaveFile, readResult);
    writeResult
      ? toast({
          title: `Save Asset succeslully!`,
          position: 'top',
          isClosable: true,
          status: 'success',
        })
      : toast({
          title: `Fail to seve Asset!`,
          position: 'top',
          isClosable: true,
          status: 'error',
        });
  };
  const handleChangePage = (route) => {
    if (newMapDataState) {
      const result = writeInFile(locationSaveFile, newMapDataState);
      result
        ? toast({
            title: `Save Asset succeslully!`,
            position: 'top',
            isClosable: true,
            status: 'success',
          })
        : toast({
            title: `Fail to seve Asset!`,
            position: 'top',
            isClosable: true,
            status: 'error',
          });
    }
    navigate(`${route}`);
  };

  useEffect(() => {
    const recentFileEdit = fs
      .readdirSync(TempFolder)
      .filter(
        (item) =>
          item.toLowerCase().includes(`${ididea}`) &&
          item.toLowerCase().includes(`map`)
      );
    if (recentFileEdit.length > 0) {
      const content = readInFile(`${TempFolder}/${recentFileEdit[0]}`);
      setCurrentMapDataState(content);
    } else {
      fs.readdirSync(TempFolder)
        .filter((item) => !item.toLowerCase().includes(`${ididea}`))
        .forEach((file) => {
          fs.unlink(`./src/TempCombine/${file}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      const ideaSelect =
        selectedGame.idea[
          selectedGame?.idea?.findIndex((idea) => idea.id === ididea)
        ];

      const MapFile = fs
        .readdirSync(`${ideaSelect.linkBaseCode}`)
        .filter((item) => item.toLowerCase().includes('map'));

      const contentMapFile = fs.readFileSync(
        `${ideaSelect.linkBaseCode}/${MapFile[0]}`,
        'utf8'
      );
      setCurrentMapDataState((pre) => contentMapFile);
    }
  }, []);
  return (
    <>
      <Box mb="5">
        <Box height="75vh" overflowY="scroll">
          <Table w="100%" my="5" variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Current Map</Th>
                <Th>New Map</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Textarea type="text" value={currentMapDataState} rows="18" />
                </Td>
                <Td>
                  <DragDrop
                    text="asset"
                    handleFile={handleFile}
                    type={TYPE_JSON}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="flex-end" mt="40px">
          <Box>
            <Button
              colorScheme="green"
              rightIcon={<AudioSquare size="20" color="currentColor" />}
              onClick={() =>
                handleChangePage(`/editgame/${idgame}/${ididea}/changesounds`)
              }
            >
              Change Sounds
            </Button>{' '}
            <Button
              colorScheme="green"
              rightIcon={<GalleryEdit size="20" color="currentColor" />}
              onClick={() =>
                handleChangePage(`/editgame/${idgame}/${ididea}/changeassets`)
              }
            >
              Change Assets
            </Button>{' '}
            <Button
              ml="5"
              colorScheme="green"
              rightIcon={<ExportSquare size="20" color="currentColor" />}
              onClick={() =>
                handleChangePage(`/export/${idgame}/${ididea}/false`)
              }
            >
              Export Now
            </Button>{' '}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedGame: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ChangeMapContainer);
