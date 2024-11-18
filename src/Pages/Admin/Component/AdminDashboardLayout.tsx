import React, { Children, useState } from 'react';
import {
  Box, Toolbar, CssBaseline, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography
} from '@mui/material';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../../../assets/Themes/ThemeContext';
import FeedbackModal from '../../../Pages/User/page/Page/FeedbackModal';


interface DashboardProps {
  children?: React.ReactNode;
  title?: string;


}

export default function DashboardLayout({children,title}:DashboardProps) {

  const handleSetting = (setting: string) => {
    switch (setting) {
      case 'Profile':
        navigate('/Profile');
        break;
      case 'Feedback':
        setIsFeedbackOpen(true);
        break;
      case 'Logout':
        navigate('/Logout');
        break;
    }
  };
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const navigate = useNavigate();
  const settings = ['Profile', 'Feedback', 'Logout'];
  const { toggleTheme, mode } = useColorMode();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFeedbackClose = () => {
    setIsFeedbackOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar */}
      <Box sx={{ width: '20%' }}>
        <AdminDashboardSidebar />
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ width: '74%', padding: '16px' }}>
        <Toolbar />

        {/* Header with Dashboard Text and User Menu */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          {/* Dashboard Title */}
          <Typography variant="h4" component="div">
            {title}
          </Typography>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Mike" src="/static/images/avatar/2.jpg" />
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
        </Box>

        {/* Rest of the Content */}
        {children}
      </Box>

      <FeedbackModal open={isFeedbackOpen} onClose={handleFeedbackClose} />

    </Box>
    
  );
}
