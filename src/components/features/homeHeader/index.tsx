import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext, IAuthContext } from '../../../contexts/authContext';
import { UserRole } from '../../../utils/enum/userEnum';
import Logo from '../../../assets/images/logo.svg';
import logOut from '../../../assets/images/log-out.svg';
import down from '../../../assets/images/down.svg';
import up from '../../../assets/images/up.svg';
import person from '../../../assets/images/person.svg';
import { homeHeaderSettings, costumerSetting } from '../../../constants/homeHeader';

import './index.css';

export default function HomeHeader(): JSX.Element {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );
  const { user, logout } = useContext(AuthContext) as IAuthContext;
  const navigate = useNavigate();

  const isLoggedIn = useMemo(() => {
    return !!user;
  }, [user]);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string): void => {
    switch (setting) {
      case 'Log out':
        logout();
        break;
      case 'Sub Account':
        navigate('/subAccount');
        break;
      default:
        setAnchorElUser(null);
        return;
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="homeHeader">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (user.role === UserRole.CUSTOMER || user.role === UserRole.SUBACCOUNT) navigate('/');
            }}
          >
            <Link to={user.role === 'Admin' ? '/admin' : '/'}>
              <img className="logo" src={Logo} alt="logo" />
            </Link>
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
              <Tooltip title="">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    className="avatar"
                    alt="Remy Sharp"
                    src={person}
                  />
                  <Typography className="name">
                    <span className="firstName">{user.firstName && user.lastName
                      ? `${user.firstName}${user.lastName}`
                      : user.username}
                      <img src={anchorElUser ? up : down} alt="" />
                    </span>
                    <span className="email">{user.email}</span>
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', width: '180px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <p className="blueSkyInnovations contentTitle">
                  {user.firstName && user.lastName
                    ? `${user.firstName}${user.lastName}`
                    : user.username}
                </p>
                <p className="contentTitle contentTitleEmail">
                  {user.email}
                </p>
                {user.role === 'Customer' ? costumerSetting.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu(setting);
                    }}
                    disabled={
                      setting !== 'Log out' && setting !== 'Sub Account'}
                  >
                    <Typography textAlign="center">
                      {setting}
                    </Typography>
                    {setting === 'Log out' && <Typography className="logOutIcon">
                      <img src={logOut} alt="log-out" />
                    </Typography>}
                  </MenuItem>
                )) : homeHeaderSettings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu(setting);
                    }}
                    disabled={
                      setting !== 'Log out'}
                  >
                    <Typography textAlign="center">
                      {setting}
                    </Typography>
                    {setting === 'Log out' && <Typography className="logOutIcon">
                      <img src={logOut} alt="log-out" />
                    </Typography>}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
