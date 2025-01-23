import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,

} from '@mui/material';

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



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box sx={{ width: '20%' }}>
        <DashboardSidebar />
      </Box>

      <Box component="main" sx={{ width: '75%', padding: '16px' }}>
        <Toolbar />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography variant="h4" component="div" sx={{
            fontWeight:'600'
          }}>
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
