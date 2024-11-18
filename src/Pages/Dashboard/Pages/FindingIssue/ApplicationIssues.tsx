import React, { useEffect, useState } from 'react';
import {
  Box, Toolbar, CssBaseline, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import DashboardSidebar from '../../Components/DashboardSidebar';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../../../../assets/Themes/ThemeContext';
import DashboardLayout from '../../Components/DashboardLayout';

interface Application {
  id: string;
  applicationNumber: string;
  applicationName: string;
  scope: string; // Optional in case of missing values
  totalVulnerabilities: number;
  applicationContact: string; // Updated to match backend
}

interface DashboardProps {
  children?: React.ReactNode;
  title?: string;
}

export default function ApplicationIssues({ children, title }: DashboardProps) {
  const navigate = useNavigate();
  const settings = ['Profile', 'Dashboard', 'Logout'];
  const { toggleTheme, mode } = useColorMode();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetting = (setting: string) => {
    switch (setting) {
      case 'Profile':
        navigate('/Profile');
        break;
      case 'Dashboard':
        navigate('/Overview');
        break;
      case 'Logout':
        navigate('/Logout');
        break;
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/application'); // Adjust the API endpoint if needed
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleRowClick = (appName: string) => {
    navigate(`/application/${appName}`);
  };

  return (
    <DashboardLayout>
  
      <Box component="main" sx={{ padding: '16px' }}>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application Number</TableCell>
                <TableCell>Applicaiton Name</TableCell>
                <TableCell>Scope</TableCell>
                <TableCell>Application Contact</TableCell>
                <TableCell>Total Vulnerabilities</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow
                  key={app.id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      opacity: 0.7,
                    },
                  }}
                  onClick={() => handleRowClick(app.applicationName)}
                >
                  <TableCell>{app.applicationNumber}</TableCell>
                  <TableCell>{app.applicationName || 'N/A'}</TableCell>
                  <TableCell>{app.scope || 'N/A'}</TableCell>
                  <TableCell>{app.totalVulnerabilities}</TableCell>
                  <TableCell>{app.applicationContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {children}
      </Box>
    </DashboardLayout>
  );
}
