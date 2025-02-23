import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<{ name: string; type: 'lesson' | 'code'; path: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetchSearchResults(searchQuery);
    } else {
      setFilteredResults([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success && data.results.length > 0) {
        setFilteredResults(data.results);
        setShowSuggestions(true);
      } else {
        setFilteredResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelectResult = (path: string) => {
    navigate(path);
    setFilteredResults([]);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '320px', ml: 3, mr: 5 }}>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for lessons or vulnerabilities..."
        variant="outlined"
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'white',
          borderRadius: '12px',
          boxShadow: theme.palette.mode === 'dark' ? '0px 2px 10px rgba(255, 255, 255, 0.05)' : '0px 2px 10px rgba(0, 0, 0, 0.1)',
          transition: '0.3s',
          '& .MuiOutlinedInput-root': {
            height: '50px',
            paddingRight: '10px',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0px 0px 12px ${theme.palette.primary.main}`,
            },
          },
          input: {
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            fontSize: '0.9rem',
            paddingLeft: '10px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: theme.palette.primary.main, fontSize: '1.5rem' }} />
            </InputAdornment>
          ),
        }}
      />

      {showSuggestions && filteredResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '105%',
            left: 0,
            right: 0,
            zIndex: 20,
            maxHeight: 250,
            overflowY: 'auto',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(25, 25, 25, 0.9)' : 'white',
            borderRadius: '12px',
            boxShadow: theme.palette.mode === 'dark' ? '0px 4px 15px rgba(255, 255, 255, 0.1)' : '0px 4px 15px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(12px)',
            border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <List>
            {filteredResults.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectResult(item.path)}
                  sx={{
                    transition: '0.2s',
                    borderRadius: '8px',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      color: theme.palette.mode === 'dark' ? 'white' : 'black',
                      fontSize: '0.9rem',
                    }}
                    secondary={item.type === 'lesson' ? 'Lesson' : 'Code Issue'}
                    secondaryTypographyProps={{
                      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;
