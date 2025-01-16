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

export default function AdminDashboardLayout({children,title}:DashboardProps) {

 
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const navigate = useNavigate();
  const settings = ['Profile', 'Feedback', 'Logout'];

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

  
        </Box>

        {/* Rest of the Content */}
        {children}
      </Box>

      <FeedbackModal open={isFeedbackOpen} onClose={handleFeedbackClose} />

    </Box>
    
  );
}
