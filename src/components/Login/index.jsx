import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CircularProgress,
  ErrorMessage,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { useState } from 'react';

const Login = ({ handleLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      handleLogin({ email, password });
    } catch (error) {
      setError('Invalid username or password');
      setEmail('');
      setPassword('');
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="test@test.com"
                  size="lg"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="*******"
                    size="lg"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                variant="outline"
                type="submit"
                width="full"
                mt={4}
                isDisabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Box>
        </>
      </Box>
    </Flex>
  );
};
export default Login;
