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
import { useAuth } from '../Login/Component/AuthContext'; // 🔹 Import Auth Context
import SearchBar from './SearchBar';
import axios from 'axios';

export default function ResponsiveAppBar() {
  const pages = ['Lesson', 'Code Example', 'Overview', 'Quiz'];
  const settings = ['Profile', 'Feedback', 'Logout'];
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth(); // 🔹 Get role from context

  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for Login Modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isAdmin, setIsAdmin] = useState(false); // 🔹 New state for admin check
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElQuiz, setAnchorElQuiz] = useState<null | HTMLElement>(null); // State for Quiz dropdown

  // State for modals
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/check', { withCredentials: true });

        if (response.status === 200) {
          setIsLoggedIn(true);

          // ✅ Check user role from cookie
          const role = document.cookie.split('; ').find(row => row.startsWith('user_role='));
          setIsAdmin(role?.split('=')[1] === 'admin'); // ✅ Fix role detection
        }
      } catch (error) {
        console.error('Failed to verify authentication:', error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    verifyAuth();
  }, [isAuthenticated]); // ✅ Ensures navbar updates after login  


  const handleNavigate = (page: string) => {
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
      default:
        navigate('/');
    }
    handleCloseNavMenu();
  };

  const handleQuizNavigate = (submenu: string) => {
    switch (submenu) {
      case 'Quiz':
        navigate('/Quiz');
        break;
      case 'Scoreboard':
        navigate('/Scoreboard');
        break;
      default:
        break;
    }
    handleCloseQuizMenu();
  };

  const handleSetting = async (setting: string) => {
    console.log('Clicked Setting:', setting); // ✅ Debugging Log

    switch (setting) {
      case 'Profile':
        console.log('Navigating to ProfilePage...'); // ✅ Log before navigating
        navigate('/ProfilePage');
        break;
      case "Feedback":
        console.log("Opening Feedback Modal..."); // ✅ Debug Log
        setIsFeedbackOpen(true); // ✅ This should trigger re-render
        break;
      case 'Logout':
        try {
          await axios.post(
            "http://localhost:5000/auth/logout",
            {},
            { withCredentials: true }
          );
          console.log("Successfully logged out!");
          document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setIsLoggedIn(false);
          setIsAdmin(false);
          navigate("/LoginPage");
        } catch (error) {
          console.error("Logout failed:", error);
        }
        break;
      default:
        break;
    }
  };


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });

      console.log('Successfully logged out!');

      // ✅ Clear Cookies on frontend (For extra safety, but backend is main)
      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/LoginPage');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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

  const handleOpenQuizMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElQuiz(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseQuizMenu = () => {
    setAnchorElQuiz(null);
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
                {pages.map((page) =>
                  page === 'Quiz' ? (
                    <MenuItem
                      key={page}
                      onClick={handleOpenQuizMenu}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={page} onClick={() => handleNavigate(page)}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={page === 'Quiz' ? handleOpenQuizMenu : () => handleNavigate(page)}
                  sx={{
                    my: 1,
                    mx: 0.5,
                    color: 'white',
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      transform: 'scale(1.05)', // Slight scaling for better UX
                    },
                    '&:active': {
                      transform: 'scale(0.98)', // Click feedback
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* 🔹 Admin Button - Only Shows for Admins */}
            {isAdmin && (
              <Button
                onClick={() => navigate('/admin/UserManagement')}
                sx={{
                  my: 1,
                  mx: 1.5,
                  color: 'white',
                  fontSize: '1rem',
                  bgcolor: 'red',
                  '&:hover': {
                    bgcolor: 'darkred',
                  },
                }}
              >
                Admin Panel
              </Button>
            )}

            {/* Quiz Dropdown */}
            <Menu
              id="quiz-menu"
              anchorEl={anchorElQuiz}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElQuiz)}
              onClose={handleCloseQuizMenu}
              sx={{
                mt: 1.5,
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 150,
                  boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                },
              }}
            >
              <MenuItem
                onClick={() => handleQuizNavigate('Quiz')}
                sx={{
                  px: 2,
                  py: 1,
                  transition: 'background-color 0.1s ease-out',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                }}
              >
                Quiz
              </MenuItem>

              <MenuItem
                onClick={() => handleQuizNavigate('Scoreboard')}
                sx={{
                  px: 2,
                  py: 1,
                  transition: 'background-color 0.1s ease-out',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                }}
              >
                Scoreboard
              </MenuItem>
            </Menu>

            <Box>
              <SearchBar />
            </Box>
            {/* User Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Menu */}
              <Tooltip title="User Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1.5 }}>
                  <StarIcon sx={{ color: 'gold', fontSize: '2.2rem' }} />
                </IconButton>
              </Tooltip>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                  mt: 1.5,
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    minWidth: 180,
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                  },
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleSetting(setting)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                      },
                    }}
                  >
                    <Typography textAlign="center" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {!isLoggedIn && <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
      <FeedbackModal open={isFeedbackOpen} onClose={handleFeedbackClose} />
    </>
  );
}
