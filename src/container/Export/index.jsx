import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import SaveTo from '../../components/SaveTo';
import { CombineAndExport } from './../../function/combineSingle';

const TempFolder = process.env.REACT_APP_FOLDER_TEMPORAL;
const fs = window.require('fs');

const ExportContaier = (props) => {
  const { listGame, gameSelected } = props;
  const { idgame, ididea, exportbase } = useParams();
  const toast = useToast();

  const [listGameState, setListGameState] = useState();
  const [exported, setExported] = useState(false);

  useEffect(() => {
    const deepClone = JSON.parse(JSON.stringify(listGame));
    setListGameState((pre) => deepClone);
  }, [listGame]);

  const handleExportAds = (ideaName, directorySave) => {
    console.log(idgame, ididea, exportbase);
    console.log(listGameState.filter((game) => game.id == idgame));
    let payload;
    const linkBaseCode = gameSelected.idea.filter(
      (item) => item.id == ididea
    )[0].linkBaseCode;
    const fileNames = fs.readdirSync(linkBaseCode);
    const listFileTemp = fs.readdirSync(TempFolder);

    if (exportbase == 'true') {
      console.log('exportbase', exportbase);
      const listFileFilter = fileNames.filter(
        (fileName) =>
          !fileName.toLowerCase().includes('git') &&
          !fileName.toLowerCase().includes('index.html')
      );
      const listFileCombine = [...listFileFilter];
      payload = {
        nameGame: listGameState.filter((game) => game.id === idgame)[0].name,
        linkStoreAndroid: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreAndroid,
        linkStoreIOS: listGameState.filter((game) => game.id === idgame)[0]
          .linkStoreIOS,
        linkBaseCode,
        listFileCombine,
        listFileNew: [],
        ideaName,
        directorySave,
      };
    } else {
      const listFileFilter = fileNames.filter(
        (fileName) =>
          !fileName.toLowerCase().includes('git') &&
          !fileName.toLowerCase().includes('index.html')
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
    result ? setExported(true) : setExported(false);
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
      <SaveTo handleExportAds={handleExportAds} exported={exported} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    listGame: state.listGameStore,
    gameSelected: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ExportContaier);
