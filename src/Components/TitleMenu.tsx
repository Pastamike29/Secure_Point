import { SxProps, Typography } from '@mui/material'
import React from 'react'

interface TitleMenuProps {
     children: React.ReactNode;
     variant?: string;
     sx?: SxProps;
     onClick?: ()=> void;
   }
   

export default function TitleMenu({children,sx,onClick}: TitleMenuProps) {

  return (
    <Typography 
    sx={{
      fontWeight:550,
      "&:hover":{
        cursor:'pointer'  
      },
      ...sx,
    }}
     onClick={onClick}
    >   
     {children}
    </Typography>
  );
}
