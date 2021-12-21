import React from 'react';
import { connect } from 'react-redux';
import SaveTo from '../../components/SaveTo';

const ExportPage = (props) => {
  const { listGameStore, gameSelectedStore } = props;
  const [listGameState, setListGameState] = React.useState([]);
  const [gameSelectedState, setgameSelectedState] = React.useState([]);
  React.useEffect(() => {
    setListGameState((pre) => [...listGameStore]);
    setgameSelectedState((pre) => [...setListGameState]);
  }, [listGameStore, gameSelectedStore]);
  return (
    <>
      <SaveTo allGame={listGameState} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listGameStore: state.listGameStore,
    gameSelectedStore: state.gameSelected,
  };
};
export default connect(mapStateToProps, null)(ExportPage);
