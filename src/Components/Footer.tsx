import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Grid, Grid2 } from '@mui/material';

export default function Footer() {

  return (
    <Box
      bgcolor="primary.main" // Background color from the theme
      color="white"          // Text color
      p={4}                  // Padding
      component="footer"     // HTML footer element
    >
      <Grid2 container spacing={4} 
      sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        {/* About Section */}
        <Grid2 sx={{
          display: { xs: 12, md: 4 },
        }}>
          <Typography variant="h6">
            About Us
          </Typography>
        </Grid2>

        <Grid2>
          <Typography variant="h6">
            Home
          </Typography>
        </Grid2>
        
        <Grid2>
          <Typography variant="h6">
            Contact
          </Typography>
        </Grid2>
        {/* Social Media Section */}
        <Grid2>
          <IconButton color="inherit" href="https://www.facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://www.instagram.com">
            <InstagramIcon />
          </IconButton>
        </Grid2>
      </Grid2>
      {/* <Grid2 sx={{
        display:'flex',
        height:'6vh',
        width:'6vh',
      }}>
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitXlbzug9KqCHaOhq61rZaOEaZet5ufnOSQ&s" alt="" />

      </Grid2> */}

      <Box textAlign="center" pt={4}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
