import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardMedia, Box, Container, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const contentData = {
  item1: {
    title: 'Broken Access Control',
    description: 'Broken access control occurs when an application does not properly enforce restrictions on what authenticated users are allowed to do. This can lead to unauthorized access to sensitive data or functionalities.',
    src: 'https://miro.medium.com/v2/resize:fit:1400/0*-FVcRCSMSXbrM0OP'
  },
  item2: {
    title: 'SQL Injection',
    description: 'SQL injection (SQLi) is a type of attack where an attacker manipulates SQL queries by injecting malicious SQL code into an application input fields.',
    src: 'https://dytvr9ot2sszz.cloudfront.net/wp-content/uploads/2019/06/SQL-Injection-Prone-min.png'
  },
  item3: {
    title: 'Cross Site Request Forgery',
    description: 'Cross-Site Request Forgery (CSRF) is an attack that tricks a user into executing unwanted actions on a web application.',
    src: 'https://www.sidechannel.blog/wp-content/uploads/2021/03/Artigo-69.5-Lets-go-with-Cross-Site-Request-Forgery-SideChannel-Tempest.png'
  },
  item4: {
    title: 'File Upload Vulnerabilities',
    description: 'File upload vulnerabilities occur when an application allows users to upload files without proper validation.',
    src: 'https://secnhack.in/wp-content/uploads/2020/09/2-9.png'
  },
  item5: {
    title: 'Privilege Escalation',
    description: 'Privilege escalation occurs when an attacker gains elevated access to resources or functionalities.',
    src: 'https://i.imgur.com/SovymJL.png'
  },
  item6: {
    title: 'Password Mismanagement',
    description: 'Password mismanagement refers to poor practices related to password creation, storage, and usage.',
    src: 'https://www.vaadata.com/blog/wp-content/uploads/2024/01/burp-send-group-1024x605.png'
  },
  item7: {
    title: 'Toxic Dependencies',
    description: 'Toxic dependencies refer to libraries, frameworks, or packages in software development that introduce significant risks.',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqTAd4gsk2x-mJPwXrIe9WfH_dwk9vyct9g&s'
  }
};

export default function DropdownContent() {
  const [expanded, setExpanded] = useState('item1');
  const [selectedContent, setSelectedContent] = useState(contentData.item1);

  const handleAccordionChange = (contentKey) => {
    setExpanded(contentKey === expanded ? false : contentKey);
    setSelectedContent(contentData[contentKey]);
  };

  return (
    <Grid2
      sx={{
        display: 'flex',
        width: '100%',
        bgcolor: '#3b82f680',
        my: 13,
        gap: 5,
        borderRadius: 1.5,
        p: 8,
        justifyContent: 'center',
      }}
    >
      {/* Left Side: Dropdown Accordion */}
      <Grid2
        sx={{
          display: 'flex',
          width: { xs: '90%', md: '45%' },
          flexDirection: 'column',
          color: 'white',
        }}
      >
        {Object.keys(contentData).map((key) => (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={() => handleAccordionChange(key)}
            sx={{
              m: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              '&:not(:last-child)': {
                m: 0
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography>{contentData[key].title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{contentData[key].description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid2>

      {/* Right Side: Dynamic Image and Content */}
      <Grid2
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: { xs: '90%', md: '45%' },
        }}
      >
        <Card sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={selectedContent.src}
            alt={selectedContent.title}
            sx={{ objectFit: 'cover', height: '100%' }}
          />
        </Card>
      </Grid2>
    </Grid2>
  );
}
