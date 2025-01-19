import { Avatar, Box, Container, Divider, Drawer, List, Typography } from "@mui/material";
import React, { useState } from "react";
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import { useColorMode } from "../../../assets/Themes/ThemeContext";

export default function AdminDashboardSidebar() {
  const navigate = useNavigate();

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
                onClick={() => handleNavigation('/admin/UserManagement')}
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
                onClick={() => handleNavigation('/admin/FeedbackManagement')}
              >
                Feedback Management
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
                onClick={() => handleNavigation('/admin/TicketManagement')}
              >
                Ticket Management
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
                onClick={() => handleNavigation('/admin/LessonPageManagement')}
              >
                Lesson Management  
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
                onClick={() => handleNavigation('/admin/CodeExampleManagement')}
              >
                Code Example Management
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
