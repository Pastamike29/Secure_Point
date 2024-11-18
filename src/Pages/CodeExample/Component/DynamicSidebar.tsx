import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the types for the props
interface DropdownTitleProps {
  listName: string;
  isOpen: boolean;
  onClick: () => void;
}

interface SidebarItem {
  issueName: string;
  path: string;
}

interface OwaspCategory {
  owasp: string;
  items: SidebarItem[];
}



// Memoize DropdownTitle to prevent unnecessary re-renders
const DropdownTitle: React.FC<DropdownTitleProps> = React.memo(({ listName, isOpen, onClick }) => (
  <Typography
    onClick={onClick}
    role="button"
    aria-expanded={isOpen}
    tabIndex={0} // Make it keyboard accessible
    onKeyDown={(e) => e.key === 'Enter' && onClick()} // Handle keyboard navigation
  >
    <ListItemText>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        {isOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        <Typography variant="subtitle2">{listName}</Typography>
      </Box>
    </ListItemText>
  </Typography>
));

// Memoize DropdownList to prevent unnecessary re-renders
const DropdownList: React.FC<{ isOpen: boolean; issueName: string; path: string; onClick: () => void }> = React.memo(({ isOpen, issueName, path, onClick }) => (
  <Collapse in={isOpen} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
      <ListItem disablePadding>
        <ListItemButton onClick={onClick}>
          <ListItemText primary={issueName} />
        </ListItemButton>
      </ListItem>
    </List>
  </Collapse>
));

export default function DynamicSidebar() {
  const navigate = useNavigate();
  const [owaspCategories, setOwaspCategories] = useState<OwaspCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleNavigation = (issueName: string) => {
    navigate(`/vulnerabilities/${issueName}`);
  };


  useEffect(() => {
    const fetchOwaspCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/owasp-categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOwaspCategories(data);
      } catch (error) {
        console.error('Error fetching OWASP categories:', error);
        setError('Failed to load OWASP categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwaspCategories();
  }, []); // Fetch categories on component mount

  const handleClick = (listName: string) => {
    setOpenCategory(openCategory === listName ? null : listName);
  };



  if (loading) {
    return <Typography variant="body1" sx={{ padding: 2 }}>Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1" sx={{ padding: 2, color: 'red' }}>{error}</Typography>;
  }

  return (
    <Drawer variant="permanent">
      <Box sx={{ bgcolor: 'background.paper', width: '300px', height: '100%', mt: 10, overflowY: 'auto' }}>
        {owaspCategories.length > 0 ? (
          owaspCategories.map((category) => (
            <React.Fragment key={category.owasp}>
              <List>
                <DropdownTitle
                  listName={category.owasp}
                  isOpen={openCategory === category.owasp}
                  onClick={() => handleClick(category.owasp)}
                />
                {category.items.map((item) => (
                  <DropdownList
                    key={item.issueName}
                    issueName={item.issueName}
                    path={item.path}
                    isOpen={openCategory === category.owasp}
                    onClick={() => handleNavigation(item.issueName)} // Update to use issueName
                  />
                ))}
              </List>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ padding: 2 }}>
            No OWASP categories available.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
