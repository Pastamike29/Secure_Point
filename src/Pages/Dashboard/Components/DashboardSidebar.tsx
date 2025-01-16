import { Avatar, Box, Container, Divider, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false); // Set state as a boolean for simplicity

  const handleToggleSublist = () => {
    setOpen(!open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
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
            <img
              src="https://firebasestorage.googleapis.com/v0/b/p-c58c4.firebasestorage.app/o/Secure_P_Project%2Flogo_SecureP.png?alt=media&token=349d0a70-d898-44f0-a92d-5ce252448c6a"
              alt="Logo"
              style={{
                height: '40px',
                marginRight: '10px',
              }}
            />
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
                onClick={() => handleNavigation('/Overview')}
              >
                OVERVIEW
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
                onClick={handleToggleSublist} // Toggle sublist visibility
              >
                FINDING ISSUES
              </Typography>

              {/* Submenu: Only visible when 'open' is true */}
              {open && (
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues')}>
                    <ListItemText primary="All Applications" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues/CriticalRisk')}>
                    <ListItemText primary="Critical Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues/HighRisk')}>
                    <ListItemText primary="High Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues/MediumRisk')}>
                    <ListItemText primary="Medium Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues/LowRisk')}>
                    <ListItemText primary="Low Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/Overview/ApplicationIssues/InformativeRisk')}>
                    <ListItemText primary="Informative Risk" />
                  </ListItemButton>
                </List>
              )}
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
                onClick={() => handleNavigation('/Overview')}
              >
                TICKET
              </Typography>
            </Box>
          </List>

        </Box>
      </Drawer>
    </Container>
  );
}
