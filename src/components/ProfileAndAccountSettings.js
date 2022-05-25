import React,{useContext} from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { LoginContext } from '../contexts/LoginContext';

const accountSettings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ProfileAndAccountSettings = ({fullName}) => {

  const loginContext = useContext(LoginContext)
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    let menuSelected = e.target.innerText;
    console.log(menuSelected);
    switch (menuSelected) {
      case 'Profile':
        
        break;
      case 'Account':
        
        break;
      case 'Dashboard':
        
        break;
      case 'Logout':
        loginContext.SetLogInStatus(false);
        break;
    
      default:
        break;
    }
    setAnchorElUser(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${(name.split(' ')[0][0]).toUpperCase()}${(name.split(' ')[1][0]).toUpperCase()}`,
    };
  }

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <div className='rounded-full border-2 border-white hover:border-red-500'><Avatar {...stringAvatar(fullName)} /></div>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {accountSettings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  )
}

export default ProfileAndAccountSettings
