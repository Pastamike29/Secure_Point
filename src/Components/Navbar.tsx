import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import FeedbackModal from '../Pages/User/page/Page/FeedbackModal'; // Import your modal component
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../assets/Themes/ThemeContext';
import LoginModal from '../Login/LoginModal';

export default function ResponsiveAppBar() {
  const pages = ['Lesson', 'Code Example', 'Overview', 'Quiz', 'ScoreBoard'];
  const settings = ['Profile', 'Feedback', 'Logout'];
  const navigate = useNavigate();
  const { toggleTheme, mode } = useColorMode();

  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for Login Modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // State for modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage (or session)
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }
  }, []);

  const handleNavigate = (page) => {
    switch (page) {
      case 'Lesson':
        navigate('/LessonPage');
        break;
      case 'Code Example':
        navigate('/vulnerabilities/Insecure SSL');
        break;
      case 'Overview':
        navigate('/Overview');
        break;
      case 'Quiz':
        navigate('/Quiz');
        break;
      case 'ScoreBoard':
        navigate('/ScoreBoard');
        break;
      default:
        navigate('/');
    }
    handleCloseNavMenu();
  };

  const handleSetting = (setting) => {
    switch (setting) {
      case 'Profile':
        navigate('/ProfilePage');
        break;
      case 'Feedback':
        setIsFeedbackOpen(true);
        break;
      case 'Logout':
        localStorage.removeItem('token'); // Remove token on logout
        setIsLoggedIn(false); // Update state
        navigate('/');
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const handleFeedbackClose = () => {
    setIsFeedbackOpen(false);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorElUser(event.currentTarget);
    } else {
      setIsLoginOpen(true); // Open Login Modal if not logged in
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ maxHeight: '7.5vh' }}>
        <Container maxWidth={false} sx={{ maxWidth: '190vh' }}>
          <Toolbar disableGutters>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Flogo_SecureP.png?alt=media&token=349d0a70-d898-44f0-a92d-5ce252448c6a" 
              alt="Logo"
              style={{
                height: '40px', 
                marginRight: '10px', 
              }}
            />
            <Box sx={{ display: 'flex', cursor: 'pointer', mr: 'auto' }} onClick={() => navigate('/')}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 7,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SecurePoint
              </Typography>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleNavigate(page)} sx={{ mx: 0.5 }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} onClick={() => handleNavigate(page)} sx={{ my: 1, mx: 0.5, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSetting(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Only show LoginModal if user is not logged in */}
      {!isLoggedIn && <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}

      {/* Feedback Modal */}
      <FeedbackModal open={isFeedbackOpen} onClose={handleFeedbackClose} />
    </>
  );
}
