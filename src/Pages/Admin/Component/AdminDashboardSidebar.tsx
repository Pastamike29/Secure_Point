import { Avatar, Box, Container, Divider, Drawer, List, Typography } from "@mui/material";
import React, { useState } from "react";
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../../../assets/Themes/ThemeContext";

export default function AdminDashboardSidebar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<string | null>(null);
  const settings = ['Profile', 'Dashboard', 'Logout'];
  const { toggleTheme, mode } = useColorMode();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Container>
      <Drawer
        variant="permanent"
        sx={{
          display: 'flex',
          '& .MuiDrawer-paper': {
            width: '33vh',
            boxSizing: 'border-box',
            position: 'fixed',
            height: '100vh',
          },
        }}
      >
        <Box
          sx={{
            mt: 8.5,
            bgcolor: 'background.paper',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              mb: 5.5,
            }}
            onClick={() => handleNavigation('/')}
          >
            <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
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
          <List>
            <Box>
              <Typography
                sx={{
                  cursor: 'pointer',
                  ml: 3,
                  my: 1.5,
                  ':hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={() => handleNavigation('/admin/AddUser')}
              >
                User Management
              </Typography>
            </Box>
          </List>

          <Divider />
          <List>
            <Box>
              <Typography
                sx={{
                  cursor: 'pointer',
                  ml: 3,
                  my: 1.5,
                  ':hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={() => handleNavigation('/admin/AddVulnerability')}
              >
                Vulnerability Management
              </Typography>
            </Box>
          </List>

          <Divider />
          <List>
            <Box>
              <Typography
                sx={{
                  cursor: 'pointer',
                  ml: 3,
                  my: 1.5,
                  ':hover': {
                    opacity: 0.7,
                  },
                }}
                onClick={() => handleNavigation('/admin/FindingIssue')}
              >
                Finding Issue Management
              </Typography>
            </Box>
          </List>

          <Divider />
        </Box>
      </Drawer>
    </Container>
  );
}
