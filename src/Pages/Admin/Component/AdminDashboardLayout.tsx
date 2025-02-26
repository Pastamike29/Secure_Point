import React, { useState } from 'react';
import {
  Box, Toolbar, CssBaseline, Typography, useMediaQuery, IconButton, Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminDashboardSidebar from './AdminDashboardSidebar';
import FeedbackModal from '../../../Pages/User/page/Page/FeedbackModal';

interface DashboardProps {
  children?: React.ReactNode;
  title?: string;
}

export default function AdminDashboardLayout({ children, title }: DashboardProps) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:900px)'); // Detects small screens

  const handleFeedbackClose = () => {
    setIsFeedbackOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* ✅ Sidebar - Responsive */}
      {isSmallScreen ? (
        // Mobile Drawer
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: '70%', maxWidth: 250 }, // Auto scale but max 250px
          }}
        >
          <AdminDashboardSidebar />
        </Drawer>
      ) : (
        // Desktop Sidebar
        <Box sx={{ width: '20%', flexShrink: 0 }}>
          <AdminDashboardSidebar />
        </Box>
      )}

      {/* ✅ Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          width: isSmallScreen ? '100%' : '74%', // Keep 74% width on large screens
        }}
      >
        <Toolbar />

        {/* ✅ Header with Title & Menu Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          {/* Sidebar Toggle for Mobile */}
          {isSmallScreen && (
            <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Dashboard Title */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Box>

        {/* ✅ Page Content */}
        {children}
      </Box>

      <FeedbackModal open={isFeedbackOpen} onClose={handleFeedbackClose} />
    </Box>
  );
}
