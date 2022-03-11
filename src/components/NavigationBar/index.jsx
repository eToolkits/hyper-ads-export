import {
  Avatar,
  Box,
  Button,
  Flex,
  Tooltip,
  useColorMode
} from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import {
  AudioSquare,
  Category2,
  ExportSquare,
  GalleryEdit,
  Gameboy,
  Home2,
  Logout,
  Moon,
  Sun1
} from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserData } from '../../action';
import { NaviStyle } from './styles';

const NavigationBar = () => {
  const getlocation = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userData);
  const { colorMode, toggleColorMode } = useColorMode();

  const [navSize, setNavSize] = useState('small');
  const [location, setLocation] = useState('/home');

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem('accessToken');
        dispatch(getUserData(''));
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    setLocation(getlocation.pathname);
  }, [getlocation]);

  return (
    <NaviStyle>
      <div
        className="options"
        style={
          navSize === 'large' ? { width: '200px' } : { width: 'min-content' }
        }
      >
        <Flex>
          <Button
            className="menu-alt"
            onClick={() =>
              navSize === 'small' ? setNavSize('large') : setNavSize('small')
            }
          >
            <Category2 size="20" color="currentColor" variant="Outline" />
          </Button>
          {navSize === 'large' ? (
            <Button
              mx="5"
              className="menu-alt"
              onClick={() => toggleColorMode()}
            >
              {colorMode === 'dark' ? (
                <Moon size="20" color="currentColor" variant="Outline" />
              ) : (
                <Sun1 size="20" color="currentColor" variant="Outline" />
              )}
            </Button>
          ) : (
            ''
          )}
        </Flex>
        <Link to="/">
          <div className={location === '/' ? 'item active' : 'item'}>
            <Box mx="5">
              <Home2
                size="20"
                color="currentColor"
                variant={location === '/' ? 'Bold' : 'Outline'}
              />
            </Box>
            {navSize === 'large' ? <p>Home</p> : ''}
          </div>
        </Link>
        <Link to="/preview">
          <div
            className={location.includes('preview') ? 'item active' : 'item'}
          >
            <Box mx="5">
              <Gameboy
                size="20"
                color="currentColor"
                variant={location === '/export' ? 'Bold' : 'Outline'}
              />
            </Box>
            {navSize === 'large' ? <p>Preview Game</p> : ''}
          </div>
        </Link>
        <div
          className={location.includes('changeassets') ? 'item active' : 'item'}
          style={{ cursor: 'not-allowed' }}
        >
          <Box mx="5">
            <GalleryEdit
              size="20"
              color="currentColor"
              variant={location.includes('changeassets') ? 'Bold' : 'Outline'}
            />
          </Box>
          {navSize === 'large' ? <p>Change Assets</p> : ''}
        </div>
        <div
          className={location.includes('changesounds') ? 'item active' : 'item'}
          style={{ cursor: 'not-allowed' }}
        >
          <Box mx="5">
            <AudioSquare
              size="20"
              color="currentColor"
              variant={location.includes('changesounds') ? 'Bold' : 'Outline'}
            />
          </Box>
          {navSize === 'large' ? <p>Change Sounds</p> : ''}
        </div>
        <div
          className={location.includes('export') ? 'item active' : 'item'}
          style={{ cursor: 'not-allowed' }}
        >
          <Box mx="5">
            <ExportSquare
              size="20"
              color="currentColor"
              variant={location === '/export' ? 'Bold' : 'Outline'}
            />
          </Box>
          {navSize === 'large' ? <p>Export</p> : ''}
        </div>
      </div>
      <div className="user-wrapper">
        <div className="user">
          <Tooltip hasArrow label={userData?.email}>
            <Avatar size="sm" name={userData?.email} src={userData?.photoURL} />
          </Tooltip>
          {navSize === 'large' ? (
            <div className="sign-out" onClick={handleLogOut}>
              <p>Sign Out</p>
              <Box mx="5">
                <Logout size="20" color="currentColor" variant="Outline" />
              </Box>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </NaviStyle>
  );
};

NavigationBar.propTypes = {};

export default NavigationBar;
