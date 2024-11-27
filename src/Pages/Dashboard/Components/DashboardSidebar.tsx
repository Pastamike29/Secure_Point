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
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/ApplicationIssues/CriticalRisk')}>
                    <ListItemText primary="Critical Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/ApplicationIssues/HighRisk')}>
                    <ListItemText primary="High Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/ApplicationIssues/MediumRisk')}>
                    <ListItemText primary="Medium Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/ApplicationIssues/LowRisk')}>
                    <ListItemText primary="Low Risk" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: 5 }} onClick={() => handleNavigation('/ApplicationIssues/InformativeRisk')}>
                    <ListItemText primary="Informative Risk" />
                  </ListItemButton>
                </List>
              )}
            </Box>
          </List>

          <Divider />
        </Box>
      </Drawer>
    </Container>
  );
}
