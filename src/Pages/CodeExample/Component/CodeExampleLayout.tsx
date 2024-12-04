import React, { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../../../Components/Navbar';
import DynamicSidebar from '../Component/DynamicSidebar';

interface SidebarLayoutProps {
     children: ReactNode;
     title?: string;

}

export default function CodeExampleLayout({ children, title }: SidebarLayoutProps) {
     return (
          <Container maxWidth={false}>
               <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ zIndex: 1201 }}>
                         <Navbar />
                    </Box>

                    <Box sx={{ display: 'flex', flex: 1 }}>
                         {/* Dynamic Sidebar */}
                         <Box sx={{ top: 0, left: 0, width: '29%' }}>
                              <DynamicSidebar />
                         </Box>


                         {/* Dynamic Content */}
                         <Box sx={{ mt: 20, ml: -9, width: '53%' }}>
                              <Typography variant="h4" sx={{ml:2.6}}>
                                   {title}
                              </Typography>
                              <Box>
                                   {children} {/* Content passed from the page */}
                              </Box>
                         </Box>
                    </Box>

               
               </Box>
          </Container>
     );
}
