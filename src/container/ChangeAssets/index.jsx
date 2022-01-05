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
import reactImageSize from 'react-image-size';
import { ExportSquare, AudioSquare, Map1 } from 'iconsax-react';
import DragDrop from '../../components/DragDrop';
import {
  readInFile,
  writeInFile,
  convertFileToArray,
  convertAssetToBase64,
  convertArrayToFile,
  removeAllFile,
} from './../../Utils';
import { TYPE_IMG } from '../../constant';
import useChangeMap from '../../hook/useChangeMap';

const fs = window.require('fs');
const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;

const ChangeAssetsContainer = (props) => {
  const { selectedGame } = props;
  const navigate = useNavigate();
  const toast = useToast();
  const params = useParams();
  const idgame = params.idgame;
  const ididea = params.ididea;
  const isChangeMap = useChangeMap();
  const locationSaveFile = `${TempFolder}/Image-${ididea}.js`;

  console.log('ChangeAssetsContainer loaded');

  const [variableListState, setVariableListState] = useState([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleFile = async (data) => {
    //convert image drag to base64
    var imageAsBase64 = convertAssetToBase64(data.file.path);
    const { width, height } = await reactImageSize(data.file.path);
    setVariableListState((pre) => {
      pre[data.index].url = `data:image/png;base64,${imageAsBase64}`;
      pre[data.index]['newWidth'] = width;
      pre[data.index]['newHeight'] = height;
      return pre;
    });
    setTriggerRerender(!triggerRerender);
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
    variableList.map(async (item, index) => {
      const { width, height } = await reactImageSize(item[1]);
      dataTranformStateTemp.push({
        name: item[0],
        url: item[1],
        width,
        height,
      });
      if (index == variableList.length - 1) {
        setVariableListState((pre) => [...dataTranformStateTemp]);
        dataTranformStateTemp = [];
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
                        key={index}
                        text="asset"
                        handleFile={handleFile}
                        indexFile={index}
                        type={TYPE_IMG}
                      />
                    </Td>
                    <Td>
                      {item.newHeight
                        ? item.newHeight + 'x' + item.newWidth
                        : 'Null'}
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
              rightIcon={<AudioSquare size="20" color="currentColor" />}
              onClick={() =>
                handleChangePage(`/editgame/${idgame}/${ididea}/changesounds`)
              }
            >
              Change Sounds
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

ChangeAssetsContainer.propTypes = {};

const mapStateToProps = (state) => {
  return {
    selectedGame: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ChangeAssetsContainer);
