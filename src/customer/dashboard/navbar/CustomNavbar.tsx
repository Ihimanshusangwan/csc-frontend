import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Tooltip, Container } from '@mui/material';
import UpdatePasswordModal from '../../UpdatePasswordModal';
import axiosInstance from '../../../axiosConfig';
import { UPDATE_PASSWORD } from '../../../api';
import { useNavigate } from 'react-router-dom';

const settings = ['Dashboard','Update Password', 'Logout', 'Apply For Service'];

const App: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleCloseUserMenu();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleCloseUserMenu();
    location.reload();
  };
  const applyService =() =>{
    navigate('/services');
  }

  const handleMenuClick = (setting: string) => {
    switch (setting) {
      case 'Update Password':
        handleOpenModal();
        break;
      case 'Logout':
        handleLogout();
        break;
      case 'Apply For Service':
        applyService();
        break;
      case 'Dashboard':
        navigate('/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DOKUMENT GURU
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DOKUMENT GURU
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                    <Typography textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <UpdatePasswordModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={async (currentPassword, newPassword) => {
          const response =  await axiosInstance.post(`${UPDATE_PASSWORD}`,{
            currentPassword,
            newPassword
          })
          if(response?.data?.success === false){
            alert(response?.data?.message);
          }
          else{
            alert('Password Updated Successfully! Login Again')
            handleLogout()
          }
        }}
      />
    </>
  );
};

export default App;
