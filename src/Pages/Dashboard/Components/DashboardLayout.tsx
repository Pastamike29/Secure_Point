import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import FeedbackModal from '../../../Pages/User/page/Page/FeedbackModal';
import LoginModal from '../../../Login/LoginModal';
import DashboardSidebar from './DashboardSidebar';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../../../Components/Chatbot';
import ThemeToggle from '../../../assets/Themes/ThemeToggle';

export default function DashboardLayout({ children, title }: { children?: React.ReactNode; title?: string }) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const settings = ['Profile', 'Feedback', 'Logout'];

  const handleSetting = (setting: string) => {
    switch (setting) {
      case 'Profile':
        navigate('/ProfilePage');
        break;
      case 'Feedback':
        setIsFeedbackOpen(true);
        break;
      case 'Logout':
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        break;
      default:
        break;
    }
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true); // Open LoginModal if not logged in
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLoginClose = (success: boolean) => {
    setIsLoginOpen(false);
    if (success) {
      setIsLoggedIn(true);
      localStorage.setItem('token', 'your-auth-token'); // Store a token for session persistence
    }
  };

  const handleFeedbackClose = () => setIsFeedbackOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box sx={{ width: '20%' }}>
        <DashboardSidebar />
      </Box>

      <Box component="main" sx={{ width: '80%', padding: '16px' }}>
        <Toolbar />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h4" component="div">
            {title}
          </Typography>
          <ThemeToggle />
        </Box>
        {children}
      </Box>

      <Chatbot />
    </Box>
  );
}
