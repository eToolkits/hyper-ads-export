import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import { ExportSquare, GalleryEdit, Map1 } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DragDrop from '../../components/DragDrop';
import { TYPE_AUDIO } from '../../constant';
import useChangeMap from '../../hook/useChangeMap';
import {
  convertArrayToFile,
  convertAssetToBase64,
  convertFileToArray,
  readInFile,
  writeInFile
} from './../../Utils';
const fs = window.require('fs');

const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;

const ChangeSoundsContainer = (props) => {
  const { selectedGame } = props;
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const isChangeMap = useChangeMap();
  const idgame = params.idgame;
  const ididea = params.ididea;
  const locationSaveFile = `${TempFolder}/Sound-${ididea}.js`;
  console.log('ChangeSoundsContainer loaded');

  const [variableListState, setVariableListState] = useState([]);

  const handleFile = (data) => {
    //convert sound drag to base64
    var soundAsBase64 = convertAssetToBase64(data.file.path);
    setVariableListState((pre) => {
      pre[data.index].url = `data:audio/mpeg;base64,${soundAsBase64}`;
      return pre;
    });
    const result = writeInFile(
      locationSaveFile,
      convertArrayToFile(variableListState)
    );
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
  };
  //save file before change route
  const handleChangePage = (route) => {
    const result = writeInFile(
      locationSaveFile,
      convertArrayToFile(variableListState)
    );
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
    navigate(`${route}`);
  };

  //check recent file, transform data to render
  useEffect(() => {
    const recentFileEdit = fs
      .readdirSync(TempFolder)
      .filter(
        (item) =>
          item.toLowerCase().includes(`${ididea}`) &&
          item.toLowerCase().includes(`sound`)
      );
    let variableList;
    if (recentFileEdit?.length > 0) {
      const content = readInFile(`${TempFolder}/${recentFileEdit[0]}`);
      variableList = convertFileToArray(content);
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

      const SoundFile = fs
        .readdirSync(`${ideaSelect.linkBaseCode}`)
        .filter((item) => item.toLowerCase().includes('sound'));

      const contentSoundFile = fs.readFileSync(
        `${ideaSelect.linkBaseCode}/${SoundFile[0]}`,
        'utf8'
      );
      variableList = convertFileToArray(contentSoundFile);
    }

    //optimize performance
    let dataTranformStateTemp = [];
    variableList.map((item, index) => {
      dataTranformStateTemp.push({
        name: item[0],
        url: item[1],
      });
      if (index == variableList.length - 1) {
        // console.log(dataTranformStateTemp)
        setVariableListState((pre) => [...dataTranformStateTemp]);
        setVariableListState((pre) => [...dataTranformStateTemp]);
        // dataTranformStateTemp = [];
      }
    });
  }, []);
  return (
    <>
      <Box mb="5">
        <Box height="75vh" overflowY="scroll">
          <Table w="100%" my="5" variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th textAlign="center">Index</Th>
                <Th>Name Sound</Th>
                <Th>Current Sound</Th>
                <Th>New Sound</Th>
              </Tr>
            </Thead>
            <Tbody>
              {variableListState.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td>{item.name.slice(0, -3)}</Td>
                    <Td>
                      <audio controls>
                        <source src={item.url} />
                      </audio>
                    </Td>
                    <Td>
                      <DragDrop
                        text="asset"
                        handleFile={handleFile}
                        indexFile={index}
                        type={TYPE_AUDIO}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="flex-end" mt="40px">
          <Box>
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
              colorScheme="green"
              rightIcon={<Map1 size="20" color="currentColor" />}
              onClick={() =>
                handleChangePage(`/editgame/${idgame}/${ididea}/changemap`)
              }
              isDisabled={isChangeMap}
            >
              Change Map
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

ChangeSoundsContainer.propTypes = {};

const mapStateToProps = (state) => {
  return {
    selectedGame: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ChangeSoundsContainer);
