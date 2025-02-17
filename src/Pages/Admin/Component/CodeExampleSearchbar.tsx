import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface SearchBarProps {
  onSearch: (results: any[]) => void;
}

const CodeExampleSearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchSearchResults(searchQuery);
    } else {
      onSearch([]); // Reset results if search is cleared
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search_vulnerabilities?query=${query}`);
      if (response.status === 200) {
        onSearch(response.data.data); // Pass search results to parent component
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      onSearch([]); // Reset results on error
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '250px' }}>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search vulnerabilities..."
        variant="outlined"
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'white',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            height: '50px',
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark' ? 'white' : 'gray',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
          input: {
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            padding: '10px 12px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'gray' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CodeExampleSearchBar;
