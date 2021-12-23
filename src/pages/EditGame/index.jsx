import React from 'react';
import { Button, Text, Flex, Box } from '@chakra-ui/react';
import { GalleryEdit, AudioSquare, ArrowRight } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditGame = () => {
  const useparams = useParams();
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
        <Link
          to={'/export/' + useparams.idgame + `/` + useparams.ididea + `/true`}
        >
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
