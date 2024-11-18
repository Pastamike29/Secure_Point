import * as React from 'react';
import Box from '@mui/material/Box';

import { Collapse, colors, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, SxProps, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TitleMenu from './TitleMenu'
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


interface DropdownTitleProps {
  children?: React.ReactDOM;  
  sx?: SxProps;
  list?: string;
  listName?: string;
  path?: string;
  onClick?: () => void;
}



export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const [open, setOpen] = useState<string | null>(null);


  const handleClick = (listname: string) => {
    setOpen(open === listname ? null : listname);
  };


  useEffect(() => {
    // Set the initial open state based on the path only on mount
    const pathParts = location.pathname.split('/');
    const currentList = pathParts.length > 2 ? pathParts[2] : null;
    if (currentList) {
      setOpen((prevOpen) => (prevOpen === currentList ? prevOpen : currentList));
    }
  }, [location.pathname]); // Run whenever the path changes


  const handleNavigation = (path: string, listName: string) => {
    setOpen(listName); // Keep the dropdown open when navigating within it
    navigate(path);
  }

  function DropdownTitle({ list, listName }: DropdownTitleProps) {
    return (
      <Typography
        onClick={() => handleClick(list!)}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ListItemText>
          <TitleMenu
            sx={{
              fontSize: '14px',
              fontWeight: '650',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {open === list ? (
              <ExpandMoreIcon sx={{ fontSize: '1.2rem', mx: '6px', color: 'rgb(51, 153, 255)' }} />
            ) : (
              <ExpandMoreIcon
                sx={{
                  transform: 'rotate(270deg)',
                  fontSize: '1.2rem',
                  color: 'rgb(51, 153, 255)',
                  mx: '6px',
                  transition: 'transform 0.3s',
                }}
              />
            )}
            {listName}
          </TitleMenu>
        </ListItemText>
      </Typography>
    );
  }


  function DropdownList({ sx, list, listName, path }: DropdownTitleProps) {
    const isActive = location.pathname === path; // Check if the path is active

    return (
      <Collapse in={open === list} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(path!, listName!)}
              sx={{
                pl: 4,
                my: -0.5,
                ...sx,
                backgroundColor: isActive ? 'rgba(51, 153, 255, 0.1)' : 'transparent', // Highlight active item
                color: isActive ? 'rgb(102, 179, 255)' : 'inherit', // Change text color for active item
                ':hover': {
                  backgroundColor: 'rgba(51, 153, 255, 0.2)', // Brighter background on hover
                  color: 'rgb(102, 179, 255)', // Brighter text color on hover
                },
                ':active': {
                  backgroundColor: 'rgba(51, 153, 255, 0.3)', // Even brighter background when active
                  color: 'rgb(102, 179, 255)', // Maintain active text color
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: isActive ? 'rgb(102, 179, 255)' : 'rgba(255,255,255,0.8)', // Active text color
                      ':active': {
                        color: 'rgb(102, 179, 255)', // Active text color when clicked
                      },
                    }}
                  >
                    {listName}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    );
  }



  return (
    <Drawer
      variant="permanent"
      sx={{
        display: 'flex',
        '& .MuiDrawer-paper': {
          width: '37vh',
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
          bgcolor: 'background.paper',
          height: '100%',
          overflowY: 'auto', // Enables vertical scroll
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
};