import * as React from 'react';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  issueName: string;
  path: string;
}

interface OwaspCategory {
  owasp: string;
  items: SidebarItem[];
}

export default function DynamicSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [owaspCategories, setOwaspCategories] = useState<OwaspCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleToggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  useEffect(() => {
    const fetchOwaspCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/owasp-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch OWASP categories.');
        }
        const data = await response.json();
        setOwaspCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load OWASP categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwaspCategories();
  }, []);

  if (loading) {
    return (
      <Typography variant="body1" sx={{ padding: 2 }}>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ padding: 2, color: 'red' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          width: '280px',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          height: '100vh',
        },
      }}
    >
      <Box
        sx={{
          mt: 8,
          overflowY: 'auto',
          height: '100%',
          '::-webkit-scrollbar': {
            width: '6px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(51, 153, 255, 0.5)',
            borderRadius: '4px',
          },
        }}
      >
        {owaspCategories.map((category) => {
          const isOpen = openCategory === category.owasp;

          return (
            <React.Fragment key={category.owasp}>
              <List>
                <Typography
                  onClick={() => handleToggleCategory(category.owasp)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    fontWeight: 600,
                    color: isOpen ? 'primary.main' : 'text.primary',
                    ':hover': {
                      backgroundColor: 'rgba(51, 153, 255, 0.1)',
                    },
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                      fontSize: '1.2rem',
                      marginRight: '8px',
                      transition: 'transform 0.3s',
                    }}
                  />
                  {category.owasp}
                </Typography>

                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.items.map((item) => {
                      const isActive = location.pathname === item.path;

                      return (
                        <ListItemButton
                          key={item.issueName}
                          onClick={() => handleNavigation(item.path)}
                          sx={{
                            pl: 4,
                            backgroundColor: isActive ? 'rgba(51, 153, 255, 0.1)' : 'transparent',
                            color: isActive ? 'primary.main' : 'text.primary',
                            ':hover': {
                              backgroundColor: 'rgba(51, 153, 255, 0.2)',
                              color: 'primary.main',
                            },
                          }}
                        >
                          <ListItemText
                            primary={item.issueName}
                            sx={{
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? 'primary.main' : 'inherit',
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </List>
              <Divider />
            </React.Fragment>
          );
        })}
      </Box>
    </Drawer>
  );
}
