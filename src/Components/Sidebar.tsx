import * as React from 'react';
import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TitleMenu from './TitleMenu';

interface DropdownTitleProps {
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  list?: string;
  listName?: string;
  path?: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (listname: string) => {
    setOpen(open === listname ? null : listname);
  };

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const currentList = pathParts.length > 2 ? pathParts[2] : null;
    if (currentList) {
      setOpen((prevOpen) => (prevOpen === currentList ? prevOpen : currentList));
    }
  }, [location.pathname]);

  const handleNavigation = (path: string, listName: string) => {
    setOpen(listName);
    navigate(path);
  };

  const DropdownTitle = ({ list, listName }: DropdownTitleProps) => (
    <Typography
      onClick={() => handleClick(list!)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px 16px',
        fontWeight: 600,
        color: open === list ? 'primary.main' : 'text.primary',
        ':hover': {
          backgroundColor: 'rgba(51, 153, 255, 0.1)',
        },
      }}
    >
      {open === list ? (
        <ExpandMoreIcon sx={{ fontSize: '1.2rem', marginRight: '8px' }} />
      ) : (
        <ExpandMoreIcon
          sx={{
            transform: 'rotate(270deg)',
            fontSize: '1.2rem',
            marginRight: '8px',
            transition: 'transform 0.3s',
          }}
        />
      )}
      {listName}
    </Typography>
  );

  const DropdownList = ({ sx, list, listName, path }: DropdownTitleProps) => {
    const isActive = location.pathname === path;

    return (
      <Collapse in={open === list} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(path!, listName!)}
              sx={{
                pl: 4,
                ...sx,
                backgroundColor: isActive ? 'rgba(51, 153, 255, 0.1)' : 'transparent',
                color: isActive ? 'primary.main' : 'text.primary',
                ':hover': {
                  backgroundColor: 'rgba(51, 153, 255, 0.2)',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemText
                primary={listName}
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'primary.main' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    );
  };

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
       <List>
          <DropdownTitle
            list='list1'
            listName='Broken Access Control'
          />
          <DropdownList
            list='list1'
            listName='Broken Access Control'
            path='/LessonPage/BrokenAccControl'
          />
          <DropdownList
            list='list1'
            listName='Directory Traversal'
            path='/LessonPage/DirectoryTraversal'
          />
          <DropdownList
            list='list1'
            listName='CrossSiteRequestForgery'
            path='/LessonPage/CrossSiteRequestForgery'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list2'
            listName='Cryptographic Failures'
          />
          <DropdownList
            list='list2'
            listName='Unencrypted Communication'
            path='/LessonPage/UnencryptedCommunication'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list3'
            listName='Injection'
          />
          <DropdownList
            list='list3'
            listName='SQL Injection'
            path='/LessonPage/SQLInjection'
          />
          <DropdownList
            list='list3'
            listName='Command Injection'
            path='/LessonPage/CommandInjection'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list4'
            listName='Insecure Design'
          />
          <DropdownList
            list='list4'
            listName='Insecure Design'
            path='/LessonPage/InsecureDesign'
          />
          <DropdownList
            list='list4'
            listName='Information Leakage'
            path='/LessonPage/InformationLeakage'
          />
          <DropdownList
            list='list4'
            listName='File Upload Vulnerabilities'
            path='/LessonPage/FileUploadVulnerabilities'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list5'
            listName='Security Misconfiguration'
          />
          <DropdownList
            list='list5'
            listName='Lax Security Settings'
            path='/LessonPage/LaxSecuritySettings'
          />

        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list6'
            listName='Vulnerable and Outdated Components'
          />
          <DropdownList
            list='list6'
            listName='Toxic Dependencies'
            path='/LessonPage/ToxicDependencies'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list7'
            listName='Identification and Authentication Failures'
          />
          <DropdownList
            list='list7'
            listName='Password Mismanagement'
            path='/LessonPage/PasswordMismanagement'
          />
          <DropdownList
            list='list7'
            listName='Privilege Escalation'
            path='/LessonPage/PrivilegeEscalation'
          />
          <DropdownList
            list='list7'
            listName='User Enumeration'
            path='/LessonPage/UserEnumeration'
          />
          <DropdownList
            list='list7'
            listName='Session Fixation'
            path='/LessonPage/SessionFixation'
          />
          <DropdownList
            list='list7'
            listName='Weak Session IDS'
            path='/LessonPage/WeakSessionIds'
          />
        </List>


        <List>
          <DropdownTitle
            list='list8'
            listName='Software and Data Integrity Failures'
          />
          <DropdownList
            list='list8'
            listName='Software and Data Integrity Failures'
            path='/LessonPage/SoftwareAndDataIntegrityFailures'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list9'
            listName='Logging and Monitoring Failures'
          />
          <DropdownList
            list='list9'
            listName='Logging and Monitoring Failures'
            path='/LessonPage/LoggingAndMonitoringFailures'
          />
        </List>

        <Divider />

        <List>
          <DropdownTitle
            list='list10'
            listName='Server Side Request Forgery'
          />
          <DropdownList
            list='list10'
            listName='Server Side Request Forgery'
            path='/LessonPage/ServerSideRequestForgery '

          />

        </List>
      </Box>
    </Drawer>
  );
}
