import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { ExportSquare, AudioSquare } from 'iconsax-react';
import DragDrop from '../../components/DragDrop';
import { DataProcses } from './../../Utils';
import Loading from '../../components/Loading';

const fs = window.require('fs');
const TempFolder = './src/TempCombine';

const ChangeSoundsContainer = (props) => {
  const { selectedGame } = props;
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const idgame = params.idgame;
  const ididea = params.ididea;
  console.log('ChangeSoundsContainer loaded');

  const [variableListState, setVariableListState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clearFile, setClearFile] = useState(true);

  const handleFile = (data) => {
    var soundAsBase64 = fs.readFileSync(data.file.path, 'base64');
    console.log(
      '🚀 ~ file: index.jsx ~ line 142 ~ handleFile ~ soundAsBase64',
      soundAsBase64
    );
    setVariableListState((pre) => {
      pre[data.index].url = `data:audio/mpeg;base64,${soundAsBase64}`;
      return pre;
    });
    handleSaveFile();
  };
  const handleSaveFile = () => {
    try {
      fs.writeFileSync(
        `${TempFolder}/Sound.js`,
        variableListState
          .map((item) => `var ${item.name} = "${item.src}";`)
          .join('\n')
      );
      toast({
        title: `Save Asset succeslully!`,
        position: 'top',
        isClosable: true,
        status: 'success',
      });
    } catch (error) {
      console.error(error);
    }
  };

  //save file  before change route
  const handleChangePage = (route) => {
    handleSaveFile();
    navigate(`${route}`);
  };

  //transform data to render
  useEffect(() => {
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

    const variableList = contentSoundFile
      .split('var ')
      .map((item) => {
        return item
          .split(' = ')
          .map((item, index) =>
            index == 1
              ? item.trim().replace(/["]/g, '').slice(0, -1)
              : item.trim().replace(/["]/g, '')
          );
      })
      .slice(1);

    // //optimize performance
    let dataTranformStateTemp = [];
    variableList.map((item, index) => {
      dataTranformStateTemp.push({
        name: item[0],
        src: item[1],
      });
      if (index == variableList.length - 1) {
        setVariableListState((pre) => [...dataTranformStateTemp]);
        const time = setTimeout(() => {
          setIsLoading(false);
          clearTimeout(time);
        }, 2000);
        dataTranformStateTemp = [];
      }
    });
  }, []);
  // clear old file temp when load component
  useEffect(() => {
    if (clearFile) {
      fs.readdirSync(TempFolder)
        .filter((item) => item.toLowerCase().includes('sound'))
        .forEach((file) => {
          console.log(file);
          fs.unlink(`./src/TempCombine/${file}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      setClearFile(false);
    }
    handleSaveFile()
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                          <source src={item.src} />
                        </audio>
                      </Td>
                      <Td>
                        <DragDrop
                          text="asset"
                          handleFile={handleFile}
                          indexFile={index}
                          type="audio/mp3, audio/mpeg"
                        />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Flex justifyContent="flex-end" mt="5">
            <Box>
              <Button
                colorScheme="green"
                rightIcon={<AudioSquare size="20" color="currentColor" />}
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
                onClick={() => handleChangePage(`/export/${idgame}/${ididea}`)}
              >
                Export Now
              </Button>{' '}
            </Box>
          </Flex>
        </Box>
      )}
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
