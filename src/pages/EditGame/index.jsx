import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ArrowRight, AudioSquare, GalleryEdit, Map1 } from 'iconsax-react';
import { Link, useParams } from 'react-router-dom';
import useChangeMap from '../../hook/useChangeMap';

const EditGame = () => {
  const useparams = useParams();
  const { ididea, idgame } = useparams;
  const isChangeMap = useChangeMap();
  return (
    <Flex align="center" direction="column" w="100%" my="30px">
      <Box w="300px">
        <Link to="changeassets">
          <Button w="300px" p="50px" mb="5" colorScheme="green">
            <Text mr="3">Change Assets</Text>
            <GalleryEdit size="20" color="currentColor" />
          </Button>
        </Link>
      </Box>
      <Box w="300px">
        <Link to="changesounds">
          <Button w="300px" p="50px" mb="5" colorScheme="green">
            <Text mr="3">Change Sounds</Text>
            <AudioSquare size="20" color="currentColor" />
          </Button>
        </Link>
      </Box>
      <Box w="300px">
        <Link to="changemap">
          <Button
            w="300px"
            p="50px"
            mb="5"
            colorScheme="green"
            isDisabled={isChangeMap}
          >
            <Text mr="3">Change Map</Text>
            <Map1 size="20" color="currentColor" />
          </Button>
        </Link>
      </Box>
      <Box w="300px">
        <Link to={'/export/' + idgame + `/` + ididea + `/true`}>
          <Button w="300px" p="50px" mb="5" colorScheme="green" mt="50px">
            <Text mr="3">No, Just export</Text>
            <ArrowRight size="20" color="currentColor" />
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default EditGame;
