import { Box, SxProps } from '@mui/material'
import React from 'react'

interface ContentBoxProps {
     children?: React.ReactNode;
     sx?: SxProps;
     onClick?: () => void;
}

export default function ContentBox({ children, sx, onClick }: ContentBoxProps) {

     return (
          <Box sx={{
               height: '17vh',
               pt:6,
               px:10,
               backgroundColor: 'rgba(250,250,255)',
               borderRadius: 1,
               ":hover": {
                    backgroundColor: 'rgba(250,250,255,.9)',
                    cursor: 'pointer'
               },
               ...sx,
          }}
               onClick={onClick}>

               {children}
               
          </Box>
     )
}
