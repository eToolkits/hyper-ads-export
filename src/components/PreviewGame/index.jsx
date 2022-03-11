import { Box } from '@chakra-ui/react';

const PreviewGame = ({ linkGame }) => {
  return (
    <Box w="100%" h="100%">
      <iframe
        title="Preview"
        style={{ width: '100%', height: '100%' }}
        src={linkGame}
      ></iframe>
    </Box>
  );
};

export default PreviewGame;
