import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import iconGG from './../../asset/icongg.svg';
import logoMonster from './../../asset/LOGO.png';
import { AuthContainerStyle } from './styles';
import { getUserData } from '../../action';

const AuthenticationContainer = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const toast = useToast();

  const auth = getAuth();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setCookie('access_token', token, { path: '/' });
        dispatch(getUserData(result.user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast({
          title: `${errorMessage}`,
          status: 'error',
          isClosable: true,
        });
      });
  };

  return (
    <AuthContainerStyle>
      <img className="logo" src={logoMonster} alt="" />
      <button onClick={handleLogin} className="button">
        <img src={iconGG} alt="google login" className="icon"></img>
        <span className="buttonText">Sign in with Google</span>
      </button>
    </AuthContainerStyle>
  );
};

AuthenticationContainer.propTypes = {};

export default AuthenticationContainer;
