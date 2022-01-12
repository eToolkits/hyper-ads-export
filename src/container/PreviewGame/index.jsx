import React from 'react';
import DragDrop from '../../components/DragDrop';
import { TYPE_HTML } from '../../constant';
import { Box } from '@chakra-ui/react';
import PreviewGame from '../../components/PreviewGame';

const PreviewGameContainer = () => {
  const [linkGameState, setLinkGameState] = React.useState('');
  const handleFile = (data) => {
    setLinkGameState(data.file.path);
  };
  return (
    <>
      <DragDrop text="game" type={TYPE_HTML} handleFile={handleFile} />
      <Box
        width="-webkit-fill-available"
        height="-webkit-fill-available"
        margin="0 auto"
      >
        <PreviewGame linkGame={linkGameState} />
      </Box>
    </>
  );
};

export default PreviewGameContainer;
