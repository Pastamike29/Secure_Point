import src from '@emotion/styled';
import { Box, Card, CardContent, CardMedia, Container, Grid2, SxProps, Typography } from '@mui/material'
import React from 'react'



interface GridCardProps {
     children?: React.ReactNode;
     sx?: SxProps;
     src?: string;
     onClick?: () => void;


}


export default function GridCard({ children, sx, src, onClick }: GridCardProps) {

     return (



          <Grid2
          
               onClick={onClick}
          >
               <Grid2 sx={{
                    ":hover": {
                         cursor: 'pointer',
                         backgroundColor: 'rgba(250,250,250,.5)',
                         boxShadow:4,

                    }
               }}
               >

                    <Card
                         sx={{
                              display: 'flex',
                              maxWidth: '60vh',
                              maxHeight: '32vh',
                              mx: '0',
                              borderRadius:1,
                              overflow:'hidden',
                              ...sx,
                         }}
                    >
                         <Box
                              sx={{
                                   position:'relative',
                                   display: 'flex',
                                   justifyContent: 'center',
                                   alignItem: 'center',
                                   height: '30vh',
                                   objectFit: 'cover',
                                   transition:'transform 0.3s ease',
                                   willChange:'transform',
                              }}
                         >
                              {src && <img src={src} alt="" style={{width:'100%', height:'100%',objectFit:'cover'}}/>}
                              
                              <Box sx={{
                                   position:'absolute',
                                   textAlign:'center',
                                   pt:12,
                                   color:'white'
                              }}>
                              <Typography> {children} </Typography>
                              </Box>
                         </Box>


                    </Card>

               </Grid2>
          </Grid2>

     )

}
