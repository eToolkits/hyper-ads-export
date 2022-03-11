import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readInFolder } from './../Utils';

const useChangeMap = () => {
  const useparams = useParams();
  const { ididea } = useparams;
  const selectedGame = useSelector((store) => store.gameSelected);
  const [changeMapState, setChangeMapState] = useState(false);
  useEffect(() => {
    const ideaSelect =
      selectedGame.idea[
        selectedGame?.idea?.findIndex((idea) => idea.id === ididea)
      ];
    const listFileBase = readInFolder(ideaSelect.linkBaseCode);
    listFileBase?.map((file) => {
      if (file.toLowerCase().includes('map')) {
        setChangeMapState(true);
      }
    });
  }, []);
  return !changeMapState;
};

export default useChangeMap;
