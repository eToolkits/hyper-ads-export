import { useToast } from '@chakra-ui/react';
import {
  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../action';
import Login from '../../components/Login';
import logoMonster from './../../asset/LOGO.png';
import { AuthContainerStyle } from './styles';

const AuthenticationContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const auth = getAuth();
  const handleLogin = (payload) => {
    if (!payload.email.includes('@monsterstudio')) {
      toast({
        title: `Your account have no permission!`,
        status: 'error',
        isClosable: true,
      });
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(getUserData(user));
          localStorage.setItem('accessToken', JSON.stringify(user.accessToken));
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes('(auth/email-already-in-use)')) {
            signInWithEmailAndPassword(auth, payload.email, payload.password)
              .then((userCredential) => {
                const user = userCredential.user;
                dispatch(getUserData(user));
                localStorage.setItem(
                  'accessToken',
                  JSON.stringify(user.accessToken)
                );
              })
              .catch((error) => {
                const errorMessage = error.message;
                toast({
                  title: `${errorMessage}`,
                  status: 'error',
                  isClosable: true,
                });
                setIsLoading(false);
              });
          } else {
            console.log(error);
            toast({
              title: `${errorMessage}`,
              status: 'error',
              isClosable: true,
            });
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <AuthContainerStyle>
      <img src={logoMonster} style={{ width: '200px' }} alt="" />
      <Login handleLogin={handleLogin} isLoading={isLoading} />
    </AuthContainerStyle>
  );
};

AuthenticationContainer.propTypes = {};

export default AuthenticationContainer;
