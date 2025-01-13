import React, { useState, useEffect } from 'react';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarItem {
  issueName: string;
  path: string;
}

interface OwaspCategory {
  owasp_year: string;
  owasp: string;
  items: SidebarItem[];
}

export default function DynamicSidebarLessonPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [owaspCategories, setOwaspCategories] = useState<OwaspCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openYear, setOpenYear] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchOwaspCategories();
  }, []);

  const fetchOwaspCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/vulnerability-type');
      if (!response.ok) {
        throw new Error('Failed to fetch OWASP categories.');
      }
      const data = await response.json();

      // Ensure paths are dynamically added to items
      const categoriesWithPaths = data.map((category: OwaspCategory) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          path: `/LessonPage/${encodeURIComponent(item.issueName)}`, // Dynamic path for each issueName
        })),
      }));

      setOwaspCategories(categoriesWithPaths);
    } catch (error) {
      setError('Failed to load OWASP categories.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleYear = (year: string) => {
    setOpenYear((prev) => (prev === year ? null : year));
    setOpenCategory(null); // Close any open category when switching years
  };

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          Loading OWASP categories...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" color="red">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!Array.isArray(owaspCategories) || owaspCategories.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No OWASP categories found.
        </Typography>
      </Box>
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
        {owaspCategories.reduce((years: string[], category) => {
          if (!years.includes(category.owasp_year)) {
            years.push(category.owasp_year);
          }
          return years;
        }, []).map((year) => (
          <React.Fragment key={year}>
            <List>
              <Typography
                onClick={() => toggleYear(year)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontWeight: 600,
                  color: openYear === year ? 'primary.main' : 'text.primary',
                  ':hover': {
                    backgroundColor: 'rgba(51, 153, 255, 0.1)',
                  },
                }}
              >
                <ExpandMoreIcon
                  sx={{
                    transform: openYear === year ? 'rotate(0deg)' : 'rotate(-90deg)',
                    fontSize: '1.2rem',
                    marginRight: '8px',
                    transition: 'transform 0.3s',
                  }}
                />
                {year}
              </Typography>

              <Collapse in={openYear === year} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {owaspCategories.filter((cat) => cat.owasp_year === year).map((category) => (
                    <React.Fragment key={category.owasp}>
                      <Typography
                        onClick={() => toggleCategory(category.owasp)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          padding: '8px 16px',
                          fontWeight: 600,
                          color: openCategory === category.owasp ? 'primary.main' : 'text.primary',
                          ':hover': {
                            backgroundColor: 'rgba(51, 153, 255, 0.1)',
                          },
                        }}
                      >
                        <ExpandMoreIcon
                          sx={{
                            transform: openCategory === category.owasp ? 'rotate(0deg)' : 'rotate(-90deg)',
                            fontSize: '1.2rem',
                            marginRight: '8px',
                            transition: 'transform 0.3s',
                          }}
                        />
                        {category.owasp}
                      </Typography>

                      <Collapse in={openCategory === category.owasp} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {category.items.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                              <ListItemButton
                                key={item.issueName}
                                onClick={() => navigate(item.path)}
                                sx={{
                                  pl: 4,
                                  backgroundColor: isActive
                                    ? 'rgba(51, 153, 255, 0.1)'
                                    : 'transparent',
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
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </List>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Drawer>
  );
}
