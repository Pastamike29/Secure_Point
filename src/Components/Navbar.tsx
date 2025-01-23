import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FeedbackModal from '../Pages/User/page/Page/FeedbackModal'; // Import your modal component
import { useNavigate } from 'react-router-dom';
import LoginModal from '../Login/LoginModal';
import ThemeToggle from '../assets/Themes/ThemeToggle';

export default function ResponsiveAppBar() {
  const pages = ['Lesson', 'Code Example', 'Overview', 'Quiz'];
  const settings = ['Profile', 'Feedback', 'Logout'];
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for Login Modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // State for modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [firstIssueName, setFirstIssueName] = useState<string | null>(null); // State for first issueName
  const [isLoading, setIsLoading] = useState(true); // Loading state for the menu

  useEffect(() => {
    // Check if the token exists in sessionStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    }

    // Fetch first issueName from the API
    const fetchFirstIssueName = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vulnerability-type');
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          setFirstIssueName(data[0].issueName); // Get the first issueName
        }
      } catch (error) {
        console.error('Failed to fetch issue names:', error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchFirstIssueName();
  }, []);

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'Lesson':
        navigate('/LessonPage');
        break;
      case 'Lesson2':
        navigate('/LessonPage/issueName 3')
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
                  <MenuItem
                    key={page}
                    onClick={() => handleNavigate(page)}
                    sx={{
                      mx: 0.5,
                      color: page === 'Lesson2' && isLoading ? 'gray' : 'inherit',
                      pointerEvents: page === 'Lesson2' && isLoading ? 'none' : 'auto',
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleNavigate(page)}
                  sx={{
                    my: 1,
                    mx: 0.5,
                    color: page === 'Lesson2' && isLoading ? 'gray' : 'white',
                    pointerEvents: page === 'Lesson2' && isLoading ? 'none' : 'auto',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0, display: 'flex', gap: '10px', alignItems: 'center' }}>
              <ThemeToggle />

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <StarIcon sx={{ color: 'gold', fontSize: '2rem' }} />
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
