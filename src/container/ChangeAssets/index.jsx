import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Image,
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
import {
  readInFile,
  writeInFile,
  convertFileToArray,
  convertAssetToBase64,
  convertArrayToFile,
  removeAllFile,
} from './../../Utils';
import Loading from '../../components/Loading';

const fs = window.require('fs');
const TempFolder = './src/TempCombine';

const ChangeAssetsContainer = (props) => {
  const { selectedGame } = props;
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const idgame = params.idgame;
  const ididea = params.ididea;
  const locationSaveFile = `${TempFolder}/Image-${ididea}.js`;

  console.log('ChangeAssetsContainer loaded');

  const [variableListState, setVariableListState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFile = (data) => {
    console.log('🚀 ~ file: index.jsx ~ line 47 ~ handleFile ~ data', data);
    //convert image drag to base64
    var imageAsBase64 = convertAssetToBase64(data.file.path);
    setVariableListState((pre) => {
      pre[data.index].url = `data:image/png;base64,${imageAsBase64}`;
      return pre;
    });
    // console.log(variableListState);
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

  //save file  before change route
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

  //transform data to render
  useEffect(() => {
    //check recent file edit
    const recentFileEdit = fs
      .readdirSync(TempFolder)
      .filter(
        (item) =>
          item.toLowerCase().includes(`${ididea}`) &&
          item.toLowerCase().includes(`image`)
      );
    // console.log(
    //   '🚀 ~ file: index.jsx ~ line 105 ~ useEffect ~ recentFileEdit',
    //   recentFileEdit
    // );

    let variableList;
    // nếu có file cũ thì load file cũ
    if (recentFileEdit.length > 0) {
      const content = readInFile(`${TempFolder}/${recentFileEdit[0]}`);
      variableList = convertFileToArray(content);
    } else {
      // không thì xóa hết
      removeAllFile(TempFolder);
      //load từ base
      const ideaSelect =
        selectedGame.idea[
          selectedGame?.idea?.findIndex((idea) => idea.id === ididea)
        ];

      const ImageFile = fs
        .readdirSync(`${ideaSelect.linkBaseCode}`)
        .filter((item) => item.toLowerCase().includes('image'));

      const contentImageFile = fs.readFileSync(
        `${ideaSelect.linkBaseCode}/${ImageFile[0]}`,
        'utf8'
      );
      variableList = convertFileToArray(contentImageFile);
    }

    //optimize performance
    let dataTranformStateTemp = [];
    variableList.map((item, index) => {
      const img = document.createElement('img');
      img.setAttribute('src', item[1]);
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        dataTranformStateTemp.push({
          name: item[0],
          url: item[1],
          width: w,
          height: h,
        });
        if (index == variableList.length - 1) {
          setVariableListState((pre) => [...dataTranformStateTemp]);
          const time = setTimeout(() => {
            setIsLoading(false);
            clearTimeout(time);
          }, 2000);
          dataTranformStateTemp = [];
        }
      };
    });
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
                  <Th>Name Asset</Th>
                  <Th>Current Asset</Th>
                  <Th>Current Size</Th>
                  <Th>New Asset</Th>
                  <Th>New Size</Th>
                </Tr>
              </Thead>
              <Tbody>
                {variableListState.map((item, index) => {
                  return (
                    <Tr key={index}>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td>{item.name.slice(3, -3)}</Td>
                      <Td>
                        <Image
                          loading="lazy"
                          boxSize="150px"
                          objectFit="contain"
                          src={item.url}
                          alt="Error Image"
                          _hover={{
                            transform: 'scale(1.5)',
                            transition: 'all 0.3s',
                          }}
                        />
                      </Td>
                      <Td>
                        {item.height}x{item.width}
                      </Td>
                      <Td>
                        <DragDrop
                          text="asset"
                          handleFile={handleFile}
                          indexFile={index}
                          type="image/jpeg, image/png"
                        />
                      </Td>
                      <Td>null</Td>
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
                rightIcon={<AudioSquare size="20" color="currentColor" />}
                onClick={() =>
                  handleChangePage(`/editgame/${idgame}/${ididea}/changesounds`)
                }
              >
                Change Sounds
              </Button>{' '}
              <Button
                ml="5"
                colorScheme="green"
                rightIcon={<ExportSquare size="20" color="currentColor" />}
                onClick={() => handleChangePage(`/export/${idgame}/${ididea}/false`)}
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

ChangeAssetsContainer.propTypes = {};

const mapStateToProps = (state) => {
  return {
    selectedGame: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ChangeAssetsContainer);
