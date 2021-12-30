import React from 'react';
import SaveTo from '../../components/SaveTo';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { CombineAndExport } from './../../function/combineSingle';

const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;
const fs = window.require('fs');

const ExportContaier = (props) => {
  const { listGame } = props;
  const { idgame, ididea, exportbase } = useParams();
  const toast = useToast();
  // console.log(
  //   '🚀 ~ file: index.jsx ~ line 12 ~ ExportContaier ~ base',
  //   exportbase
  // );

  const [listGameState, setListGameState] = React.useState();

  React.useEffect(() => {
    setListGameState((pre) => [...listGame]);
  }, [listGame]);

  const handleExportAds = (ideaName, directorySave) => {
    let payload;
    const linkBaseCode = listGameState
      .filter((game) => game.id === idgame)[0]
      .idea.filter((item) => item.id === ididea)[0].linkBaseCode;
    const fileNames = fs.readdirSync(linkBaseCode);
    const listFileTemp = fs.readdirSync(TempFolder);

    if (exportbase) {
      const listFileFilter = fileNames.filter(
        (fileName) => !fileName.toLowerCase().includes('git')
      );
      payload = {
        nameGame: listGameState.filter((game) => game.id === idgame)[0].name,
        linkStoreAndroid: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreAndroid,
        linkStoreIOS: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreIOS,
        linkBaseCode,
        listFileFilter,
        listFileNew: [],
        ideaName,
        directorySave,
      };
    } else {
      const listFileFilter = fileNames.filter(
        (fileName) =>
          !fileName.toLowerCase().includes('git') &&
          !fileName.toLowerCase().includes('image') &&
          !fileName.toLowerCase().includes('sound') &&
          !fileName.toLowerCase().includes('map')
      );
      const listFileCombine = [...listFileFilter];
      const listFileNew = [...listFileTemp];
      payload = {
        nameGame: listGameState.filter((game) => game.id === idgame)[0].name,
        linkStoreAndroid: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreAndroid,
        linkStoreIOS: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreIOS,
        linkBaseCode,
        listFileCombine,
        listFileNew,
        ideaName,
        directorySave,
      };
    }
    const result = CombineAndExport(payload);
    result
      ? toast({
          position: 'top',
          title: 'Export game successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      : toast({
          position: 'top',
          title: `Error when export! ${result}`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
  };
  return (
    <div>
      <SaveTo handleExportAds={handleExportAds} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listGame: state.listGameStore,
  };
};
export default connect(mapStateToProps, null)(ExportContaier);
